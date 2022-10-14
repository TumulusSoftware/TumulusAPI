const {
	web3,
	writeTx,
	contract,
	callOptions,
} = require("_helpers/bc");
const {STATES} = require("_helpers/ui");

module.exports = {
	setThreshold,
	removeState,
	getStates
};

function setThreshold(owner, bit, value) {
	const objMethod = contract.methods.setThreshold(owner, bit, value);
	return writeTx(objMethod);
}
function removeState(owner, bit) {
	const objMethod = contract.methods.removeState(owner, bit);
	return writeTx(objMethod);
}
async function getStates(owner) {
	const result = await contract.methods.getStates(owner).call(callOptions);
	return result.map(obj => ({ 
		bit: obj.bit,
		threshold: obj.threshold,
		announcementCount: obj.announcementCount,
		active: obj.active,
		state: STATES[obj.bit] 
	}));
}

