const Web3 = require("web3");

module.exports = {
	listenToEvents
};

function processEvents(data) {
	const id = data.returnValues.id;
	const sno = data.returnValues.sno;
	const owner = data.returnValues.owner;
	const announcer = data.returnValues.announcer;
	const bit = data.returnValues.bit;
	const event = data.event;
	switch (event) {
		case "AssetAdded": 
			const {setAssetId} = require("services/asset.service");
			setAssetId(id, sno);
			break;
	}
}
function listenToEvents() {
	var web3 = new Web3(process.env.RPC_WS_URL);
	const contractABI = require("_config/Datasitter-abi.json");
	const contractAddress = process.env.CONTRACT_ADDRESS;
	const contract = new web3.eth.Contract(contractABI, contractAddress);
	contract.events.allEvents()
		.on('data', data=>{
			console.log("### listenToEvents, data:");
			console.log(data);
			processEvents(data);
		})
		.on('error', error=>{
			console.log("### listenToEvents, error:");
			console.log(error);
		});
}

