const express = require("express");
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");
const viewService = require("services/view.service");

// routes
const router = express.Router();
router.post  ("/assign"    , authorize(), assignSchema  , assign  );
router.get   ("/authorized" , authorize(), listAuthorized );
router.get   ("/list"       , authorize(), list           );
router.delete("/:authId"    , authorize(), remove         );
router.get   ("/:authId"    , authorize(), retrieve       );
module.exports = router;

function assignSchema(req, res, next) {
	const schema = Joi.object({
		id: Joi.number().required(),
		assetId: Joi.number().required(),
		bit: Joi.number().required()
	});
	validateRequest(req, next, schema);
}
function actionSchema(req, res, next) {
	const schema = Joi.object({
		id: Joi.number().required()
	});
	validateRequest(req, next, schema);
}

async function assign(req, res, next) {
	const id = req.body.id;
	const viewer = await db.User.findByPk(id);
	const bit = req.body.bit;
	const assetId = req.body.assetId;
	viewService.createAuthorization(req.user.walletAddress, viewer.walletAddress, bit, assetId)
		.then((result) => res.json(result))
		.catch(next);
}

function remove(req, res, next) {
	const id = req.params.authId;
	viewService.removeAuthorization(id, req.user.walletAddress)
		.then((result) => res.json(result))
		.catch(next);
}

function retrieve(req, res, next) {
	const id = req.params.authId;
	viewService.retrieveAuthorized(id, req.user.walletAddress)
	.then(tuple => res.download(tuple.filePath, tuple.fileName))
		.catch(next);
}

function listAuthorized(req, res, next) {
	viewService.getAuthorizationsByViewer(req.user.walletAddress)
		.then((result) => res.json(result))
		.catch(next);
}

function list(req, res, next) {
	viewService.getAuthorizationsByOwner(req.user.walletAddress)
		.then((result) => res.json(result))
		.catch(next);
}
