"use strict";
var db_1 = require("./db");
var yargs_userInfo = require('yargs').argv;
var data = {
    name: yargs_userInfo.name,
    email: yargs_userInfo.email,
    address: yargs_userInfo.address
};
var db_obj = new db_1.DB();
if (yargs_userInfo.opt === "s") {
    db_obj.select();
}
if (yargs_userInfo.opt === "c") {
    db_obj.create(data);
}
if (yargs_userInfo.opt === "u") {
    db_obj.update(10, data);
}
if (yargs_userInfo.opt === "d") {
    db_obj.delete(yargs_userInfo.id);
}
