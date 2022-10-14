const { notify } = require("_helpers/comm");

module.exports = {
	listenToEvents
};

/*
ALL EVENTS FROM THE SMART CONTRACT:

	event AssetAdded        (uint40 id, uint32 sno);

	event AgreementRequested(uint40 id, address owner, address announcer, uint8 bit);
	event AgreementDeleted  (uint40 id, address owner, address announcer, uint8 bit);
	event StateRemoved      (uint40 id, address owner, address announcer, uint8 bit);

	event AgreementAgreed   (uint40 id, address owner, address announcer, uint8 bit);
	event AgreementRejected (uint40 id, address owner, address announcer, uint8 bit);
	event AgreementAnnounced(uint40 id, address owner, address announcer, uint8 bit);

	event ViewAuthorized    (Authorization[] authorizations);
	event ViewEnded         (Authorization[] authorizations);
	event ViewRevoked       (Authorization[] authorizations);
*/

/**
 * 
 * @param {*} data 
 */
async function processEvents(data) {
	const db = require('_helpers/db');
	const event = data.event;
	if (event == "AssetAdded") {
		const id = data.returnValues.id;
		const sno = data.returnValues.sno;
		const { setAssetId } = require("services/asset.service");
		setAssetId(id, sno);
	} else if (event.startsWith("Agreement") || event == "StateRemoved") {
		const addrOwner = data.returnValues.owner;
		const addrAnnouncer = data.returnValues.announcer;
		const owner = await db.User.scope("emailOnly").findOne({ where: { walletAddress: addrOwner } });
		const announcer = await db.User.scope("emailOnly").findOne({ where: { walletAddress: addrAnnouncer } });
		if (["AgreementRequested", "AgreementDeleted", "StateRemoved"].includes(event)) {
			notify(announcer, event, owner);
		} else {
			notify(owner, event, announcer);
		}
	} else if (event.startsWith("View")) {
		data.returnValues.authorizations.forEach(async auth => {
			const addrOwner = auth.owner;
			const addrViewer = auth.viewer;
			const owner = await db.User.scope("emailOnly").findOne({ where: { walletAddress: addrOwner } });
			const viewer = await db.User.scope("emailOnly").findOne({ where: { walletAddress: addrViewer } });
			notify(viewer, event, owner);
		});
	}
}

function listenToEvents() {
	// The following constants are purposely kept inside the function
	// to avoid conflict with the main module.
	const Web3 = require("web3");
	const web3 = new Web3(process.env.RPC_WS_URL);
	const contractABI = require("_config/Datasitter-abi.json");
	const contractAddress = process.env.CONTRACT_ADDRESS;
	const contract = new web3.eth.Contract(contractABI, contractAddress);
	contract.events.allEvents()
		.on('data', data => {
			console.log(`### Event: ${data.event} ${JSON.stringify(data.returnValues)}`);
			console.log(data);
			processEvents(data);
		})
		.on('error', error => {
			console.error("### Event error:");
			console.error(error);
		});
	console.log("### listenToEvents() STARTED");	
}

