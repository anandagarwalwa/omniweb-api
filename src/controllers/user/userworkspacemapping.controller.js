'use strict';

const Userworkspacemapping = require('../../models/user/userworkspacemapping.model');
const { responseGenerators } = require('../../../lib/utils');
const httpStatusCode = require('http-status-codes');

exports.findAll = function (req, res) {
    Userworkspacemapping.findAll(function (err, response) {
        try {
            return res.status(httpStatusCode.OK).send(responseGenerators(response, httpStatusCode.OK, 'Userworkspacemapping data fetched successfully', false))
        } catch (error) {
            return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while fetch Userworkspacemapping data', true))
        }
    });
};


exports.create = function (req, res) {
    const new_Userworkspacemapping = new Userworkspacemapping(req);

    //handles null error 
    Userworkspacemapping.create(new_Userworkspacemapping, function (err, response) {
        try {
            if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
                return res.status(httpStatusCode.BAD_REQUEST).send(responseGenerators(httpStatusCode.BAD_REQUEST, 'Please provide all required field', true));
            }
            return res.status(httpStatusCode.OK).send(responseGenerators(response, httpStatusCode.OK, 'Userworkspacemapping data added successfully!', false));
        }
        catch (error) {
            return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators(httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while adding Userworkspacemapping detail', true))
        }
    });

};


exports.findById = function (req, res) {
    Userworkspacemapping.findById(req.params.id, function (err, response) {
        try {
            return res.status(httpStatusCode.OK).send(responseGenerators(response, httpStatusCode.OK, 'Userworkspacemapping data fetched successfully', false))
        } catch (error) {
            return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while fetch Userworkspacemapping data', true))
        }
    });
};


exports.update = function (req, res) {
    try {
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            return res.status(httpStatusCode.BAD_REQUEST).send(responseGenerators(httpStatusCode.BAD_REQUEST, 'Please provide all required field', true));
        }
        Userworkspacemapping.update(req.params.id, new Userworkspacemapping(req.body), function (err, user) {
            return res.status(httpStatusCode.OK).send(responseGenerators({}, httpStatusCode.OK, 'Userworkspacemapping detail updated successfully', false))
        });

    } catch (error) {
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while update Userworkspacemapping detail', true))
    }
};


exports.delete = function (req, res) {
    Userworkspacemapping.delete(req.params.id, function (err, workspace) {
        try {
            if(res === 0) {
                return res.status(httpStatusCode.OK).send(responseGenerators({}, httpStatusCode.OK, 'No post data deleted', false))
            }
            return res.status(httpStatusCode.OK).send(responseGenerators({}, httpStatusCode.OK, 'Userworkspacemapping detail deleted successfully', false))
        } catch (error) {
            return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while edit Userworkspacemapping detail', true))
        }
    });
};
