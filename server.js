// Dependencies
const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");


// Create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Manzanita19",
    database: "employees_DB"
});

// Connection ID
connection.connect(function(err) {
    if (err) throw err
    console.log("Connected as Id" + connection.threadId)
    startPrompt();
});

// connection.connect();

// startPrompt();

// Initial Prompt
function startPrompt() {
    inquirer.prompt([
        {
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees By Role",
            "View All Employees By Department",
            // "View All Employees By Manager",
            "Add Employee",
            "Add Role",
            "Add Department",
            // "Delete Employee",
            // "Delete Role",
            // "Delete Department",
            "Update Employee",
            // "Update Employee Role",
            // "Update Employee Manager",
            // "View Department Budgets",
            new inquirer.Separator(),
            "Done",
            new inquirer.Separator(),
            ]
        }
]) .then((answer) => {
            switch (answer.action) {
                case "View All Employees":
                    viewAllEmployees();
                    break;
            
                case "View All Employees By Role":
                    viewAllEmployeesByRole();
                    break;

                case "View All Employees By Department":
                    viewAllEmployeesByDept();
                    break;

                // case "View All Employees By Manager":
                //     viewAllEmployeesByMgr();
                //     break;

                case "Add Employee":
                    addEmployee();
                    break;

                case "Add Role":
                    addRole();
                    break;

                case "Add Department":
                    addDept();
                    break;

                // case "Delete Employee":
                //     deleteEmployee();
                //     break;

                // case "Delete Role":
                //     deleteRole();
                //     break;

                // case "Delete Department":
                //     deleteDept();
                //     break;

                case "Update Employee":
                    updateEmployee();
                    break;

                // case "Update Employee Role":
                //     updateEmployeeRole();
                //     break;

                // case "Update Employee Manager":
                //     updateEmployeeMgr();
                //     break;

                // case "View Department Budget":
                //     viewDeptBudget();
                //     break;

                case "Done":
                    shutdown();
                    return;
                    // connection.end();
            }
            // startPrompt();
        });
};

function shutdown() {
    connection.end();
}

// View all employees
function viewAllEmployees() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
  })
}

// View All Roles
function viewAllEmployeesByRole() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;", 
    function(err, res) {
    if (err) throw err
    console.table(res)
    startPrompt()
    })
  }

  // View All Employees By Departments
  function viewAllEmployeesByDept() {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
    })
  }
  
  // Select Role Quieries Role Title for Add Employee Prompt 
  var roleArr = [];
  function selectRole() {
    connection.query("SELECT * FROM role", function(err, res) {
      if (err) throw err
      for (var i = 0; i < res.length; i++) {
        roleArr.push(res[i].title);
      }
  
    })
    return roleArr;
  }
  // Select Role Queries The Managers for Add Employee Prompt
  var managersArr = [];
  function selectManager() {
    connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res) {
      if (err) throw err
      for (var i = 0; i < res.length; i++) {
        managersArr.push(res[i].first_name);
      }
  
    })
    return managersArr;
  }
  // Add Employee 
  function addEmployee() { 
      inquirer.prompt([
          {
            name: "firstname",
            type: "input",
            message: "Enter their first name "
          },
          {
            name: "lastname",
            type: "input",
            message: "Enter their last name "
          },
          {
            name: "role",
            type: "list",
            message: "What is their role? ",
            choices: selectRole()
          },
          {
              name: "action",
              type: "rawlist",
              message: "Whats their managers name?",
              choices: selectManager()
          }
      ]).then(function (answer) {
        var roleId = selectRole().indexOf(answer.role) + 1
        var managerId = selectManager().indexOf(answer.action) + 1
        connection.query("INSERT INTO employee SET ?", 
        {
            first_name: answer.firstName,
            last_name: answer.lastName,
            manager_id: managerId,
            role_id: roleId
            
        }, function(err){
            if (err) throw err
            console.table(answer)
            startPrompt()
        })
  
    })
  }
  // Update Employee 
    function updateEmployee() {
      connection.query("SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;", function(err, res) {
      // console.log(res)
       if (err) throw err
       console.log(res)
      inquirer.prompt([
            {
              name: "lastName",
              type: "rawlist",
              choices: function() {
                var lastName = [];
                for (var i = 0; i < res.length; i++) {
                  lastName.push(res[i].last_name);
                }
                return lastName;
              },
              message: "What is the Employee's last name? ",
            },
            {
              name: "role",
              type: "rawlist",
              message: "What is the Employees new title? ",
              choices: selectRole()
            },
        ]).then(function(answer) {
          var roleId = selectRole().indexOf(answer.role) + 1
          connection.query("UPDATE employee SET WHERE ?", 
          {
            last_name: answer.lastName
             
          }, 
          {
            role_id: roleId
             
          }, 
          function(err){
              if (err) throw err
              console.table(answer)
              startPrompt()
          })
    
      });
    });
  
    }
  // Add Employee Role
  function addRole() { 
    connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role",   function(err, res) {
      inquirer.prompt([
          {
            name: "Title",
            type: "input",
            message: "What is the role's Title?"
          },
          {
            name: "Salary",
            type: "input",
            message: "What is the Salary?"
  
          } 
      ]).then(function(res) {
          connection.query(
              "INSERT INTO role SET ?",
              {
                title: res.Title,
                salary: res.Salary,
              },
              function(err) {
                  if (err) throw err
                  console.table(res);
                  startPrompt();
              }
          )
      });
    });
    }
  // Add Department 
  function addDept() { 
      inquirer.prompt([
          {
            name: "name",
            type: "input",
            message: "What Department would you like to add?"
          }
      ]).then(function(res) {
          var query = connection.query(
              "INSERT INTO department SET? ",
              {
                name: res.name
              
              },
              function(err) {
                  if (err) throw err
                  console.table(res);
                  startPrompt();
              }
          )
      })
    }