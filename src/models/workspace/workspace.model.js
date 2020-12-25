'user strict';
var dbConn = require('../../../config/db.config');

//Employee object create
var Workspace = function (req) {
    this.Name = req.body.Name;
    this.Domain = req.body.Domain;
    this.CreatedBy = req.headers.createdby;
    this.CreatedDate = new Date();
    this.PlanId = req.body.PlanId;
    this.DueDate = new Date();
};
Workspace.create = function (newWorkspace, result) {
    dbConn.query("INSERT INTO workspace set ?", newWorkspace, function (err, res) {
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
Workspace.findById = function (id, result) {
    dbConn.query("Select * from workspace where CreatedBy = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
Workspace.findAll = function (result) {
    dbConn.query("Select * from workspace", function (err, res) {
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
Workspace.update = function (id, workspace , result) {
    dbConn.query("UPDATE workspace SET Name=?,Domain=?,CreatedBy=?,CreatedDate=?,PlanId=?,DueDate=? WHERE Id = ?", [workspace.email,workspace.Domain,workspace.CreatedBy,workspace.CreatedDate,workspace.PlanId,workspace.DueDate, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Workspace.delete = function (id, result) {
    dbConn.query("DELETE FROM workspace WHERE Id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

module.exports = Workspace;