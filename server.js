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
    //Inquirer options for user
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
            "Update Employee Manager",
            "End"
        ]
    }).then(answer => {
        //Case statement for inquirer selection
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
            
            case "Update Employee Manager":
                updateEmployeeManager()
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
    //inquirer prompt questions for employee info
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
        //query to insert into database
        connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.roleID, res.managerID],
        function(err, data){
            if (err) throw err;
            console.log('Added Employee');
            employeeSearch();
        })
    })
}

function addDepartment(){
    //inquirer prompt questions for department info
    inquirer.prompt([
        {
            message:"What is the name of the department?",
            type:'input',
            name:'deptName'
        }
    ]).then(function(res){
        //query to insert insert into database
        connection.query('INSERT INTO department (name) VALUES (?)', [res.deptName], function(err, data){
            if (err) throw err;
            console.log('Added Department');
            employeeSearch();
        })
    })
}

function addRole(){
    //inquirer prompt questions for role info
    inquirer.prompt([
        {
            message:"What is the title of the role?",
            type:'input',
            name:'roleTitle'
        },
        {
            message:"What is the salary of the role?",
            type:'input',
            name:'roleSalary'
        },
        {
            message:"What is the department ID of the role?",
            type:'input',
            name:'deptID'
        }
    ]).then(function(res){
        //query to insert into database
        connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [res.roleTitle, res.roleSalary, res.deptID], function(err, data){
            if (err) throw err;
            console.log('Added Role');
            employeeSearch();
        })
    })
}

function updateEmployeeRole(){
    //inquirer prompt
    inquirer.prompt([
        {
            message:"What employee will you update?",
            type:'input',
            name:'name'
        },
        {
            message:"Please enter the new role ID",
            type:'input',
            name:'roleID'
        },
    ]).then(function(res){
        connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [res.roleID, res.name], function(err, data){
            if (err) throw err;
            console.log('Updated Role');
            employeeSearch();
        })
    })
}

function updateEmployeeManager(){
    //inquirer prompt
    inquirer.prompt([
        {
            message:"What employee will you update?",
            type:'input',
            name:'name'
        },
        {
            message:"Please enter the manager ID",
            type:'input',
            name:'mgrID'
        }
    ]).then(function(res){
        //query to insert into database
        connection.query("UPDATE employee SET manager_id = ? WHERE first_name = ?", [res.mgrID, res.name], function(err,data){
            if (err) throw err;
            console.log('Updated Manager ID');
            employeeSearch();
        })
    })
}