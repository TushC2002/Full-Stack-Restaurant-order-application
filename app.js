const express = require('express');
const bodyParser = require('body-parser');
const database = require('./database');

const app = express();
const PORT = 4000;

app.use(bodyParser.json());

// Serve the frontend
app.use(express.static('public'));

// Save order to the database
app.post('/order', (req, res) => {
  const { menu, price, tableNo } = req.body;
  // Here you can perform validation or additional processing if needed

  // Save the order to the database
  database.saveOrder({ menu, price, tableNo }, (error, result) => {
    if (error) {
      console.error('Error saving order:', error);
      return res.status(500).json({ error: 'Error saving order' });
    }

    return res.json({ message: 'Order saved successfully' });
  });
});



// Get orders from the database
app.get('/orders', (req, res) => {
    database.getOrders((error, orders) => {
      if (error) {
        console.error('Error retrieving orders:', error);
        return res.status(500).json({ error: 'Error retrieving orders' });
      }
  
      return res.json(orders);
    });
  });
  
 
  
// Get menu items from the database
app.get('/menu', (req, res) => {
  database.getMenuItems((error, menuItems) => {
    if (error) {
      console.error('Error retrieving menu items:', error);
      return res.status(500).json({ error: 'Error retrieving menu items' });
    }

    return res.json(menuItems);
  });
});

app.listen(4000, () => {
  console.log(`Server running on port ${4000}`);
});
