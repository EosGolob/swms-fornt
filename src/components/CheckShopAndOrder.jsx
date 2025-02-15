// import React, { useState } from 'react';
// import { checkShopDetails } from '../shop';
// import { createOrder } from '../order'; // Import the createOrder function

// const CheckShopAndOrder = () => {
//   const [gstId, setGstId] = useState('');
//   const [orderDetails, setOrderDetails] = useState({
//     productId: '',
//     quantity: '',
//     price: '',
//     paymentStatus: '',
//     orderStatus: '',
//     agentEmail: '',
//     agentContact: '',
//   });
//   const [shopDetails, setShopDetails] = useState({
//     shopName: '',
//     type: '',
//     shopGstId: '',
//     contactInfo: '',
//     shop_address: [{ street: '', city: '', state: '', zipCode: '', country: '' }],
//   });
//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [orderLoading, setOrderLoading] = useState(false);

//   // Handle Shop Existence Check
//   const handleSubmit = async () => {
//     if (!gstId) {
//       alert('Please enter a GST ID');
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await checkShopDetails(gstId); // Check if the shop exists with the gstId
//       setResponse(res); // Set the response to show shop details

//       if (res.exists) {
//         // If the shop exists, prepopulate the form with shop details
//         setShopDetails({
//           shopName: res.shopName || '',
//           type: res.type || '',
//           shopGstId: res.shopGstId || '',
//           contactInfo: res.contactInfo || '',
//           shop_address: res.shop_address || [{ street: '', city: '', state: '', zipCode: '', country: '' }],
//         });
//       } else {
//         // If the shop doesn't exist, allow manual entry
//         setShopDetails({
//           shopName: '',
//           type: '',
//           shopGstId: '',
//           contactInfo: '',
//           shop_address: [{ street: '', city: '', state: '', zipCode: '', country: '' }],
//         });
//       }
//     } catch (error) {
//       console.error('There was an error fetching data:', error);
//       setResponse({ exists: false });
//     }
//     setLoading(false);
//   };

//   // Create the order request
//   const handleCreateOrder = async () => {
//     setOrderLoading(true);
//     try {
//       const orderRequest = {
//         productId: orderDetails.productId,
//         quantity: orderDetails.quantity,
//         price: orderDetails.price,
//         paymentStatus: orderDetails.paymentStatus,
//         orderStatus: orderDetails.orderStatus,
//         gstId,
//         shopDetails,
//         agentEmail: orderDetails.agentEmail,
//         agentContact: orderDetails.agentContact,
//       };
//       console.log('order request', orderRequest);

//       const response = await createOrder(orderRequest); // Call the createOrder from order.js
//       alert('Order created successfully!');
//       console.log('Order response:', response);
//     } catch (error) {
//       console.error('Error creating order:', error);
//       alert('Error creating order.');
//     }
//     setOrderLoading(false);
//   };

//   return (
//     <div className="check-shop-container">
//       <h1>Product Order</h1>
//       <div>
//         <input
//           type="text"
//           placeholder="Enter GST ID"
//           value={gstId}
//           onChange={(e) => setGstId(e.target.value)}
//         />
//       </div>
//       <button onClick={handleSubmit} disabled={loading}>
//         {loading ? 'Checking...' : 'Check Shop ID'}
//       </button>

//       {/* Show the shop form regardless of whether GST ID exists */}
//       <div>
//         <h2>{response && response.exists ? 'Shop Found!' : 'Create or Update Shop Details'}</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Shop Name</th>
//               <th>Shop Type</th>
//               <th>Shop GST ID</th>
//               <th>Contact Info</th>            
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>
//                 <input
//                   type="text"
//                   value={shopDetails.shopName}
//                   onChange={(e) => setShopDetails({ ...shopDetails, shopName: e.target.value })}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={shopDetails.type}
//                   onChange={(e) => setShopDetails({ ...shopDetails, type: e.target.value })}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={shopDetails.shopGstId}
//                   onChange={(e) => setShopDetails({ ...shopDetails, shopGstId: e.target.value })}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={shopDetails.contactInfo}
//                   onChange={(e) => setShopDetails({ ...shopDetails, contactInfo: e.target.value })}
//                 />
//               </td>
//             </tr>
//           </tbody>
//         </table>

//         {/* Address Table */}
//         <table>
//           <thead>
//             <tr>
//               <th>Address</th>
//               <th>City</th>
//               <th>State</th>
//               <th>Zip Code</th>
//               <th>Country</th>
//             </tr>
//           </thead>
//           <tbody>
//             {shopDetails.shop_address.map((address, index) => (
//               <tr key={index}>
//                 <td>
//                   <input
//                     type="text"
//                     value={address.street}
//                     onChange={(e) => {
//                       const updatedAddress = [...shopDetails.shop_address];
//                       updatedAddress[index] = { ...updatedAddress[index], street: e.target.value };
//                       setShopDetails({ ...shopDetails, shop_address: updatedAddress });
//                     }}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={address.city}
//                     onChange={(e) => {
//                       const updatedAddress = [...shopDetails.shop_address];
//                       updatedAddress[index] = { ...updatedAddress[index], city: e.target.value };
//                       setShopDetails({ ...shopDetails, shop_address: updatedAddress });
//                     }}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={address.state}
//                     onChange={(e) => {
//                       const updatedAddress = [...shopDetails.shop_address];
//                       updatedAddress[index] = { ...updatedAddress[index], state: e.target.value };
//                       setShopDetails({ ...shopDetails, shop_address: updatedAddress });
//                     }}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={address.zipCode}
//                     onChange={(e) => {
//                       const updatedAddress = [...shopDetails.shop_address];
//                       updatedAddress[index] = { ...updatedAddress[index], zipCode: e.target.value };
//                       setShopDetails({ ...shopDetails, shop_address: updatedAddress });
//                     }}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={address.country}
//                     onChange={(e) => {
//                       const updatedAddress = [...shopDetails.shop_address];
//                       updatedAddress[index] = { ...updatedAddress[index], country: e.target.value };
//                       setShopDetails({ ...shopDetails, shop_address: updatedAddress });
//                     }}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Order Details Form */}
//         <h3>Order Details</h3>
//         <input
//           type="number"
//           placeholder="Product ID"
//           value={orderDetails.productId}
//           onChange={(e) => setOrderDetails({ ...orderDetails, productId: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Quantity"
//           value={orderDetails.quantity}
//           onChange={(e) => setOrderDetails({ ...orderDetails, quantity: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={orderDetails.price}
//           onChange={(e) => setOrderDetails({ ...orderDetails, price: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Payment Status"
//           value={orderDetails.paymentStatus}
//           onChange={(e) => setOrderDetails({ ...orderDetails, paymentStatus: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Order Status"
//           value={orderDetails.orderStatus}
//           onChange={(e) => setOrderDetails({ ...orderDetails, orderStatus: e.target.value })}
//         />
//         <input
//           type="email"
//           placeholder="Agent Email"
//           value={orderDetails.agentEmail}
//           onChange={(e) => setOrderDetails({ ...orderDetails, agentEmail: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Agent Phone No"
//           value={orderDetails.agentContact}
//           onChange={(e) => setOrderDetails({ ...orderDetails, agentContact: e.target.value })}
//         />
//         {/* Submit Order Button */}
//         <button onClick={handleCreateOrder} disabled={orderLoading}>
//           {orderLoading ? 'Creating Order...' : 'Submit Order'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CheckShopAndOrder;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { checkShopDetails } from '../shop';
// import { createOrder } from '../order';
// const CheckShopAndOrder = () => {
//   const [gstId, setGstId] = useState('');
//   const [orderDetails, setOrderDetails] = useState({
//     productId: '',
//     quantity: '',
//     price: '',
//     paymentStatus: '',
//     orderStatus: '',
//     agentEmail: '',
//     agentContact: '',
//   });
//   const [shopDetails, setShopDetails] = useState({
//     shopName: '',
//     type: '',
//     shopGstId: '',
//     contactInfo: '',
//     shop_address: [{ street: '', city: '', state: '', zipCode: '', country: '' }],
//   });
//   const [response, setResponse] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [orderLoading, setOrderLoading] = useState(false);

//   // Handle Shop Existence Check
//   const handleSubmit = async () => {
//     if (!gstId) {
//       alert("Please enter a GST ID");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await checkShopDetails(gstId); // Check if the shop exists with the gstId
//       setResponse(res); // Set the response to show shop details

//       if (res.exists) {
//         // If the shop exists, prepopulate the form with shop details
//         setShopDetails({
//           shopName: res.shopName || '',
//           type: res.type || '',
//           shopGstId: res.shopGstId || '',
//           contactInfo: res.contactInfo || '',
//           shop_address: res.shop_address || [{ street: '', city: '', state: '', zipCode: '', country: '' }],
//         });
//       } else {
//         // If the shop doesn't exist, allow manual entry
//         setShopDetails({
//           shopName: '',
//           type: '',
//           shopGstId: '',
//           contactInfo: '',
//           shop_address: [{ street: '', city: '', state: '', zipCode: '', country: '' }],
//         });
//       }
//     } catch (error) {
//       console.error("There was an error fetching data:", error);
//       setResponse({ exists: false });
//     }
//     setLoading(false);
//   };

//   // Create the order request
//   const createOrder = async () => {
//     setOrderLoading(true);
//     try {
//       const orderRequest = {
//         productId: orderDetails.productId,
//         quantity: orderDetails.quantity,
//         price: orderDetails.price,
//         paymentStatus: orderDetails.paymentStatus,
//         orderStatus: orderDetails.orderStatus,
//         gstId,
//         shopDetails, 
//         agentEmail: orderDetails.agentEmail,
//         agentContact: orderDetails.agentContact,
//       };
//       console.log("order request " ,orderRequest)

//       const response = await axios.post('http://localhost:8001/api/order', orderRequest); 
//       // const response = await createOrder(orderRequest);
//       alert("Order created successfully!");
//       console.log("Order response:", response.data);
//     } catch (error) {
//       console.error("Error creating order:", error);
//       alert("Error creating order.");
//     }
//     setOrderLoading(false);
//   };





//   return (
//     <div className="check-shop-container">
//       <h1>Check Shop and Create Order</h1>
//       <div>
//         <input
//           type="text"
//           placeholder="Enter GST ID"
//           value={gstId}
//           onChange={(e) => setGstId(e.target.value)}
//         />
//       </div>
//       <button onClick={handleSubmit} disabled={loading}>
//         {loading ? 'Checking...' : 'Check Shop ID'}
//       </button>

//       {/* Show the shop form regardless of whether GST ID exists */}
//       <div>
//         <h2>{response && response.exists ? "Shop Found!" : "Create or Update Shop Details"}</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Shop Name</th>
//               <th>Shop Type</th>
//               <th>Shop GST ID</th>
//               <th>Contact Info</th>            
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>
//                 <input
//                   type="text"
//                   value={shopDetails.shopName}
//                   onChange={(e) => setShopDetails({ ...shopDetails, shopName: e.target.value })}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={shopDetails.type}
//                   onChange={(e) => setShopDetails({ ...shopDetails, type: e.target.value })}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={shopDetails.shopGstId}
//                   onChange={(e) => setShopDetails({ ...shopDetails, shopGstId: e.target.value })}
//                 />
//               </td>
//               <td>
//                 <input
//                   type="text"
//                   value={shopDetails.contactInfo}
//                   onChange={(e) => setShopDetails({ ...shopDetails, contactInfo: e.target.value })}
//                 />
//               </td>
//             </tr>
//           </tbody>
//         </table>

//         {/* Address Table */}
//         <table>
//           <thead>
//             <tr>
//               <th>Address</th>
//               <th>City</th>
//               <th>State</th>
//               <th>Zip Code</th>
//               <th>Country</th>
//             </tr>
//           </thead>
//           <tbody>
//             {shopDetails.shop_address.map((address, index) => (
//               <tr key={index}>
//                 <td>
//                   <input
//                     type="text"
//                     value={address.street}
//                     onChange={(e) => {
//                       const updatedAddress = [...shopDetails.shop_address];
//                       updatedAddress[index] = { ...updatedAddress[index], street: e.target.value };
//                       setShopDetails({ ...shopDetails, shop_address: updatedAddress });
//                     }}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={address.city}
//                     onChange={(e) => {
//                       const updatedAddress = [...shopDetails.shop_address];
//                       updatedAddress[index] = { ...updatedAddress[index], city: e.target.value };
//                       setShopDetails({ ...shopDetails, shop_address: updatedAddress });
//                     }}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={address.state}
//                     onChange={(e) => {
//                       const updatedAddress = [...shopDetails.shop_address];
//                       updatedAddress[index] = { ...updatedAddress[index], state: e.target.value };
//                       setShopDetails({ ...shopDetails, shop_address: updatedAddress });
//                     }}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={address.zipCode}
//                     onChange={(e) => {
//                       const updatedAddress = [...shopDetails.shop_address];
//                       updatedAddress[index] = { ...updatedAddress[index], zipCode: e.target.value };
//                       setShopDetails({ ...shopDetails, shop_address: updatedAddress });
//                     }}
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     value={address.country}
//                     onChange={(e) => {
//                       const updatedAddress = [...shopDetails.shop_address];
//                       updatedAddress[index] = { ...updatedAddress[index], country: e.target.value };
//                       setShopDetails({ ...shopDetails, shop_address: updatedAddress });
//                     }}
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Order Details Form */}
//         <h3>Order Details</h3>
//         <input
//           type="number"
//           placeholder="Product ID"
//           value={orderDetails.productId}
//           onChange={(e) => setOrderDetails({ ...orderDetails, productId: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Quantity"
//           value={orderDetails.quantity}
//           onChange={(e) => setOrderDetails({ ...orderDetails, quantity: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={orderDetails.price}
//           onChange={(e) => setOrderDetails({ ...orderDetails, price: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Payment Status"
//           value={orderDetails.paymentStatus}
//           onChange={(e) => setOrderDetails({ ...orderDetails, paymentStatus: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Order Status"
//           value={orderDetails.orderStatus}
//           onChange={(e) => setOrderDetails({ ...orderDetails, orderStatus: e.target.value })}
//         />
//         <input
//           type="email"
//           placeholder="Agent Email"
//           value={orderDetails.agentEmail}
//           onChange={(e) => setOrderDetails({ ...orderDetails, agentEmail: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Agent Phone No"
//           value={orderDetails.agentContact}
//           onChange={(e) => setOrderDetails({ ...orderDetails, agentContact: e.target.value })}
//         />
//         {/* Submit Order Button */}
//         <button onClick={createOrder} disabled={orderLoading}>
//           {orderLoading ? 'Creating Order...' : 'Submit Order'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CheckShopAndOrder;












import React, { useState } from 'react';
import axios from 'axios';
import { checkShopDetails } from '../shop';
import './CheckShopAndOrder.css'


const CheckShopAndOrder = () => {
  const [gstId, setGstId] = useState('');
  const [orderDetails, setOrderDetails] = useState({
    productId: '',
    quantity: '',
    price: '',
    paymentStatus: '',
    orderStatus: '',
    agentEmail: '',
    agentContact: '',
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
        setShopDetails({
          shopName: res.shopName || '',
          type: res.type || '',
          shopGstId: res.shopGstId || '',
          contactInfo: res.contactInfo || '',
          shop_address: res.shop_address || [{ street: '', city: '', state: '', zipCode: '', country: '' }],
        });
      } else {
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

  // Create Order
  const handleCreateOrder = async () => {
    setOrderLoading(true);
    try {
      const orderRequest = {
        productId: orderDetails.productId,
        quantity: orderDetails.quantity,
        price: orderDetails.price,
        paymentStatus: orderDetails.paymentStatus,
        orderStatus: orderDetails.orderStatus,
        gstId,
        shopDetails,
        agentEmail: orderDetails.agentEmail,
        agentContact: orderDetails.agentContact,
      };
      console.log("Order request:", orderRequest);

      const response = await axios.post('http://localhost:8001/api/order', orderRequest);
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
      <h1>Product Order</h1>

      <div className="gst-id-container">
        <input
          type="text"
          placeholder="Enter GST ID"
          value={gstId}
          onChange={(e) => setGstId(e.target.value)}
        />
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? 'Checking...' : 'Check Shop ID'}
        </button>
        {response && (
          <p>{response.exists ? 'Shop Found!' : 'Not Found! Update Shop Details'}</p>
        )}
      </div>

      <div className="form-container">
        {/* Shop Details */}
        <div className="shop-details">
          <h2>Shop Details</h2>
          <div>

            <input
              type="text"
              placeholder="Shop Name"
              value={shopDetails.shopName}
              onChange={(e) => setShopDetails({ ...shopDetails, shopName: e.target.value })}
            />
            <input
              type="text"
              placeholder="Shop Type"
              value={shopDetails.type}
              onChange={(e) => setShopDetails({ ...shopDetails, type: e.target.value })}
            />
            <input
              type="text"
              placeholder="Shop GST ID"
              value={shopDetails.shopGstId}
              onChange={(e) => setShopDetails({ ...shopDetails, shopGstId: e.target.value })}
            />
            <input
              type="text"
              placeholder="Contact Info"
              value={shopDetails.contactInfo}
              onChange={(e) => setShopDetails({ ...shopDetails, contactInfo: e.target.value })}
            />
          </div>
        </div>

        <div className="address-details">
          <h3>Address Details</h3>
          {shopDetails.shop_address.map((address, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Street"
                value={address.street}
                onChange={(e) => {
                  const updatedAddress = [...shopDetails.shop_address];
                  updatedAddress[index] = { ...updatedAddress[index], street: e.target.value };
                  setShopDetails({ ...shopDetails, shop_address: updatedAddress });
                }}
              />
              <input
                type="text"
                placeholder="City"
                value={address.city}
                onChange={(e) => {
                  const updatedAddress = [...shopDetails.shop_address];
                  updatedAddress[index] = { ...updatedAddress[index], city: e.target.value };
                  setShopDetails({ ...shopDetails, shop_address: updatedAddress });
                }}
              />
              <input
                type="text"
                placeholder="State"
                value={address.state}
                onChange={(e) => {
                  const updatedAddress = [...shopDetails.shop_address];
                  updatedAddress[index] = { ...updatedAddress[index], state: e.target.value };
                  setShopDetails({ ...shopDetails, shop_address: updatedAddress });
                }}
              />
              <input
                type="text"
                placeholder="Zip Code"
                value={address.zipCode}
                onChange={(e) => {
                  const updatedAddress = [...shopDetails.shop_address];
                  updatedAddress[index] = { ...updatedAddress[index], zipCode: e.target.value };
                  setShopDetails({ ...shopDetails, shop_address: updatedAddress });
                }}
              />
              <input
                type="text"
                placeholder="Country"
                value={address.country}
                onChange={(e) => {
                  const updatedAddress = [...shopDetails.shop_address];
                  updatedAddress[index] = { ...updatedAddress[index], country: e.target.value };
                  setShopDetails({ ...shopDetails, shop_address: updatedAddress });
                }}
              />
            </div>
          ))}
        </div>
      </div>
      {/* Order Details Box */}
      <div className="order_details_agent">
        <div>
          <h2>Agent Details</h2>
        </div>
        <input
          type="email"
          placeholder="Agent Email"
          value={orderDetails.agentEmail}
          onChange={(e) => setOrderDetails({ ...orderDetails, agentEmail: e.target.value })}
        />
        <input
          type="text"
          placeholder="Agent Phone No"
          value={orderDetails.agentContact}
          onChange={(e) => setOrderDetails({ ...orderDetails, agentContact: e.target.value })}
        />
      </div>
      <div className="order-details-box">
        <h2>Order Details</h2>
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

        <button onClick={handleCreateOrder} disabled={orderLoading}>
          {orderLoading ? 'Creating Order...' : 'Submit Order'}
        </button>
      </div>

    </div>
  );
};

export default CheckShopAndOrder;
