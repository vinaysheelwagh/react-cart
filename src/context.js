import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
const url = 'https://course-api.netlify.app/api/react-useReducer-cart-project'
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const defaulState = {
    cart:[],
    loading: false,
    amount: 0,
    total: 0
  }
  const [state, dispatch] = useReducer(reducer, defaulState)
  
  const removeAll = () =>{
    dispatch({type:"REMOVE_ALL"})
  }
  const removeItem = (id)=>{
    dispatch({type:"REMOVE_ITEM",payload:id})
  }
  const increaseAmount = (id)=>{
    dispatch({type:"INCREASE",payload:id})
  }
  const decreaseAmount = (id)=>{
    dispatch({type:"DECREASE",payload:id})
  }
  const fetchData=async ()=>{
    dispatch({type:"LOADING"})
    const response = await fetch(url)
    const cart = await response.json()
    dispatch({type:"DISPLAY_CART", payload:cart})
  }
  useEffect(()=>{
   dispatch({type:"UPDATE_AMOUNT"})
  },[state.cart])

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <AppContext.Provider
      value={{
        ...state,
        removeAll,
        removeItem,
        increaseAmount,
        decreaseAmount
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
