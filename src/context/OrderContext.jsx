import React, { createContext, useState, useEffect } from 'react';
import useGenerateORDATE from '../hooks/useGenerateORDATE';
import useAuth from '../hooks/useAuth';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {

  const { id, name } = useAuth(); //current user id
  const { formatDate, generateOR } = useGenerateORDATE();

  const [orderTransac, setOrderTransac] = useState({
    user: null,
    orderNo: generateOR(),
    dateTime: formatDate(),
    barista: null,
    orderType: 'Dine in',
    items: [],
    total: 0,
    cash: 0,
    change: 0
  });

  useEffect(() => {
    if (id && name) {
      setOrderTransac(prevState => ({
        ...prevState,
        user: id,
        barista: name
      }));
    }
  }, [id, name]);

  return (
    <OrderContext.Provider value={{ orderTransac, setOrderTransac }}>
      {children}
    </OrderContext.Provider>
  );
};
