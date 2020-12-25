const express = require('express')
const router = express.Router()
const votesController = require('../../controllers/votes/votes.controller');

// Retrieve all employees
router.get('/', votesController.findAll);

// Create a new employee
router.post('/', votesController.create);

// Retrieve a single employee with id
router.get('/:id', votesController.findById);

// Update a employee with id
router.put('/:id', votesController.update);

// Delete a employee with id
router.delete('/:id', votesController.delete);

// Retrieve a single vote with email
router.post('/getVoteByEmail', votesController.findByEmail);

module.exports = router