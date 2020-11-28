const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    
    host: "localhost",

    //Port
    port: 3306,

    //Username
    user: "root",

    //Password
    password: "rootroot",
    database: "employee_DB"

});

connection.connect(function(err) {
if (err) throw err;
employeeSearch();
});