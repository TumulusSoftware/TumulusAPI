const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const userService = require('services/user.service');

// routes
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);
router.post('/verify', authorize(), verifySchema, verify);
router.get('/', authorize(), getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize(), getById);
// router.put('/:id', authorize(), updateSchema, update);
// router.delete('/:id', authorize(), _delete);
module.exports = router;

function authenticateSchema(req, res, next) {
	const schema = Joi.object({
		emailAsId: Joi.string().required(),
		password: Joi.string().required()
	});
	validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
	userService.authenticate(req.body)
		.then(user => res.json(user))
		.catch(next);
}

function registerSchema(req, res, next) {
	const schema = Joi.object({
		firstName: Joi.string().required(),
		lastName: Joi.string().required(),
		emailAsId: Joi.string().required(),
		password: Joi.string().min(6).required()
	});
	validateRequest(req, next, schema);
}

function register(req, res, next) {
	userService.create(req.body)
		.then(user => res.json(user))
		.catch(next);
}

function verifySchema(req, res, next) {
	const schema = Joi.object({
		veriCode: Joi.string().min(6).required()
	});
	validateRequest(req, next, schema);
}

function verify(req, res, next) {
	// const user = req.user;
	userService.verify(req.body.veriCode, req.user.id)
		.then(user => res.json(user))
		//  .then(() => res.json({ message: 'Verification successful' }))
		.catch(next);
}

function getAll(req, res, next) {
	userService.getAll()
		.then(users => res.json(users))
		.catch(next);
}

function getCurrent(req, res, next) {
	const { vcode, walletAddress, safeKey, publicKey, privateKey, status, ...public } = req.user;
	res.json(public);
}

function getById(req, res, next) {
	userService.getById(req.params.id)
		.then(user => {
			const { vcode, walletAddress, safeKey, publicKey, privateKey, status, ...public } = user.dataValues;
			return res.json(public);
		})
		.catch(next);
}

function updateSchema(req, res, next) {
	const schema = Joi.object({
		firstName: Joi.string().empty(''),
		lastName: Joi.string().empty(''),
		emailAsId: Joi.string().empty(''),
		password: Joi.string().min(6).empty('')
	});
	validateRequest(req, next, schema);
}

function update(req, res, next) {
	userService.update(req.params.id, req.body)
		.then(user => res.json(user))
		.catch(next);
}

function _delete(req, res, next) {
	userService.delete(req.params.id)
		.then(() => res.json({ message: 'User deleted successfully' }))
		.catch(next);
}