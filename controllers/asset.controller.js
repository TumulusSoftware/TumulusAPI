const express = require('express');
const fileUpload = require('express-fileupload');
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const assetService = require("services/asset.service");
const config = require('_config/config');

const router = express.Router();
router.use(fileUpload({
	useTempFiles: true,
	tempFileDir: config.getTmpDir()
}));

// routes
router.post('/upload', authorize(), upload    );
router.get ('/list'  , authorize(), list      );
router.get ('/:id'   , authorize(), getByOwner);
module.exports = router;

function list(req, res, next) {
	const ownerId = req.user.id; // Through authorize()
	assetService.list(ownerId)
		.then(result => res.json(result))
		.catch(next);
}

async function getByOwner(req, res, next) {
	var assetId = req.params.id;
	const ownerAddress = req.user.walletAddress; // Through authorize()
	assetService.getByOwner(assetId, ownerAddress)
		.then(tuple => res.download(tuple.filePath, tuple.fileName))
		.catch(next);
}

async function upload(req, res, next) {
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded.');
	}

	const af = req.files.assetFile; // the uploaded file object
	const tags = req.body.tags;
	var assetId = req.body.assetId; // can be 0.
	assetId = (!assetId) ? 0 : assetId;
	const ownerAddress = req.user.walletAddress; // Through authorize()
	const ownerId = req.user.id;
	assetService.store(assetId, af.name, af.tempFilePath, tags, ownerAddress, ownerId)
		.then(result => res.json(result))
		.catch(next);
}
