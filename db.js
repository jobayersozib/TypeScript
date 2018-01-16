"use strict";
var express = require('express');
var app = express();
var result;
var DB_CONN_OBJ = {
    host: "localhost",
    user: "root",
    password: "",
    database: "nodedb"
};
var DB = (function () {
    function DB() {
        this.mysql = require('mysql');
        this.connection = this.mysql.createConnection(DB_CONN_OBJ);
        this.connection.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }
            console.log("connected");
        });
    }
    DB.prototype.select = function () {
        this.connection.query('SELECT * FROM users WHERE 1', function (error, results, fields) {
            if (error) {
                console.log("Error ....");
            }
            else {
                var data = {};
                app.get('/', function (req, res) {
                    res.setHeader('Content-Type', 'application/json');
                    for (var i = 0; i < results.length; i++) {
                        //  console.log('Name: ',results[i].username);
                        //  console.log('E-mail: ',results[i].email);
                        //  console.log('Address: ',results[i].address);
                        data[results[i].id] = { name: results[i].username, email: results[i].email, address: results[i].address };
                    }
                    res.send(data);
                });
                app.listen(process.env.PORT, function () { return console.log('Example app listening on port 3000!'); });
            }
            result = results;
        });
        this.connection.end();
        return result;
    };
    DB.prototype.update = function (id, info) {
        this.connection.query("UPDATE users SET username= ?, email= ?, address = ?  WHERE id=?", [info.name, info.email, info.address, id], function (error, results, fields) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("User updated ");
            }
        });
        this.connection.end();
        return "";
    };
    DB.prototype.create = function (info) {
        this.connection.query("INSERT INTO users (username,email,address) VALUES(?,?,?)", [info.name, info.email, info.address], function (error, results, fields) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("User created ");
                console.log("Name : ", info.name);
                console.log("E-mail : ", info.email);
                console.log("Address : ", info.address);
            }
        });
        this.connection.end();
        return "";
    };
    DB.prototype.delete = function (id) {
        this.connection.query("DELETE FROM `users` WHERE id=?", [id], function (error, results, fields) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("User deleted ");
            }
        });
        this.connection.end();
        return "";
    };
    return DB;
}());
exports.DB = DB;
