'use strict';

const Workspace = require('../../models/workspace/workspace.model');
const { responseGenerators } = require('../../../lib/utils');
const httpStatusCode = require('http-status-codes');

exports.findAll = function (req, res) {
    Workspace.findAll(function (err, response) {
        try {
            return res.status(httpStatusCode.OK).send(responseGenerators(response, httpStatusCode.OK, 'User data fetched successfully', false))
        } catch (error) {
            return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while fetch User data', true))
        }
    });
};


exports.create = function (req, res) {
    const new_workspace = new Workspace(req);

    //handles null error 
    Workspace.create(new_workspace, function (err, response) {
        try {
            if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
                return res.status(httpStatusCode.BAD_REQUEST).send(responseGenerators({},httpStatusCode.BAD_REQUEST, 'Please provide all required field', true));
            }
            return res.status(httpStatusCode.OK).send(responseGenerators(response, httpStatusCode.OK, 'workspace data added successfully!', false));
        }
        catch (error) {
            return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({},httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while adding user detail', true))
        }
    });

};


exports.findById = function (req, res) {
    Workspace.findById(req.params.id, function (err, response) {
        try {
            return res.status(httpStatusCode.OK).send(responseGenerators(response, httpStatusCode.OK, 'User data fetched successfully', false))
        } catch (error) {
            return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while fetch User data', true))
        }
    });
};


exports.update = function (req, res) {
    try {
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            return res.status(httpStatusCode.BAD_REQUEST).send(responseGenerators({},httpStatusCode.BAD_REQUEST, 'Please provide all required field', true));
        }
        Workspace.update(req.params.id, new Workspace(req.body), function (err, user) {
            return res.status(httpStatusCode.OK).send(responseGenerators({}, httpStatusCode.OK, 'workspace detail updated successfully', false))
        });

    } catch (error) {
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while update User detail', true))
    }
};


exports.delete = function (req, res) {
    Workspace.delete(req.params.id, function (err, workspace) {
        try {
            if(res === 0) {
                return res.status(httpStatusCode.OK).send(responseGenerators({}, httpStatusCode.OK, 'No post data deleted', false))
            }
            return res.status(httpStatusCode.OK).send(responseGenerators({}, httpStatusCode.OK, 'workspace detail deleted successfully', false))
        } catch (error) {
            return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while edit workspace detail', true))
        }
    });
};
