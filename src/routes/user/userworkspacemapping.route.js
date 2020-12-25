const express = require('express')
const router = express.Router()
const userworkspacemappingController = require('../../controllers/user/userworkspacemapping.controller');

// Retrieve all userworkspacemapping
router.get('/', userworkspacemappingController.findAll);

// Create a new userworkspacemapping
router.post('/', userworkspacemappingController.create);

// Retrieve a single userworkspacemapping with id
router.get('/:id', userworkspacemappingController.findById);

// Update a userworkspacemapping with id
router.put('/:id', userworkspacemappingController.update);

// Delete a userworkspacemapping with id
router.delete('/:id', userworkspacemappingController.delete);


module.exports = router