'use strict';

const Request = require('../../models/request/request.model');
const httpStatusCode = require('http-status-codes');
const { responseGenerators } = require('../../../lib/utils');

exports.findAll = function (req, res) {
    Request.findAll(function (err, response) {
        try {
            return res.status(httpStatusCode.OK).send(responseGenerators(response, httpStatusCode.OK, 'request data fetched successfully', false))
        } catch (error) {
            return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while fetch request data', true))
        }
    });
};


exports.create = function (req, res) {
    const new_request = new Request(req);

    //handles null error 
    Request.create(new_request, function (err, request) {
        try {
            if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
                return res.status(httpStatusCode.BAD_REQUEST).send(responseGenerators(httpStatusCode.BAD_REQUEST, 'Please provide all required field', true));
            }
            return res.status(httpStatusCode.OK).send(responseGenerators(response, httpStatusCode.OK, 'request data added successfully!', false));
        }
        catch (error) {
            return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators(httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while adding request detail', true))
        }
    });
};


exports.findById = function (req, res) {
    Request.findById(req.params.id, function (err, response) {
        try {
            return res.status(httpStatusCode.OK).send(responseGenerators(response, httpStatusCode.OK, 'request data fetched successfully', false))
        } catch (error) {
            return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while fetch request data', true))
        }
    });
};


exports.update = function (req, res) {
    Request.update(req.params.id, new Request(req.body), function (err, user) {
        try {
            if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
                return res.status(httpStatusCode.BAD_REQUEST).send(responseGenerators(httpStatusCode.BAD_REQUEST, 'Please provide all required field', true));
            }
            Teams.update(req.params.id, new Teams(req.body), function (err, user) {
                return res.status(httpStatusCode.OK).send(responseGenerators({}, httpStatusCode.OK, 'Request detail updated successfully', false))
            });

        } catch (error) {
            return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while update Request detail', true))
        }
    });
};


exports.delete = function (req, res) {
    Request.delete(req.params.id, function (err, request) {
        try {
            if (res === 0) {
                return res.status(httpStatusCode.OK).send(responseGenerators({}, httpStatusCode.OK, 'No Request data deleted', false))
            }
            return res.status(httpStatusCode.OK).send(responseGenerators({}, httpStatusCode.OK, 'Request detail deleted successfully', false))
        } catch (error) {
            return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while edit Request detail', true))
        }
    });
};

exports.getvotesCount = function (req, res) {
    Request.getvotesCount(function (err, response) {
        try {
            return res.status(httpStatusCode.OK).send(responseGenerators(response, httpStatusCode.OK, 'get Votes Conuts data fetched successfully', false))
        } catch (error) {
            return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while fetch get Votes Conuts data', true))
        }
    });
}