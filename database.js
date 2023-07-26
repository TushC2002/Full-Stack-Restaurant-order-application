const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Tushar@123',
  database: 'restaurant_order_app',
});

connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database:', error);
  } else {
    console.log('Connected to database');
  }
});

function saveOrder(order, callback) {
  const { menu, price, tableNo } = order;
  const query = `INSERT INTO orders (menu, price, table_no) VALUES (?, ?, ?)`;

  connection.query(query, [menu, price, tableNo], (error, result) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, result);
    }
  });
}

function getMenuItems(callback) {
  const query = `SELECT menu, price FROM menu_items`;

  connection.query(query, (error, menuItems) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, menuItems);
    }
  });
}

function getOrders(callback) {
    const query = `SELECT menu, price, table_no FROM orders`;
  
    connection.query(query, (error, orders) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, orders);
      }
    });
  }
  
  module.exports = {
    saveOrder,
    getMenuItems,
    getOrders,
  };