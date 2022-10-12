const {
	web3,
	writeTx,
	contract,
	callOptions,
} = require("_helpers/bc");

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
	// returns(State[] _rtn) 
	return result;
}

