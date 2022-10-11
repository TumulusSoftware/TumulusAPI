const express = require("express");
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");
const agreementService = require("../services/agreement.service");

// routes
const router = express.Router();
router.post  ("/request"    , authorize(), requestSchema  , request );
router.delete("/:id"        , authorize(), remove  );
router.put   ("/agree"      , authorize(), actionSchema   , agree   );
router.put   ("/reject"     , authorize(), actionSchema   , reject  );
router.put   ("/announce"   , authorize(), actionSchema   , announce);
router.get   ("/byOwner"    , authorize(), listByOwner              );
router.get   ("/byAnnouncer", authorize(), listByAnnouncer          );
module.exports = router;

function requestSchema(req, res, next) {
	const schema = Joi.object({
		id: Joi.number().required(),
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

function listByOwner(req, res, next) {
	agreementService.getAgreementsByOwner(req.user.walletAddress)
		.then((result) => res.json(result))
		.catch(next);
}
function listByAnnouncer(req, res, next) {
	agreementService.getAgreementsByAnnouncer(req.user.walletAddress)
		.then((result) => res.json(result))
		.catch(next);
}
async function request(req, res, next) {
	const id = req.body.id;
	const announcer = await db.User.findByPk(id);
	const bit = req.body.bit;
	agreementService.requestAgreement(req.user.walletAddress, announcer.walletAddress, bit)
		.then((result) => res.json(result))
		.catch(next);
}
function remove(req, res, next) {
	const id = req.params.id;
	agreementService.deleteAgreement(id, req.user.walletAddress)
		.then((result) => res.json(result))
		.catch(next);
}
function agree(req, res, next) {
	const id = req.body.id;
	agreementService.agreeAgreement(id, req.user.walletAddress)
		.then((result) => res.json(result))
		.catch(next);
}
function reject(req, res, next) {
	const id = req.body.id;
	agreementService.rejectAgreement(id, req.user.walletAddress)
		.then((result) => res.json(result))
		.catch(next);
}
function announce(req, res, next) {
	const id = req.body.id;
	agreementService.announce(id, req.user.walletAddress)
		.then((result) => res.json(result))
		.catch(next);
}
