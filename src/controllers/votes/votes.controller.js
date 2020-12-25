'use strict';

const { responseGenerators } = require('../../../lib/utils');
const httpStatusCode = require('http-status-codes');
const Votes = require('../../models/votes/votes.model');

exports.findAll = function(req, res) {
    Votes.findAll(function(err, votes) {
    try {
        return res.status(httpStatusCode.OK).send(responseGenerators(votes, httpStatusCode.OK, 'User data fetched successfully', false))
    } catch (error) {
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGeneratorsonseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while fetch User data', true))
    }
  });
};


exports.create = function(req, res) {
    const new_Votes = new Votes(req);
    //handles null error 
        Votes.create(new_Votes, function(err, votes) {
            try {
                if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
                    return res.status(httpStatusCode.BAD_REQUEST).send(responseGenerators(httpStatusCode.BAD_REQUEST, 'Please provide all required field', true));
                }
                return res.status(httpStatusCode.OK).send(responseGenerators(votes, httpStatusCode.OK, 'Votes data added successfully!', false));
            }
            catch (error) {
                return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators(httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while adding Votes detail', true))
            }
        });
};


exports.findById = function(req, res) {
    Votes.findById(req.params.id, function(err, votes) {
        try {
            return res.status(httpStatusCode.OK).send(responseGenerators(votes, httpStatusCode.OK, 'Vote data fetched successfully', false))
        } catch (error) {
            return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while fetch User data', true))
        }
    });
};


exports.update = function(req, res) {
    try {
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            return res.status(httpStatusCode.BAD_REQUEST).send(responseGenerators(httpStatusCode.BAD_REQUEST, 'Please provide all required field', true));
        }
        Votes.update(req.params.id, new User(req.body), function (err, user) {
            return res.status(httpStatusCode.OK).send(responseGenerators({}, httpStatusCode.OK, 'Vote detail updated successfully', false))
        });

    } catch (error) {
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while update User detail', true))
    }
};


exports.delete = function(req, res) {
    Votes.delete( req.params.id, function(err, Votes) {
    try {
        if(res === 0) {
            return res.status(httpStatusCode.OK).send(responseGenerators({}, httpStatusCode.OK, 'No post data deleted', false))
        }
        return res.status(httpStatusCode.OK).send(responseGenerators({}, httpStatusCode.OK, 'Vote detail deleted successfully', false))
    } catch (error) {
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while edit Vote detail', true))
    }
  });
};

exports.findByEmail = function(req, res) {
    Votes.findByEmail(new Votes(req.body), function(err, votes) {
        try {
            return res.status(httpStatusCode.OK).send(responseGenerators(votes, httpStatusCode.OK, 'Vote data fetched successfully', false))
        } catch (error) {
            return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while fetch User data', true))
        }
    });
};