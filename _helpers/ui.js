const db = require('_helpers/db');

const STATES = ["Terminus", "Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta"];
const AUTHORIZATION_STATUSES = { "1": "EXISTING", "2": "EFFECTIVE" };
const AGREEMENT_STATUSES = { "1": "EXISTING", "2": "EFFECTIVE", "4": "ANNOUNCED", "8": "REJECTED" };

function authStatus(status) {
	return getStatusText(status, AUTHORIZATION_STATUSES);
}
function agrmStatus(status) {
	return getStatusText(status, AGREEMENT_STATUSES);
}

function getStatusText(status, definition) {
	var rtn = "";
	Object.keys(definition).forEach(key => {
		var kv = eval(key);
		if ((status & kv) == kv) {
			rtn += definition[key] + "; "
		}
	})
	return rtn;
}

async function getUserUi(walletAddress, role) {
	const prefix = role ? role + "-" : "";
	const user = await db.User.findOne({ where: { walletAddress } });
	const obj = {};
	obj[`${prefix}id`] = user.id;
	obj[`${prefix}firstName`] = user.firstName;
	obj[`${prefix}lastName`] = user.lastName;
	obj[`${prefix}emailAsId`] = user.emailAsId;
	return obj;
}

async function getAssetUi(assetId) {
	const asset = await db.Asset.findOne({ where: { assetId } });
	const obj = {
		assetId: asset.assetId,
		fileName: asset.fileName,
		tags: asset.tags
	};
	return obj;
}

async function getAgreementUiArray(agrmArr) {
	var rtn = [];
	for (var i = 0; i < agrmArr.length; i++) {
		const obj = agrmArr[i];
		const oOwner = await getUserUi(obj.owner, "owner");
		const oAnnouncer = await getUserUi(obj.announcer, "announcer");
		const rtnObj = {
			...oOwner,
			...oAnnouncer,
			agrmId: obj.id,
			bit: obj.bit,
			state: STATES[obj.bit],
			status: agrmStatus(obj.status)
		};
		rtn.push(rtnObj);
	}
	return rtn;

}

async function getAuthorizationUiArray(authArr) {
	var rtn = [];
	for (var i = 0; i < authArr.length; i++) {
		const obj = authArr[i];
		const oOwner = await getUserUi(obj.owner, "owner");
		const oViewer = await getUserUi(obj.viewer, "viewer");
		const oAsset = await getAssetUi(obj.assetId);
		const rtnObj = {
			...oOwner,
			...oViewer,
			...oAsset,
			authId: obj.id,
			bit: obj.bit,
			state: STATES[obj.bit],
			status: authStatus(obj.status)
		};
		rtn.push(rtnObj);
	}
	return rtn;
}

module.exports = {
	STATES,
	getAuthorizationUiArray,
	getAgreementUiArray,
	getAssetUi,
	authStatus,
	getUserUi
};
