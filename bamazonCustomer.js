var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: "root",
    // Your password
    password: "password",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

var customerItem = "";

function start() {
    var query = "SELECT item_id, product_name, department_name, price FROM products";
    connection.query(query, function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || " + res[i].department_name + "Department" + " || Price: " + res[i].price);
        }
        customerSearch();
    });
};

function customerSearch() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "What is the ID of the item you would like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "units",
                type: "input",
                message: "How many units of the product they would like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            //Run a function that checks the quantity of the given item id
            customerItem = answer.id;
            // console.log(customerItem);
            quantityCheck(customerItem, answer.units);
        });
}

function quantityCheck(item, units) {
    var query = "SELECT stock_quantity FROM products WHERE ?";
    connection.query(query, { item_id: item }, function (err, res) {
        if (err) throw err;

        var stock_quantity = res[0].stock_quantity;
        var newStock = stock_quantity - units;

        if (newStock <= 0) {
            console.log('Insufficient quantity!, Check back Later');
            connection.end();
        }

        else {
            console.log("Item is available!");

            // console.log(stock_quantity);
            // console.log(newStock);
            // itemCheck();

            var query = "UPDATE products SET ? WHERE ?";
            connection.query(query, [{ stock_quantity: newStock }, { item_id: item }], function (err, res) {
                if (err) throw err;
                console.log("Bid placed successfully!");
                price();
            });
        }
    })
}

function price() {
    var query = "SELECT * FROM products WHERE ?";
    connection.query(query, { item_id: customerItem }, function (err, res) {
        console.log("Price: " + res[0].price);
        connection.end();
    });
}

