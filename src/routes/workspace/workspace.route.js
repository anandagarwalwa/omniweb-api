const express = require('express')
const router = express.Router()
const workspaceController = require('../../controllers/workspace/workspace.controller');

// Retrieve all workspace
router.get('/', workspaceController.findAll);

// Create a new workspace
router.post('/', workspaceController.create);

// Retrieve a single workspace with id
router.get('/:id', workspaceController.findById);

// Update a workspace with id
router.put('/:id', workspaceController.update);

// Delete a workspace with id
router.delete('/:id', workspaceController.delete);


module.exports = router