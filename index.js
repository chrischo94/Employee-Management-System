const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: 'Squad#1017',
    database: 'employeeTracker',
});

const manage = () => {
    inquirer
        .prompt({
            name: 'manage',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                "Add Departments", "Add Roles", "Add Employees", "View Departments", "View Roles", "View Employees", "Update Employee Roles", "No More"
            ],
        })
        .then((answer) => {
            if (answer.manage === "Add Departments") {
                addDepartments()
            } else if (answer.manage === "Add Roles") {
                addRoles()
            } else if (answer.manage === "Add Employees") {
                addEmployees()
            } else if (answer.manage === "View Departments") {
                viewDepartments()
            } else if (answer.manage === "View Roles") {
                viewRoles()
            } else if (answer.manage === "View Employees") {
                viewEmployees()
            } else if (answer.manage === "Update Employee Roles") {
                updateEmployeeRoles()
            } else {
                connection.end()
            }
        });
};

const addDepartments = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the Department name?",
            name: "depName" 
        }
        
    ]) .then((answer) => {
        connection.query("INSERT INTO department SET ?",
        {name: answer.depName,
        }
    
    , (err) => {
        if (err) throw err;
        manage();
    }
    )
})
}
const addRoles = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your Title?",
            name: "title" 
        }, 
        {
            type: "input",
            message: "What is your Salary",
            name: "salary" 
        },
        {
            type: "number",
            message: "What is your department ID",
            name: "departmentId" 
        }
        
    ]) .then((answer) => {
        connection.query("INSERT INTO role SET ?",
        {title: answer.title,
        salary: answer.salary,
        department_id: answer.departmentId,
        
    }, (err) => {
        if (err) throw err;
        manage();
    }
    )
})
}
const addEmployees = () => {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your First Name",
            name: "firstName" 
        }, 
        {
            type: "input",
            message: "What is your last Name",
            name: "lastName" 
        },
        {
            type: "number",
            message: "What is your role ID",
            name: "roleId" 
        },
      
        {
            type: "number",
            message: "What is your manager ID",
            name: "managerId" 
        }
        
    ]) .then((answer) => {
        connection.query("INSERT INTO employee SET ?",
        {first_name: answer.firstName,
        last_name: answer.lastName,
        role_id: answer.roleId,
        manager_id: answer.managerId
    }, (err) => {
        if (err) throw err;
        manage();
    }
    )
})
}
const viewDepartments = () => {
    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err
        console.log(res)
        manage()
    })
}
const viewRoles = () => {
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err
        console.log(res)
        manage()
    })
}
const viewEmployees = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.log(res);
        manage(); 
      })
}
const updateEmployeeRoles = () => {
    inquirer
        .prompt([
            {
                type: "input",
                message: "What do you want the new Title to be?",
                name: "title"
                
            },
            {
                type: "input",
                message: "What is the new Salary?",
                name: "salary"
                
            },
            {
                type: "input",
                message: "What is the new Department ID?",
                name: "departmentId"
                
            }
        ])
        .then((answer) => {
            connection.query("UPDATE role SET ?",
            {
                title: answer.title,
                salary: answer.salary,
                department_id: answer.departmentId
            }, (err) => {
                if (err) throw err;
                manage();
            }
            )
        })
}

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    manage();
  });