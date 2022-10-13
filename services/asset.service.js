const {
	web3,
	writeTx,
	contract,
	callOptions,
} = require("_helpers/bc");
const fs = require('fs');
const { waitFor } = require("rolia-util");
const path = require('path');
const { Web3Storage, getFilesFromPath } = require(`web3.storage`);
const { hybridEncryptFile, hybridDecryptFile } = require('tumulus-crypto');
const config = require('_config/config');
const db = require('_helpers/db');

module.exports = {
	store,
	setAssetId,
	getByOwner,
	list,
	retrieve,
};

async function retrieve(cid) {
	const salt = process.env.SALT;
	const tmlPrivateKey = config.getTumulusPrivateKey();

	const { hybridFilePath, fileName } = await retrieveFromWeb3Storage(cid);
	const tmpDir = config.getTmpDir();
	const decryptedPath = await hybridDecryptFile(hybridFilePath, tmpDir, tmlPrivateKey, salt);
	fs.rmSync(hybridFilePath);

	return { filePath: decryptedPath, fileName: fileName };
}

async function getByOwner(id, owner) {
	const result = await contract.methods.getAssetData(id, owner).call(callOptions);
	const cid = web3.utils.hexToAscii(result);
	return await retrieve(cid);

}

async function list(ownerId) {
	// read from DB only
	return await db.Asset.findAll({ where: { UserId: ownerId } });
}

async function store(assetId, fileName, tempFilePath, tags, owner, ownerId) {
	var asset;
	if (assetId == 0) {
		asset = await db.Asset.create({ fileName: fileName, tags: tags, UserId: ownerId, status: "NEW" });
	} else {
		asset = await db.Asset.findOne({ where: { assetId: assetId } });
	}

	const cid = await storeToWeb3Storage(fileName, tempFilePath);

	asset.status = "IPFS";
	await asset.save();

	var errorHandler = async function () {
		asset.status = "FAILED";
		await asset.save();
	};

	const hexCid = web3.utils.asciiToHex(cid);
	const objMethod = contract.methods.saveAsset(assetId, owner, asset.sno, hexCid);
	return writeTx(objMethod, errorHandler);
}

async function retrieveFromWeb3Storage(cid) {
	const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN });
	console.log(client);
	const res = await client.get(cid);
	console.log(`Got a response! [${res.status}] ${res.statusText}`)
	if (!res.ok) {
		throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`)
	}

	// unpack File objects from the response
	const files = await res.files();
	const file = files[0];
	const fileName = file.name;
	console.log(cid);
	console.log(`${file.cid} -- ${file.path} -- ${file.size}`)
	const hybridFilePath = "/tmp/" + Math.random().toString().substring(2, 5) + "_w3s";
	console.log("tempFilePath : " + hybridFilePath);
	const output = fs.createWriteStream(hybridFilePath);
	var writing = { done: false };
	output.on('finish', () => { writing.done = true; });

	for (let i = 0; i < file._parts.length; i++) {
		let buf = file._parts[i];
		output.write(buf);
	}
	output.end();
	await waitFor(writing);

	return { hybridFilePath, fileName };
}

async function storeToWeb3Storage(fileName, tempFilePath) {
	const tmpDir = config.getTmpDir();
	const publicKey = config.getTumulusPublicKey();
	const salt = process.env.SALT;
	const hybridFilePath = await hybridEncryptFile(tempFilePath, fileName, tmpDir, publicKey, salt);
	const file = await getFilesFromPath(hybridFilePath);
	const client = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN });

	const cid = await client.put(file);
	console.log('stored files with cid:', cid);

	const hybridTmpSubfolder = path.dirname(hybridFilePath);
	fs.rmSync(tempFilePath);
	fs.rmSync(hybridFilePath);
	fs.rmdirSync(hybridTmpSubfolder);

	return cid;
}

async function setAssetId(id, sno) {
	var asset = await db.Asset.findByPk(sno);
	asset.assetId = id;
	asset.status = "BLOCKCHAIN";
	asset.save();
}
