-- Creates the "bamazon" database --
CREATE DATABASE bamazon;
-- Makes it so all of the following code will affect bamazon --
USE bamazon;

-- Creates the table "products" within bamazon --
CREATE TABLE products
(
  item_id INT NOT NULL
  AUTO_INCREMENT,
  product_name VARCHAR
  (100) NOT NULL,
  department_name VARCHAR
  (100) NOT NULL,
  price INT NOT NULL,
  stock_quantity INT NOT NULL default 0,
  PRIMARY KEY
  (item_id)
);
