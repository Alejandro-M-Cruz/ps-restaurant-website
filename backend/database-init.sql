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
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE menu_items (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    ingredients VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255) NOT NULL,
    section_id INT,
    FOREIGN KEY (section_id) REFERENCES menu_sections(id)
);

CREATE TABLE complaints (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    content VARCHAR(2000) NOT NULL,
    creation_datetime DATETIME NOT NULL
);

INSERT INTO users (phone_number, password, creation_date, admin) VALUES (
    "admin",
    "admin",
    CURDATE(),
    TRUE
);