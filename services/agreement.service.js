const ui = require("_helpers/ui");
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
	const agrmArr = await contract.methods.getAgreementsByOwner(owner).call(callOptions);
	const agrmUiArr = await ui.getAgreementUiArray(agrmArr);
	return agrmUiArr;
}
async function getAgreementsByAnnouncer(announcer) {
	const agrmArr = await contract.methods.getAgreementsByAnnouncer(announcer).call(callOptions);
	const agrmUiArr = await ui.getAgreementUiArray(agrmArr);
	return agrmUiArr;
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
