DROP DATABASE IF EXISTS employees_DB;

CREATE DATABASE employees_DB;

USE employees_DB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (30) NULL,
    PRIMARY KEY (id)
    );

CREATE TABLE [role] (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR (30) NULL,
    salary DECIMAL NULL,
    department_id INT NULL,
    PRIMARY KEY (id)
    );

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR (30) NULL,
    last_name VARCHAR (30) NULL,
    role_id INT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
    );

--     SELECT e.id, e.first_name, e.last_name, r.title, d.name as department, r.salary -- manager
-- FROM employee e
-- JOIN role r ON r.id = e.role_id
-- JOIN department d ON d.id = r.department_id
-- JOIN employee er ON er.id = e.

-- select * from employee e;
-- select * from role e;