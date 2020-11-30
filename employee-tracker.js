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
console.log("Connected");
employeeSearch();
});

function employeeSearch() {
    inquirer.prompt({
        message: "Please select what you would like to perform",
        type: "list",
        name: "selection",
        choices: [
            "View Employee List",
            "View Department List",
            "View Role List",
            "Add Employee",
            "Add Department",
            "Add Role",
            "Update Employee Role",
            "End"
        ]
    }).then(answer => {
        switch (answer.choice) {
            case "View Employee List":
                employeeList()
                break;
            
            case "View Department List":
                departmentList()
                break;

            case "View Role List":
                RoleList()
                break;
        }
    })
}

function employeeList() {
    connection.query("SELECT * FROM employee", function (err, data) {
        console.table(data);
        employeeSearch();
    })
}

function departmentList() {
    connection.query("SELECT * FROM department", function (err, data) {
        if (err) throw err;
        console.table(data);
        employeeSearch();
    })
}