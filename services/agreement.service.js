const {
	writeTx,
	contract,
	callOptions,
} = require("_helpers/bc");

module.exports = {
	getAgreementsByOwner,
	getAgreementsByAnnouncer,
	requestAgreement,
	agreeAgreement,
	rejectAgreement,
	deleteAgreement,
	announce,
};

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

function requestAgreement(owner, announcer, bit) {
	const objMethod = contract.methods.requestAgreement(owner, announcer, bit);
	return writeTx(objMethod);
}
function agreeAgreement(id, announcer) {
	const objMethod = contract.methods.agreeAgreement(id, announcer);
	return writeTx(objMethod);
}
function rejectAgreement(id, announcer) {
	const objMethod = contract.methods.rejectAgreement(id, announcer);
	return writeTx(objMethod);
}
function deleteAgreement(id, owner) {
	const objMethod = contract.methods.deleteAgreement(id, owner);
	return writeTx(objMethod);
}
function announce(id, announcer) {
	const objMethod = contract.methods.announce(id, announcer);
	return writeTx(objMethod);
}
