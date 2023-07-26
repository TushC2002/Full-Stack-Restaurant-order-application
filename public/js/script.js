function submitOrder() {
    const menu = document.getElementById("menu").value;
    const price = document.getElementById("price").value;
    const tableNo = document.getElementById("tableNo").value;

    if (price.trim() === '' || isNaN(parseFloat(price))) {
        alert("Please enter a valid price.");
        return;
      }
  
    const order = {
      menu,
      price,
      tableNo,
    };
  
    // Send the order to the backend
    fetch("/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
    .then(response => response.json())
    .then(data => {
      // Handle response from the server, if needed
      console.log(data);
      fetchOrders();
    })
    .catch(error => {
      console.error("Error:", error);
    });
  }
  
  function fetchOrders() {
    // Fetch orders from the backend
    fetch("/orders")
    .then(response => response.json())
    .then(data => {
      // Display orders on the webpage
      const orderList = document.getElementById("orderList");
      orderList.innerHTML = "";
  
      if (data && data.length > 0) {
        const ordersHTML = data.map(order => {
          return `
            <div class="order-item">
              <p>Menu: ${order.menu}</p>
              <p>Price: $${order.price}</p>
              <p>Table No: ${order.tableNo}</p>
            </div>
          `;
        }).join("");
  
        orderList.innerHTML = ordersHTML;
      } else {
        orderList.innerHTML = "<p>No orders yet.</p>";
      }
    })
    .catch(error => {
      console.error("Error fetching orders:", error);
    });
  }
  
  // Fetch initial orders on page load
  fetchOrders();
  