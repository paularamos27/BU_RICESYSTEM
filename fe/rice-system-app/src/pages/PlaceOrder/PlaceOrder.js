import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';


    const PlaceOrder = () => {


      const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext)
     
      const [data,setData] = useState({
        name:"",
        address:"",
        city:"",
        zipcode:"",
        country:"",
        email:"",
        phone:""
      })

      const onChangeHandler = (event) => {
        const name = event.target.naem;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
      }

     const placeOrder = async (event) =>{
        event.preventDefault();
        let orderItems = [];
        food_list.map((item)=>{
          if (cartItems[item._id]>0){
            let itemInfo = item; 
            itemInfo["quantity"] = cartItems[item._id];
            orderItems.push(itemInfo)
          }
        })
        let orderData = {
          address:data,
          items:orderItems,
          amount:getTotalCartAmount()+2,
     }
     let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
     if (response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url);
     }
     else{
      alert("Error");
     }
    }

      return(
      <form onSubmit={placeOrder} className='place-order'>
       <div className="place-order-left">
        <p className="title">Delivery Information</p>
       <div className="multi-fields">
         <input required name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Name' />
         <input required name='address' onChange={onChangeHandler} VALUE={data.address} type="text" placeholder='Address' />
      </div>
      <input required name='city' onChange={onChangeHandler} value={data.city} type="email" placeholder='City' />
      <div className="multi-fields">
         <input required name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip code' />
      </div> I
      <div className="multi-fields">
         <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
         <input required name='email' onChange={onChangeHandler} value={data.email} type="text" placeholder='Email' />
     </div>
     <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
     </div>
     <div className="place-order-right">
     <div className="cart-botton">
        <div className="cart-total"></div>
       </div>
         <h2>Cart Totals</h2>
       <div>
         <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>  I
      </div>
      <hr />
       <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>{2}</p>
      </div>
      <hr />
       <div className="cart-total-details">
           <b>Total</b>
           <b>{0}</b>
        </div>
    </div>
       <button type='submit'> PROCEED TO PAYMENT</button>
      </div>
    </form>
  )
}


export default PlaceOrder

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './PlaceOrder.css';

// const PlaceOrder = () => {
//   const [billingInfo, setBillingInfo] = useState({
//     name: '',
//     address: '',
//     city: '',
//     state: '',
//     zip: '',
//     country: '',
//     email: '',
//     phone: ''
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBillingInfo({ ...billingInfo, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const currentDate = new Date();
//     const estimatedDeliveryDate = new Date();
//     estimatedDeliveryDate.setDate(currentDate.getDate() + 2);

//     console.log('Order placed:', billingInfo);
//     navigate('/payment-method', {
//       state: {
//         billingInfo,
//         orderDate: currentDate.toISOString(),
//         estimatedDeliveryDate: estimatedDeliveryDate.toISOString()
//       }
//     });
//   };

//   return (
//     <div className="place-order">
//   <h2>Delivery Information</h2>
//   <form onSubmit={handleSubmit} className="billing-form">
//   <label>
//           Name:
//           <input type="text" name="name" value={billingInfo.name} onChange={handleChange} required />
//         </label>
//         <label>
//           Address:
//           <input type="text" name="address" value={billingInfo.address} onChange={handleChange} required />
//         </label>
//         <label>
//           City:
//           <input type="text" name="city" value={billingInfo.city} onChange={handleChange} required />
//         </label>
//         <label>
//           Zip:
//           <input type="text" name="zip" value={billingInfo.zip} onChange={handleChange} required />
//         </label>
//         <label>
//           Country:
//           <input type="text" name="country" value={billingInfo.country} onChange={handleChange} required />
//         </label>
//         <label>
//           Email:
//           <input type="email" name="email" value={billingInfo.email} onChange={handleChange} required />
//         </label>
//         <label>
//           Phone:
//           <input type="text" name="phone" value={billingInfo.phone} onChange={handleChange} required />
//         </label>
       
//     <div className="button-container">
//       <button type="button" onClick={() => navigate('/cart')}>Back</button>
//       <button type="submit">Place Order</button>
//     </div>
//   </form>
// </div>

    
//   );
// };

// export default PlaceOrder;
