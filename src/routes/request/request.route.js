const { request } = require('express');
const express = require('express')
const router = express.Router()
const requestController = require('../../controllers/request/request.controller');

// Retrieve all requests
router.get('/', requestController.findAll);

// Create a new requests
router.post('/', requestController.create);

// Retrieve a single requests with id
router.get('/:id', requestController.findById);

// Update a requests with id
router.put('/:id', requestController.update);

// Delete a requests with id
router.delete('/:id', requestController.delete);

router.post('/getVotesCount',requestController.getvotesCount);

module.exports = router