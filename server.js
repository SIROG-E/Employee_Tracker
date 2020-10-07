// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");


// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Manzanita19",
    database: "employee_DB"
});

// connection ID
connection.connect(function (err) {
    if (err) throw err;
    startPrompt();
});

// Initial Prompt
function startPrompt() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            View All Employees,
            View All Employees By Department,
            View All Employees By Manager,
            Add Employee,
            Remove Employee,
            Update Employee Role,
            Update Employee Manager,
            Done
        ]
    })
      .then((answer) => {
        switch (answer.action) {
            case "View All Employees":
                viewEmp();
                break;

            case "View All Employees By Department":
                viewEmpByDept();
                break;

            case "View All Employees By Manager":
                viewEmpByMgr();
                break;

            case "Add Employee":
                addEmp();
                break;

            case "Remove Employee":
                removeEmp();
                break;

            case "Update Employee Role":
                updateEmpRole();
                break;

            case "Update Employee Manager":
                updateEmpMgr();
                break;
        }
    });
};



