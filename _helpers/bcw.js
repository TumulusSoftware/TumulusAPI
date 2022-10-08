const {
	web3,
	createAccount,
	writeTx,
	contract,
	callOptions,
} = require("_helpers/bc");

module.exports = {
	saveAsset,
	// createAuthorization,
	// requestAgreement,
	// agreeAgreement,
	// rejectAgreement,
	// deleteAgreement,
	// announce,
	// activateOwnerState,
	// setThreshold,
	// removeState,
	// removeAuthorization,
	// burnNonce,

};
 
async function saveAsset(assetId, owner, sno, cid, errorHandler) {
	const hexCid = web3.utils.asciiToHex(cid);
	const objMethod = contract.methods.saveAsset(assetId, owner, sno, hexCid);
	await writeTx(objMethod, errorHandler);
};
