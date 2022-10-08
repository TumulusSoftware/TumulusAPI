const {
	web3,
	contract,
	callOptions,
} = require("_helpers/bc");


module.exports = {
	getAuthorizationsByOwner,
	getAuthorizationsByViewer,
	getAssetData,
	getAuthorizedAssetData,
	getAgreementsByOwner,
	getAgreementsByAnnouncer,
	getStates,
	isInState,
};

async function isInState(owner, bit) {
	const result = await contract.methods.isInState(owner, bit).call(callOptions);
	// returns(bool) 
	return result;
}
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
async function getAssetData(id, owner) {
	const result = await contract.methods.getAssetData(id, owner).call(callOptions);
	return web3.utils.hexToAscii(result);
}
async function getAuthorizedAssetData(id, viewer) {
	const result = await contract.methods.getAuthorizedAssetData(id, viewer).call(callOptions);
	// returns(bytes _rtn) 
	return result;
}
async function getAgreementsByOwner(owner) {
	const result = await contract.methods.getAgreementsByOwner(owner).call(callOptions);
	// returns(Agreement[] _rtn) 
	return result;
}
async function getAgreementsByAnnouncer(announcer) {
	const result = await contract.methods.getAgreementsByAnnouncer(announcer).call(callOptions);
	// returns(Agreement[] _rtn) 
	return result;
}
async function getStates(owner) {
	const result = await contract.methods.getStates(owner).call(callOptions);
	// returns(State[] _rtn) 
	return result;
}
