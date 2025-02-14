import React, { useState } from 'react';
import axios from 'axios';
import { checkShopDetails } from '../shop'; // Assuming this is the file where checkShopDetails is defined

const CheckShopAndOrder = () => {
  const [gstId, setGstId] = useState('');
  const [orderDetails, setOrderDetails] = useState({
    productId: '',
    quantity: '',
    price: '',
    paymentStatus: '',
    orderStatus: '',
  });
  const [shopDetails, setShopDetails] = useState({
    shopName: '',
    type: '',
    shopGstId: '',
    contactInfo: '',
    shop_address: [{ street: '', city: '', state: '', zipCode: '', country: '' }],
  });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);

  // Handle Shop Existence Check
  const handleSubmit = async () => {
    if (!gstId) {
      alert("Please enter a GST ID");
      return;
    }

    setLoading(true);
    try {
      const res = await checkShopDetails(gstId); // Check if the shop exists with the gstId
      setResponse(res); // Set the response to show shop details

      if (res.exists) {
        // If the shop exists, prepopulate the form with shop details
        setShopDetails({
          shopName: res.shopName || '',
          type: res.type || '',
          shopGstId: res.shopGstId || '',
          contactInfo: res.contactInfo || '',
          shop_address: res.shop_address || [{ street: '', city: '', state: '', zipCode: '', country: '' }],
        });
      } else {
        // If the shop doesn't exist, allow manual entry
        setShopDetails({
          shopName: '',
          type: '',
          shopGstId: '',
          contactInfo: '',
          shop_address: [{ street: '', city: '', state: '', zipCode: '', country: '' }],
        });
      }
    } catch (error) {
      console.error("There was an error fetching data:", error);
      setResponse({ exists: false });
    }
    setLoading(false);
  };

  // Create the order request
  const createOrder = async () => {
    setOrderLoading(true);
    try {
      const orderRequest = {
        productId: orderDetails.productId,
        quantity: orderDetails.quantity,
        price: orderDetails.price,
        paymentStatus: orderDetails.paymentStatus,
        orderStatus: orderDetails.orderStatus,
        gstId, // Send gstId (whether shop exists or not)
        shopDetails, // Send the updated shop details
      };

      // Make the order creation request
      const response = await axios.post('http://localhost:8001/api/order', orderRequest); // Adjust URL as necessary
      alert("Order created successfully!");
      console.log("Order response:", response.data);
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Error creating order.");
    }
    setOrderLoading(false);
  };

  return (
    <div className="check-shop-container">
      <h1>Check Shop and Create Order</h1>
      <div>
        <input
          type="text"
          placeholder="Enter GST ID"
          value={gstId}
          onChange={(e) => setGstId(e.target.value)}
        />
      </div>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Checking...' : 'Check Shop ID'}
      </button>

      {/* Show the shop form regardless of whether GST ID exists */}
      <div>
        <h2>{response && response.exists ? "Shop Found!" : "Create or Update Shop Details"}</h2>
        <table>
          <thead>
            <tr>
              <th>Shop Name</th>
              <th>Shop Type</th>
              <th>Shop GST ID</th>
              <th>Contact Info</th>            
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  value={shopDetails.shopName}
                  onChange={(e) => setShopDetails({ ...shopDetails, shopName: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={shopDetails.type}
                  onChange={(e) => setShopDetails({ ...shopDetails, type: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={shopDetails.shopGstId}
                  onChange={(e) => setShopDetails({ ...shopDetails, shopGstId: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={shopDetails.contactInfo}
                  onChange={(e) => setShopDetails({ ...shopDetails, contactInfo: e.target.value })}
                />
              </td>
            </tr>
          </tbody>
        </table>
        
        {/* Address Table */}
        <table>
          <thead>
            <tr>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  value={shopDetails.shop_address[0].street}
                  onChange={(e) => setShopDetails({
                    ...shopDetails,
                    shop_address: [{ ...shopDetails.shop_address[0], street: e.target.value }]
                  })}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={shopDetails.shop_address[0].city}
                  onChange={(e) => setShopDetails({
                    ...shopDetails,
                    shop_address: [{ ...shopDetails.shop_address[0], city: e.target.value }]
                  })}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={shopDetails.shop_address[0].state}
                  onChange={(e) => setShopDetails({
                    ...shopDetails,
                    shop_address: [{ ...shopDetails.shop_address[0], state: e.target.value }]
                  })}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={shopDetails.shop_address[0].zipCode}
                  onChange={(e) => setShopDetails({
                    ...shopDetails,
                    shop_address: [{ ...shopDetails.shop_address[0], zipCode: e.target.value }]
                  })}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={shopDetails.shop_address[0].country}
                  onChange={(e) => setShopDetails({
                    ...shopDetails,
                    shop_address: [{ ...shopDetails.shop_address[0], country: e.target.value }]
                  })}
                />
              </td>
            </tr>
          </tbody>
        </table>

        {/* Order Details Form */}
        <h3>Order Details</h3>
        <input
          type="number"
          placeholder="Product ID"
          value={orderDetails.productId}
          onChange={(e) => setOrderDetails({ ...orderDetails, productId: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={orderDetails.quantity}
          onChange={(e) => setOrderDetails({ ...orderDetails, quantity: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={orderDetails.price}
          onChange={(e) => setOrderDetails({ ...orderDetails, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Payment Status"
          value={orderDetails.paymentStatus}
          onChange={(e) => setOrderDetails({ ...orderDetails, paymentStatus: e.target.value })}
        />
        <input
          type="text"
          placeholder="Order Status"
          value={orderDetails.orderStatus}
          onChange={(e) => setOrderDetails({ ...orderDetails, orderStatus: e.target.value })}
        />

        {/* Submit Order Button */}
        <button onClick={createOrder} disabled={orderLoading}>
          {orderLoading ? 'Creating Order...' : 'Submit Order'}
        </button>
      </div>
    </div>
  );
};

export default CheckShopAndOrder;
