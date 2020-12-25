'user strict';
var dbConn = require('../../../config/db.config');

//Employee object create
var Userworkspacemapping = function (req) {
    this.UserId = re.body.UserId;
    this.WorkSpaceId = re.body.WorkSpaceId;
    this.CreatedOn = new Date();
    this.CreatedBy = req.headers.CreatedBy;
};
Userworkspacemapping.create = function (newuserworkspacemapping, result) {
    dbConn.query("INSERT INTO userworkspacemapping set ?", newuserworkspacemapping, function (err, res) {
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
Userworkspacemapping.findById = function (id, result) {
    dbConn.query("Select * from userworkspacemapping where Id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
Userworkspacemapping.findAll = function (result) {
    dbConn.query("Select * from userworkspacemapping", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
Userworkspacemapping.update = function (id, userworkspacemapping , result) {
    dbConn.query("UPDATE userworkspacemapping SET UserId=?,WorkSpaceId=?,CreatedOn=?,CreatedBy=? WHERE Id = ?", [userworkspacemapping.UserId,userworkspacemapping.WorkSpaceId,userworkspacemapping.CreatedOn,userworkspacemapping.CreatedBy, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Userworkspacemapping.delete = function (id, result) {
    dbConn.query("DELETE FROM userworkspacemapping WHERE Id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = Userworkspacemapping;