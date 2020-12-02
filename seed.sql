INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Prototype'),
    ('Design Services');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Manager', 125000, 1),
    ('Lead Salesperson', 90000, 1),
    ('Technical Manager', 100000, 2),
    ('Senior Engineer', 85000, 2),
    ('Prototype Buyer', 80000, 3),
    ('Prototype Technician', 50000, 3),
    ('CAD Lead Expert', 110000, 4),
    ('CAD Designer', 60000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Jenny', 'Lawn', 1, NULL),
    ('Henry', 'McNear', 2, 1),
    ('Kevin', 'Bacon', 3, NULL),
    ('Roger', 'McTavish', 4, 3),
    ('Laura', 'Doe', 5, NULL),
    ('Larry', 'McNear', 6, 5),
    ('Tom', 'Shanks', 7, NULL),
    ('Linda', 'Mallard', 8, 7);