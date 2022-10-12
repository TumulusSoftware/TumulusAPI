const {
	web3,
	writeTx,
	contract,
	callOptions,
} = require("_helpers/bc");
const { retrieve } = require("services/asset.service");

module.exports = {
	getAuthorizationsByOwner,
	getAuthorizationsByViewer,
	createAuthorization,
	removeAuthorization,
	retrieveAuthorized
};

// TODO: viewService.retrieveAuthorized

async function getAuthorizationsByOwner(owner) {
	const result = await contract.methods.getAuthorizationsByOwner(owner).call(callOptions);
	// returns(Authorization[] _rtn) 
	return result;
}
async function getAuthorizationsByViewer(viewer) {
	const result = await contract.methods.getAuthorizationsByViewer(viewer).call(callOptions);
	// returns(Authorization[] _rtn) 
	return result;
}

async function retrieveAuthorized(id, viewer) {
	const result = await contract.methods.getAuthorizedAssetData(id, viewer).call(callOptions);
	// returns(bytes _rtn) 
	cid = web3.utils.hexToAscii(result);
	return await retrieve(cid);
}


function createAuthorization(owner, viewer, bit, assetId) {
	const objMethod = contract.methods.createAuthorization(owner, viewer, bit, assetId);
	return writeTx(objMethod);
}

function removeAuthorization(id, owner) {
	const objMethod = contract.methods.removeAuthorization(id, owner);
	return writeTx(objMethod);
}
