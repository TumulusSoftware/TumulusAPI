const {
	web3,
	contract,
} = require("_helpers/bc");

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

