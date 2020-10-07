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
    database: "employees_DB"
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
            "View All Employees",
            "View All Employees By Role",
            "View All Employees By Department",
            "View All Employees By Manager",
            "Add Employee",
            "Add Role",
            "Add Department",
            "Delete Employee",
            "Delete Role",
            "Delete Department",
            "Update Employee Role",
            "Update Employee Manager",
            "View Department Budgets",
            "Done"
        ]
    })
        .then((answer) => {
            switch (answer.action) {
                case "View All Employees":
                    viewEmp();
                    break;

                case "View All Employees By Role":
                    viewEmpByRole();
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

                case "Add Role":
                    addRole();
                    break;

                case "Add Department":
                    addDept();
                    break;

                case "Delete Employee":
                    deleteEmp();
                    break;

                case "Delete Role":
                    deleteRole();
                    break;

                case "Delete Department":
                    deleteDept();
                    break;

                case "Update Employee Role":
                    updateEmpRole();
                    break;

                case "Update Employee Manager":
                    updateEmpMgr();
                    break;

                case "View Department Budget":
                    viewDeptBudget();
                    break;

                case "Done":
                    connection.end();
                    break;
            }
        });
};



