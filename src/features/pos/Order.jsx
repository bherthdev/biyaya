import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth';

const Order = () => {

  const { id, name } = useAuth(); //current user id

  const [orderItems, setOrdersItems] = useState([])

const formatDate =(date)=>{
    // Get individual components of the date
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let day = String(date.getDate()).padStart(2, '0');
    let year = date.getFullYear();

    // Get individual components of the time
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');

    // Combine date and time into the desired format
    return `${month}/${day}/${year}, ${hours}:${minutes}`;
}


  const [orderTransac, setOrderTransac] = useState({
    OrderNo: '#202401',
    DateTime: formatDate(new Date()),
    Barista: name,
    OrderType: 'Dine in',
    Items: [],
    Total: 0,
    Cash: '',
    Change: 0
  })

  // console.log(orderTransac, orderItems)


  return { orderTransac, setOrderTransac, orderItems, setOrdersItems }
}

export default Order