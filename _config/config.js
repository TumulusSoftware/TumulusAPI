const fs = require("fs");
const { tmpdir } = require('os');

module.exports = {
	getTmpDir,
	getTumulusPrivateKey,
	getTumulusPublicKey
};

function getTumulusPublicKey() {
	const key = fs.readFileSync(process.env.TUMULUS_PUBLIC_KEY_FILE, "utf8");
	return key;
}

function getTmpDir() {
	return process.env.NODE_ENV === 'production' ? tmpdir() : "/tmp";
};

function getTumulusPrivateKey() {
	const privateKey = {
		key: fs.readFileSync(process.env.TUMULUS_PRIVATE_KEY_FILE, "utf8"),
		passphrase: process.env.TUMULUS_PRIVATE_KEY_PASSPHRASE
	};
	return privateKey;

}

