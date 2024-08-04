import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth';

const Order = () => {

  const { id, name } = useAuth(); //current user id

  const [orderItems, setOrdersItems] = useState([])

const formatDate =()=>  new Date().toLocaleDateString("en-US", {year:'numeric' , day: 'numeric' , month: 'short' }) + ", " + new Date().toLocaleTimeString()



const generateOR = ()=> `#${new Date().getFullYear()}-${new Date().getMonth()+ 1}${new Date().getDate()}${new Date().getHours()}-${new Date().getMinutes()}${new Date().getSeconds()}`

// OR number: YEAR-MONTH/DAY/HOUR/MINUTES/SECONDS

  const [orderTransac, setOrderTransac] = useState({
    user: id,
    orderNo: generateOR(),
    dateTime: formatDate(),
    barista: name,
    orderType: 'Dine in',
    items: [],
    total: 0,
    cash: 0,
    change: 0
  })

  // console.log(orderTransac, orderItems)


  return { orderTransac, setOrderTransac, orderItems, setOrdersItems, formatDate, generateOR }
}

export default Order