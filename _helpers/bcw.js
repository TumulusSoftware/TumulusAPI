const {
	web3,
	createAccount,
	writeTx,
	contract,
	callOptions,
} = require("_helpers/bc");

module.exports = {
	saveAsset,

	createAuthorization,
	removeAuthorization,

	requestAgreement,
	agreeAgreement,
	rejectAgreement,
	deleteAgreement,
	announce,
	
	setThreshold,
	removeState,

	burnNonce,

};
 
async function saveAsset(assetId, owner, sno, cid, errorHandler) {
	const hexCid = web3.utils.asciiToHex(cid);
	const objMethod = contract.methods.saveAsset(assetId, owner, sno, hexCid);
	await writeTx(objMethod, errorHandler);
};

async function createAuthorization(owner, viewer, bit, assetId) {
	const objMethod = contract.methods.createAuthorization(owner, viewer, bit, assetId);
	await writeTx(objMethod);
}
async function removeAuthorization(id, owner) {
	const objMethod = contract.methods.removeAuthorization(id, owner);
	await writeTx(objMethod);
}
async function requestAgreement(owner, announcer, bit) {
	const objMethod = contract.methods.requestAgreement(owner, announcer, bit);
	await writeTx(objMethod);
}
async function agreeAgreement(id, announcer) {
	const objMethod = contract.methods.agreeAgreement(id, announcer);
	await writeTx(objMethod);
}
async function rejectAgreement(id, announcer) {
	const objMethod = contract.methods.rejectAgreement(id, announcer);
	await writeTx(objMethod);
}
async function deleteAgreement(id, owner) {
	const objMethod = contract.methods.deleteAgreement(id, owner);
	await writeTx(objMethod);
}
async function announce(id, announcer) {
	const objMethod = contract.methods.announce(id, announcer);
	await writeTx(objMethod);
}
async function setThreshold(owner, bit, value) {
	const objMethod = contract.methods.setThreshold(owner, bit, value);
	await writeTx(objMethod);
}
async function removeState(owner, bit) {
	const objMethod = contract.methods.removeState(owner, bit);
	await writeTx(objMethod);
}
async function burnNonce() {
	const objMethod = contract.methods.burnNonce();
	await writeTx(objMethod);
}

