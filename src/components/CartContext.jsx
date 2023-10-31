import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext();

let userToken = localStorage.getItem("usertoken");
let headers = {
  token: userToken,
};


function GetWishList() {
  return axios
  .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
    headers,
  })
    .then((res) => res)
    .catch((err) => err);
  }

function GetLoggedusercart() {
  return axios
  .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
    headers,
  })
    .then((res) => res)
    .catch((err) => err);
  }
  
  function clearAllCart() {
    return axios
    .delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
      headers,
    })
    .then((res) => res)
    .catch((err) => err);
  }
  
  function updateCartQuantity(id, count) {
    return axios
    .put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { count },
      { headers }
      )
      .then((res) => res)
      .catch((err) => err);
    }
    
    function removeCartItem(id) {
      return axios
      .delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { headers }
    )
    .then((res) => res)
    .catch((err) => err);
}

export default function CartContextProv(props) {
  const [cartDetails, setcartDetails] = useState(null)
  const [cartId, setcartId] = useState('')
  const [wishList, setwishList] = useState(null)
  

  async function getCartId(){
    let {data} = await GetLoggedusercart()
    setcartId(data?.data._id)
  }
  useEffect(() => {
    getCartId()
  }, [cartId])

  
  function addToCart(id) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: id,
        },
        {
          headers,
        }
      )
      .then((res) => {
        getCartId()
        return res
      })
      .catch((err) => err);
  }

  function addToWishList(id) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId: id,},
        {headers}
      )
      .then((res) => res)
      .catch((err) => err);
  }
  return (
    <cartContext.Provider
      value={{addToWishList ,GetWishList ,wishList , setwishList , addToCart,cartId , cartDetails, setcartDetails, GetLoggedusercart, updateCartQuantity , removeCartItem , clearAllCart}}
      >
      {props.children}
    </cartContext.Provider>
  );
}
