const express = require("express");
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");

const stateService = require("services/state.service");

// routes
const router = express.Router();
router.put    ('/threshold' , authorize(), thresholdSchema, threshold );
router.delete ('/:bit'      , authorize(), remove    );
router.get    ('/list'      , authorize(), list      );
module.exports = router;

function thresholdSchema(req, res, next) {
	const schema = Joi.object({
		value: Joi.number().required(),
		bit: Joi.number().required()
	});
	validateRequest(req, next, schema);
}

function list(req, res, next) {
	stateService.getStates(req.user.walletAddress)
		.then((result) => res.json(result))
		.catch(next);
}

function remove(req, res, next) {
	const bit = req.params.bit;
	stateService.removeState(req.user.walletAddress, bit)
		.then((result) => res.json(result))
		.catch(next);
}

async function threshold(req, res, next) {
	const bit = req.body.bit;
	const value = req.body.value;
	stateService.setThreshold(req.user.walletAddress, bit, value)
		.then((result) => res.json(result))
		.catch(next);
}
 