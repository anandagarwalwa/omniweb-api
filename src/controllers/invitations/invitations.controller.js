'use strict';

const Invitations = require('../../models/invitations/invitations.model');
const { responseGenerators } = require('../../../lib/utils');
const httpStatusCode = require('http-status-codes');

exports.findAll = function (req, res) {
    Invitations.findAll(function (err, response) {
        try {
            return res.status(httpStatusCode.OK).send(responseGenerators(response, httpStatusCode.OK, 'invitations data fetched successfully', false))
        } catch (error) {
            return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while fetch invitations data', true))
        }
    });
};


exports.create = function (req, res) {
    const new_invitations = new Invitations(req);

    //handles null error 
    Invitations.create(new_invitations, function (err, response) {
        try {
            if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
                return res.status(httpStatusCode.BAD_REQUEST).send(responseGenerators(httpStatusCode.BAD_REQUEST, 'Please provide all required field', true));
            }
            return res.status(httpStatusCode.OK).send(responseGenerators(response, httpStatusCode.OK, 'invitations data added successfully!', false));
        }
        catch (error) {
            return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators(httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while adding invitations detail', true))
        }
    });

};


exports.findById = function (req, res) {
    Invitations.findById(req.params.id, function (err, response) {
        if (err)
            res.send(err);
        res.json(votes);
        try {
            return res.status(httpStatusCode.OK).send(responseGenerators(response, httpStatusCode.OK, 'invitations data fetched successfully', false))
        } catch (error) {
            return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while fetch invitations data', true))
        }
    });
};


exports.update = function (req, res) {
    try {
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            return res.status(httpStatusCode.BAD_REQUEST).send(responseGenerators(httpStatusCode.BAD_REQUEST, 'Please provide all required field', true));
        }
        Invitations.update(req.params.id, new Invitations(req.body), function (err, user) {
            return res.status(httpStatusCode.OK).send(responseGenerators({}, httpStatusCode.OK, 'invitations detail updated successfully', false))
        });

    } catch (error) {
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while update invitations detail', true))
    }
};


exports.delete = function (req, res) {
    Invitations.delete(req.params.id, function (err, workspace) {
        try {
            if(res === 0) {
                return res.status(httpStatusCode.OK).send(responseGenerators({}, httpStatusCode.OK, 'No post data deleted', false))
            }
            return res.status(httpStatusCode.OK).send(responseGenerators({}, httpStatusCode.OK, 'invitations detail deleted successfully', false))
        } catch (error) {
            return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while edit invitations detail', true))
        }
    });
};
