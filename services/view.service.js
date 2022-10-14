const {
	web3,
	writeTx,
	contract,
	callOptions,
} = require("_helpers/bc");
const { retrieve } = require("services/asset.service");
const ui = require("_helpers/ui");
const { waitFor } = require("rolia-util");

module.exports = {
	getAuthorizationsByOwner,
	getAuthorizationsByViewer,
	createAuthorization,
	removeAuthorization,
	retrieveAuthorized
};

async function getAuthorizationsByOwner(owner) {
	const authArr = await contract.methods.getAuthorizationsByOwner(owner).call(callOptions);
	const authUiArr = await ui.getAuthorizationUiArray(authArr);
	return authUiArr;
}

async function getAuthorizationsByViewer(viewer) {
	const authArr = await contract.methods.getAuthorizationsByViewer(viewer).call(callOptions);
	const authUiArr = await ui.getAuthorizationUiArray(authArr);
	return authUiArr;
}

async function retrieveAuthorized(id, viewer) {
	const result = await contract.methods.getAuthorizedAssetData(id, viewer).call(callOptions);
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
