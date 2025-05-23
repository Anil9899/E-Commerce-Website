import React, {createContext, useState} from 'react';
import { useEffect } from 'react';
//import all_product from "../components/assets/all_product";

export const ShopContext = createContext(null);

const getDefault = () => {
    let cart = {};
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0;    
    }
    return cart;
}

const ShopContextProvider = (props) => {

const [all_product,setAll_Product] = useState([]);
const [cartItems, setCartItems] = useState(getDefault());
 
useEffect(()=>{
      fetch('http://localhost:8080/allproducts')
      .then((response)=>response.json())
      .then((data)=>setAll_Product(data))

      if(localStorage.getItem('auth-token')){
        fetch('http://localhost:8080/getcart',{
            method:'POST',
            headers:{
                Accept:'application/form-data',
                'auth-token':`${localStorage.getItem('auth-token')}`,
                'Content-Type':'application/json',
            },
            body:"",
        }).then((response)=>response.json())
        .then((data)=>setCartItems(data));
      }
},[])

    const addToCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
        //console.log(cartItems);
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:8080/addtocart',{
                method:'POST',
                header:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:8080/removefromcart',{
                method:'POST',
                header:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({"itemId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    }
    
    const getTotalCartAmount = () => {
      let totalAmount = 0;
      for(const item in cartItems)
      {
        if(cartItems[item]>0)
        {
            let itemInfo = all_product.find((product)=>product.id === Number(item))
            totalAmount += cartItems[item] * itemInfo.new_price;
        }
      }
      return totalAmount;
    }

    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems)
        {
            if(cartItems[item]>0)
            {
                totalItem+= cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};
    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;