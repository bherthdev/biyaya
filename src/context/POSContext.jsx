import React, { createContext, useState, useEffect } from 'react';
import useGenerateORDATE from '../hooks/useGenerateORDATE';
import useAuth from '../hooks/useAuth';

export const POSContext = createContext();

export const POSProvider = ({ children }) => {

  const { id, name } = useAuth(); //current user id
  const { generateDate, generateOR } = useGenerateORDATE();
  const [headSearch, setHeadSearch] = useState("")


  const [toggleCart, setToggleCart] = useState(false)
  const [enableSaveOrder, setEnableSaveOrder] = useState(false)
  const [placeOrder, setPlaceOrder] = useState(false)


  const [orderTransac, setOrderTransac] = useState({
    user: null,
    orderNo: generateOR(),
    dateTime: generateDate(),
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
    <POSContext.Provider value={{
      orderTransac,
      setOrderTransac,
      headSearch, setHeadSearch,
      toggleCart, setToggleCart,
      enableSaveOrder, setEnableSaveOrder,
      placeOrder, setPlaceOrder
    }}>
      {children}
    </POSContext.Provider>
  );
};
