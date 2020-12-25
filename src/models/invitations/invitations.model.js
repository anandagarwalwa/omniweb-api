'user strict';
var dbConn = require('../../../config/db.config');
const { v4: uuidv4 } =require('uuid');

//Employee object create
var Invitations = function (req) {
    this.Email = req.body.Email;
    this.Code = uuidv4();
    this.InvitedOn = new Date() ;
    this.WorkSpaceId = req.body.WorkSpaceId;
    this.InvitedBy = req.headers.invitedby;
    this.IsJoined = false;
};
Invitations.create = function (newInvitations, result) {
    dbConn.query("INSERT INTO invitations set ?", newInvitations, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Invitations.findById = function (id, result) {
    dbConn.query("Select * from invitations where CreatedBy = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
Invitations.findAll = function (result) {
    dbConn.query("Select * from invitations", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('Votes : ', res);
            result(null, res);
        }
    });
};
Invitations.update = function (id, invitations , result) {
    dbConn.query("UPDATE invitations SET Email=?,Code=?,InvitedOn=?,WorkSpaceId=?,InvitedBy=?,IsJoined=? WHERE Id = ?", [invitations.Email,invitations.Code,invitations.InvitedOn,invitations.WorkSpaceId,invitations.InvitedBy,invitations.IsJoined, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Invitations.delete = function (id, result) {
    dbConn.query("DELETE FROM invitations WHERE Id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = Invitations;