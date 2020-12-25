'user strict';
var dbConn = require('../../../config/db.config');

//Employee object create
var Users = function(req) {
    this.FirstName = req.body.FirstName;
    this.LastName = req.body.LastName;
    this.Email = req.body.Email;
    this.Photo = req.body.Photo;
    this.Domain = req.body.Domain;
    this.CreatedBy = req.headers.createdby;
    this.CreatedDate = new Date();
    this.UpdatedBy = req.body.UpdatedBy;
    this.UpdatedDate = new Date();
    this.IsActive = req.body.IsActive;
    this.RoleId = req.body.RoleId;
    this.Password =req.body.Password;
    this.SlackId = req.body.SlackId;
    this.IsFirstLoggedIn = req.body.IsFirstLoggedIn;
    this.FirstLoggedInOn = req.body.FirstLoggedInOn;
    this.LastLoggedInOn = req.body.LastLoggedInOn;
};
Users.create = function (newUser, result) {
    dbConn.query("INSERT INTO users set ?", newUser, function (err, res) {
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
Users.findById = function (id, result) {
    dbConn.query("Select * from users where UserId = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
Users.findAll = function (result) {
    dbConn.query("Select * from users", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('Requests : ', res);
            result(null, res);
        }
    });
};
Users.update = function (id, users, result) {
    dbConn.query("UPDATE users SET FirstName=?,LastName=?,EmailId=?,Photo=?,CreatedBy=?,UpdatedBy=?,UpdatedDate=?,IsActive=?,RoleId=?,SlackId=?,WorkSpaceId=?,IsFirstLoggedIn=?,FirstLoggedInOn=?,LastLoggedInOn=?,InvitationCode=?,InvitedOn=? WHERE UserId = ?", [users.FirstName, users.LastName, users.EmailId, users.Photo, users.CreatedBy, users.UpdatedBy, user.UpdatedDate ,users.IsActive,users.RoleId,users.SlackId,users.WorkSpaceId,users.IsFirstLoggedIn,users.FirstLoggedInOn,users.LastLoggedInOn,users.InvitationCode,users.InvitedOn, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Users.delete = function (id, result) {
    dbConn.query("DELETE FROM users WHERE UserId = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
Users.verifyUser = function (user, result) {
    dbConn.query("Select * from users where EmailId= ? and Password= ?", [user.EmailId,user.Password], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};


module.exports = Users;