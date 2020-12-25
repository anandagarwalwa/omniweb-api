const express = require('express')
const router = express.Router()
const invitationsController = require('../../controllers/invitations/invitations.controller');

// Retrieve all invitations
router.get('/', invitationsController.findAll);

// Create a new invitations
router.post('/', invitationsController.create);

// Retrieve a single invitations with id
router.get('/:id', invitationsController.findById);

// Update a invitations with id
router.put('/:id', invitationsController.update);

// Delete a invitations with id
router.delete('/:id', invitationsController.delete);


module.exports = router