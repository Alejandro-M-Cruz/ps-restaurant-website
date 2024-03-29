DROP DATABASE IF EXISTS la_nostra_casa;
CREATE DATABASE la_nostra_casa;

USE la_nostra_casa;

DROP TABLE IF EXISTS reservations;
DROP TABLE IF EXISTS complaints;
DROP TABLE IF EXISTS menu_items;
DROP TABLE IF EXISTS menu_sections;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    phone_number VARCHAR(15) UNIQUE NOT NULL ,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(16) NOT NULL,
    creation_date DATE NOT NULL,
    admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE reservations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    datetime DATETIME NOT NULL,
    customers INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE menu_sections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE menu_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    ingredients VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    image_src VARCHAR(255),
    section_id INT NOT NULL ,
    FOREIGN KEY (section_id) REFERENCES menu_sections(id)
);

CREATE TABLE complaints (
    id INT PRIMARY KEY AUTO_INCREMENT,
    content VARCHAR(2000) NOT NULL,
    creation_datetime DATETIME NOT NULL
);

INSERT INTO users (phone_number, password, creation_date, admin) VALUES (
    "admin",
    "admin",
    CURDATE(),
    TRUE
);

INSERT INTO menu_sections (name) VALUES ("Entrantes"), ("Pizzas"), ("Pasta"), ("Postres");

INSERT INTO
    menu_items (name, ingredients, price, image_src, section_id)
VALUES
    ("Margarita", "Salsa de tomate, mozzarella y orégano", 8.00, "/images/menu/pizza-menu.jpg", 1),
    ("Margarita", "Salsa de tomate, mozzarella y orégano", 8.00, "/images/menu/pizza-menu.jpg", 1),
    ("Margarita", "Salsa de tomate, mozzarella y orégano", 8.00, "/images/menu/pizza-menu.jpg", 1),
    ("Margarita", "Salsa de tomate, mozzarella y orégano", 8.00, "/images/menu/pizza-menu.jpg", 1),
    ("Margarita", "Salsa de tomate, mozzarella y orégano", 8.00, "/images/menu/pizza-menu.jpg", 1),
    ("Margarita", "Salsa de tomate, mozzarella y orégano", 8.00, "/images/menu/pizza-menu.jpg", 2),
    ("Margarita", "Salsa de tomate, mozzarella y orégano", 8.00, "/images/menu/pizza-menu.jpg", 2),
    ("Margarita", "Salsa de tomate, mozzarella y orégano", 8.00, "/images/menu/pizza-menu.jpg", 2),
    ("Margarita", "Salsa de tomate, mozzarella y orégano", 8.00, "/images/menu/pizza-menu.jpg", 2),
    ("Margarita", "Salsa de tomate, mozzarella y orégano", 8.00, "/images/menu/pizza-menu.jpg", 2),
    ("Margarita", "Salsa de tomate, mozzarella y orégano", 8.00, "/images/menu/pizza-menu.jpg", 2),
    ("Margarita", "Salsa de tomate, mozzarella y orégano", 8.00, "/images/menu/pizza-menu.jpg", 3),
    ("Margarita", "Salsa de tomate, mozzarella y orégano", 8.00, "/images/menu/pizza-menu.jpg", 3),
    ("Margarita", "Salsa de tomate, mozzarella y orégano", 8.00, "/images/menu/pizza-menu.jpg", 3),
    ("Margarita", "Salsa de tomate, mozzarella y orégano", 8.00, "/images/menu/pizza-menu.jpg", 3),
    ("Margarita", "Salsa de tomate, mozzarella y orégano", 8.00, "/images/menu/pizza-menu.jpg", 3),
    ("Margarita", "Salsa de tomate, mozzarella y orégano", 8.00, "/images/menu/pizza-menu.jpg", 4),
    ("Margarita", "Salsa de tomate, mozzarella y orégano", 8.00, "/images/menu/pizza-menu.jpg", 4),
    ("Margarita", "Salsa de tomate, mozzarella y orégano", 8.00, "/images/menu/pizza-menu.jpg", 4),
    ("Margarita", "Salsa de tomate, mozzarella y orégano", 8.00, "/images/menu/pizza-menu.jpg", 4);
