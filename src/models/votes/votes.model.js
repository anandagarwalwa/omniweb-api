'user strict';
var dbConn = require('../../../config/db.config');

//Employee object create
var Votes = function (req) {
    this.Email = req.body.Email;
    this.RequestId = req.body.RequestId;
    this.CreatedBy = req.headers.CreatedBy;
    this.CreatedDate = new Date();
    this.UpdatedBy = req.body.UpdatedBy;
    this.UpdatedDate = new Date();
};
 
Votes.create = function (newVote, result) {
    dbConn.query("INSERT INTO votes set ?", newVote, function (err, res) {
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
Votes.findById = function (id, result) {
    dbConn.query("Select * from votes where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
Votes.findAll = function (result) {
    dbConn.query("Select * from votes", function (err, res) {
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
Votes.update = function (id, vote, result) {
    dbConn.query("UPDATE votes SET Email=?,RequestId=?,CreatedBy=?,UpdatedBy=?,UpdatedDate=? WHERE id = ?", [vote.email,vote.RequestId,vote.CreatedBy,vote.UpdatedBy,vote.UpdatedDate, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Votes.delete = function (id, result) {
    dbConn.query("DELETE FROM votes WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
Votes.findByEmail = function (vote ,result) {
    dbConn.query("Select * from votes where Email= ? and RequestId=?", [vote.Email,vote.RequestId], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};


module.exports = Votes;