'user strict';
var dbConn = require('../../../config/db.config');

//Employee object create
var Requests = function (req) {
    this.Title = req.body.Title;
    this.Description = requests.Description;
    this.Email = req.body.Email;
    this.Status = req.body.Status;
    this.CreatedBy = req.headers.CreatedBy;
    this.CreatedDate = new Date();
    this.UpdatedBy = req.body.UpdatedBy;
    this.UpdatedDate = new Date();
};
Requests.create = function (newRequest, result) {
    dbConn.query("INSERT INTO requests set ?", newRequest, function (err, res) {
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
Requests.findById = function (id, result) {
    dbConn.query("Select * from requests where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
Requests.findAll = function (result) {
    dbConn.query("Select * from requests", function (err, res) {
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
Requests.update = function (id, requests, result) {
    dbConn.query("UPDATE requests SET Title=?,Description=?,Email=?,Status=?,CreatedBy=?,UpdatedBy=?,UpdatedDate=? WHERE id = ?", [requests.Title, requests.Description,requests.Email,requests.Status,requests.CreatedBy,requests.UpdatedBy,new Date(), id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Requests.delete = function (id, result) {
    dbConn.query("DELETE FROM requests WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};

Requests.getvotesCount = function (result)
{
    dbConn.query("SELECT req.*,(Select count(v.Id) from votes v where v.RequestId=req.Id) as votesCount from requests as req LEFT JOIN votes as vot ON req.Id = vot.requestId GROUP by req.Id", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('Requests : ', res);
            result(null, res);
        }
    });
}

module.exports = Requests;