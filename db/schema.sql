DROP DATABASE IF EXISTS employeeTracker;
CREATE database employeeTracker;

USE employeeTracker;

CREATE TABLE department (
  id INT AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY (id)
);
CREATE TABLE employee (
    id INT AUTO_INCREMENT, 
    first_name VARCHAR(30), 
    last_name VARCHAR(30),
    role_id INT, 
    manager_id INT,
    PRIMARY KEY (id)
);

SELECT department.name, role.title, role.salary, role.department_id, employee.id, employee.first_name, employee.last_name AS 'Department'
FROM employee
	JOIN (role, department)
    ON (employee.role_id = role.id AND employee.manager_id = department.id);

INSERT INTO department (name)
VALUES 
("Engineering"),
("Accounting"),
("HR"),
("R&D");

INSERT INTO role (title, salary, department_id)
VALUES 
("Engineer", 100000, 3),
('Manager', 150000, 1),
('HR Rep', 65000, 4), 
('Intern', 12000, 5), 
('Mail Room', 35000, 6),
('Marketing Director', 95000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
("Chris", "Cho", 1, 2),
("Randon", "Russell", 2, 4),
("Mike", "Johnson", 3, 3),
("James", "Chen", 2, 4),
