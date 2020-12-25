'use strict';

const User = require('../../models/user/user.model');
const httpStatusCode = require('http-status-codes');
const { responseGenerators } = require('../../../lib/utils');

exports.findAll = function (req, res) {
    User.findAll(function (err, user) {
        try {
            return res.status(httpStatusCode.OK).send(responseGenerators(user, httpStatusCode.OK, 'User data fetched successfully', false))
        } catch (error) {
            return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send({}, responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while fetch User data', true))
        }
    });
};


exports.create = function (req, res) {
    const new_user = new User(req);
    //handles null error 
    try {
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            return res.status(httpStatusCode.BAD_REQUEST).send(responseGenerators({}, httpStatusCode.BAD_REQUEST, 'Please provide all required field', true));
        }
        User.create(new_user, function (err, user) {
            return res.status(httpStatusCode.OK).send(responseGenerators(user, httpStatusCode.OK, 'user data added successfully!', false));
        });
    }
    catch (error) {
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while adding user detail', true))
    }

};


exports.findById = function (req, res) {
    User.findById(req.params.id, function (err, request) {
        try {
            return res.status(httpStatusCode.OK).send(responseGenerators(request, httpStatusCode.OK, 'User data fetched successfully', false))
        } catch (error) {
            return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while fetch User data', true))
        }
    });
};


exports.update = function (req, res) {
    try {
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            return res.status(httpStatusCode.BAD_REQUEST).send(responseGenerators(httpStatusCode.BAD_REQUEST, 'Please provide all required field', true));
        }
        User.update(req.params.id, new User(req.body), function (err, user) {
            return res.status(httpStatusCode.OK).send(responseGenerators({}, httpStatusCode.OK, 'User detail updated successfully', false))
        });

    } catch (error) {
        return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while update User detail', true))
    }

};


exports.delete = function (req, res) {
    User.delete(req.params.id, function (err, request) {
        try {
            if (res === 0) {
                return res.status(httpStatusCode.OK).send(responseGenerators({}, httpStatusCode.OK, 'No post data deleted', false))
            }
            return res.status(httpStatusCode.OK).send(responseGenerators({}, httpStatusCode.OK, 'User detail deleted successfully', false))
        } catch (error) {
            return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while edit User detail', true))
        }
    });
};


exports.verifyUser = function (req, res) {
    User.verifyUser(new User(req.body), function (err, users) {
        try {
            return res.status(httpStatusCode.OK).send(responseGenerators(users, httpStatusCode.OK, 'verify User data successfully', false))
        } catch (error) {
            return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, 'Error while fetch User data', true))
        }
    });
};
