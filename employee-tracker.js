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
        switch (answer.selection) {
            case "View Employee List":
                employeeList()
                break;
            
            case "View Department List":
                departmentList()
                break;

            case "View Role List":
                roleList()
                break;

            case "Add Employee":
                addEmployee()
                break;
            
            case "Add Department":
                addDepartment()
                break;
            
            case "Add Role":
                addRole()
                break;
            
            case "Update Employee Role":
                updateEmployeeRole()
                break;
            
            case "End":
                console.log('Thank you!');
                connection.end()
                break;

        }
    })
}

function employeeList() {
    connection.query("SELECT * FROM employee", function (err, data) {
        console.log('Generating')
        if (err) throw err;
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

function roleList() {
    connection.query("SELECT * FROM role", function (err, data) {
        if (err) throw err;
        console.table(data);
        employeeSearch();
    })
}

function addEmployee() {
    inquirer.prompt([
        {
            message:"What is the employee's first name?",
            type:'input',
            name:'firstName'
        },
        {
            message:"What is the employee's last name?",
            type:'input',
            name:'lastName'
        },
        {
            message:"What is the employee's role ID number?",
            type:'number',
            name:'roleID'
        },
        {
            message:"What is the employee's manager's ID number?",
            type:'number',
            name:'managerID'
        }
    ]).then(function(res){
        connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.roleID, res.managerID],
        function(err, data){
            if (err) throw err;
            console.log('Added Employee');
            employeeSearch();
        })
    })
}