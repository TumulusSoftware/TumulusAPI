const Web3 = require("web3");
const { waitFor } = require("rolia-util");
const db = require("_helpers/db");

var web3 = new Web3(process.env.RPC_URL);

const contractABI = require("_config/Datasitter-abi.json");
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new web3.eth.Contract(contractABI, contractAddress);
const gasLimit = "610000";
const walletKey = process.env.TUMULUS_TREASURY_KEY;
const walletAddress = process.env.TUMULUS_TREASURY_ADDRESS;
const callOptions = {from: walletAddress};

module.exports = {
	web3,
	createAccount,
	writeTx,
	contract,
	callOptions,
};

async function createAccount() {
	let account = await web3.eth.accounts.create();
	return {
		address: account.address,
		privateKey: account.privateKey,
	};
};

async function createTxLog(objMethod) {
	const args = objMethod.arguments;
	const inputs = objMethod._method.inputs;
	const obj = {
		method: objMethod._method.name,
		arguments: JSON.stringify(args),
		status: "PENDING"
	};
	for (let i = 0; i < args.length; i++) {
		var name = inputs[i].name;
		var value = (name == "data") ? web3.utils.hexToAscii(args[i]) : args[i];
		obj[name] = value;
	}
	var txLog = await db.TxLog.create(obj);
	return txLog;
}

async function writeTx(objMethod, errorHandler) {
	let txLog = await createTxLog(objMethod);
	const data = objMethod.encodeABI();

	let signedTx = await web3.eth.accounts.signTransaction(
		{
			from: walletAddress,
			to: contractAddress,
			value: 0,
			gas: gasLimit,
			data: data
		},
		walletKey
	);

	const funcLabel = objMethod._method.name + "(): " + JSON.stringify(objMethod.arguments);

	var txSending = { done: false };
	web3.eth.sendSignedTransaction(signedTx.rawTransaction)
		.on('confirmation', (confirmationNumber, receipt) => {
			console.log(`### Confirmation: #${confirmationNumber} ${funcLabel}`);
			console.log(receipt);
			txLog.status = "OK";
			txLog.gasUsed = receipt.gasUsed;
			txLog.transactionHash = receipt.transactionHash;
			txLog.save();
			txSending.done = true;
		})
		.on('error', async (error, receipt) => {
			// If a out of gas error, the second parameter is the receipt.
			const reason = await getRevertReason(receipt.transactionHash);
			console.error(`### Error: ${funcLabel}`);
			console.error(`REASON: ${reason}`);
			console.error(error);
			txLog.status = "FAILED: " + reason;
			txLog.save();
			errorHandler && errorHandler();
			txSending.done = true;
		});
	// await waitFor(txSending);
	return {status: "PENDING"};
};

async function getRevertReason(txHash){
	var rtn = "";
	const tx = await web3.eth.getTransaction(txHash);
	try {
		var result = await web3.eth.call(tx, tx.blockNumber);
	} catch (error) {
		rtn = error.toString().substr(73);
	}
	return rtn;
 }
 