import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { cartContext } from '../CartContext'
import { ThreeDots } from "react-loader-spinner";
import { Link } from 'react-router-dom';

export default function Cart() {
  
  let {cartDetails , setcartDetails , GetLoggedusercart ,updateCartQuantity , removeCartItem , clearAllCart} = useContext(cartContext)

  async function getCart(){
    
      setcartDetails(null);

      let response = await GetLoggedusercart()
      if (response.data){
        
        setcartDetails(response.data);
      }else{
        setcartDetails('empty');
        
      }
    
  }

  useEffect(() => {
      getCart()
      
    
  }, [])
  
  async function clearCart(){
     await clearAllCart()
     getCart()
   
  }

  async function updateCount(id , count){
    let {data} = await updateCartQuantity(id , count)
    setcartDetails(data)
  }

  async function removeItem(id){
    let {data} = await removeCartItem(id)
    setcartDetails(data)
  }

  return (<div className=''>
      <Helmet>
        <title>Cart</title>
      </Helmet>

      {cartDetails === null ?
        <div className=" text-center bg-dark vw-100 bg-opacity-10 position-absolute start-0  vh-100 d-flex justify-content-center align-items-center ">
          <div>
            <ThreeDots
              height="80"
              width="200"
              radius="9"
              color="#0aad0a"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
            />
          </div>
        </div>

      :cartDetails === 'empty'?
        <div className=" text-center  mt-5 py-5 ">
          <h1 className='mt-5 fw-bolder'>sorry your cart is empty .</h1>
          <Link className='link-offset-2  text-main fs-5' to={'/Products'}>go get some products . . . </Link>
        </div>
      :
        <>
          <div className='bg-main-light mt-5 p-4'>

            <div className=" d-flex justify-content-between mb-3 border-bottom   border-dark-subtle">
                  <div>
                      <h3>Shop Cart:</h3>
                      <h4 className='text-main h6 '>Cart Items: {cartDetails.numOfCartItems}</h4>
                      <h4 className='text-main h6 '>Total Price: {cartDetails.data.totalCartPrice}</h4>
                  </div>
                  <div>
                      <button onClick={clearCart} className="btn btn-outline-danger"> Delete All Cart</button>
                  </div>
            </div>

            {cartDetails.data.products.map((product ,idx)=>{
            return  <div key={idx} className="row my-3 py-2 border-bottom ">
                <div className="col-md-1 ">
                  <img  className='w-100' src={product.product.imageCover} alt="" />
                </div>
                
                <div className="col-md-11 d-flex justify-content-between px-1 flex-wrap">
                  <div>
                    <h3 className='h6'> {product.product.title.split(' ').slice(0,14).join(' ')}</h3>
                    <h6 className='text-main '>Price:{product.price} EGP</h6>
                    <button onClick={()=>removeItem(product.product.id)} className='p-0 btn font-sm'><i className='text-danger fas fa-trash-can mx-1'></i>remove</button>
                  </div>

                  <div>
                    <button onClick={()=>updateCount(product.product.id , product.count +1)} className="btn brdr-main">+</button>
                    <span className='mx-2'>{product.count}</span>
                    <button onClick={()=>updateCount(product.product.id , product.count -1)} className="btn brdr-main">-</button>
                  </div>

                </div>
              </div>

            })}
          </div>
          
          <Link to={'/BuyerData'} className='btn bg-main w-100 text-white fs-4'>check out</Link >
        </>
        
     
      }

   </div>
  )
}
