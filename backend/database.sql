CREATE DATABASE inventory;
USE inventory;

CREATE TABLE suppliers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    cnpj VARCHAR(14),
    phone VARCHAR(20) NOT NULL,
    address TEXT
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    current_quantity INT NOT NULL,
    minimum_quantity INT NOT NULL,
    supplier_id VARCHAR NOT NULL,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);