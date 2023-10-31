import React, { useContext, useEffect } from 'react'
import { cartContext } from '../CartContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { ThreeDots } from "react-loader-spinner";

export default function WishList() {
  let {GetWishList , setwishList , wishList ,addToCart} = useContext(cartContext)

  async function GetWishListBridg(){
    let {data} = await GetWishList()
    // console.log(data);
    if(data?.status === "success"){
      setwishList(data?.data)
    }
  }
  useEffect(() => {
    GetWishListBridg()
  },[])
  
  async function removeItem(id){
    let {data} = await axios.delete( `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
    {headers:{
      token : localStorage.getItem('usertoken')
    }}
    )
    // console.log(data);
    if(data?.status === "success"){
      toast.success(data.message,{position: "top-right"})
      GetWishListBridg()
    }else{
      toast.error(data.message,{position: "top-right"})
    }
  }

  async function addToCartAndRemove(id){
    let {data} = await addToCart(id);
    if (data?.status === "success") {
      toast.success(data.message, {
        duration: 4000,
        position: "top-right",
      });
    } else {
      toast.error(data.message, {
        duration: 4000,
        position: "top-right",
      });
    }
    removeItem(id)
  }


  return (
    <>
      {wishList === null?
        <div className=" text-center bg-dark vw-100 bg-opacity-10 position-absolute  start-0  vh-100 d-flex flex-column justify-content-center align-items-center ">
          <h2>it seems your wishList is empty </h2>
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
      :
        <div className='bg-main-light mt-5 p-4'>

          <div className=" d-flex justify-content-between mb-3 border-bottom   border-dark-subtle">
                <div>
                    <h3>Wish List:</h3>
                </div>
          </div>

          {wishList?.map((product ,idx)=>{
            return  <div key={idx} className="row my-3 py-2 border-bottom ">
              <div className="col-md-1 ">
                <img  className='w-100' src={product.imageCover} alt="" />
              </div>
              
              <div className="col-md-11 d-flex justify-content-between px-1 flex-wrap">
                <div>
                  <h3 className='h6'> {product?.title.split(' ').slice(0,10).join(' ')}</h3>
                  <h6 className='text-main '>Price:{product.price} EGP</h6>
                  <button onClick={function(){removeItem(product.id)}} className='p-0 btn font-sm'>
                    <i className='text-danger fas fa-trash-can mx-1'></i>remove</button>
                </div>
                <div>
                  <button onClick={function(){addToCartAndRemove(product.id)}} className='btn btn-outline-success '>add to cart</button>
                </div>

              </div>
            </div>

             })}
        </div>
                  
      }
    </>
  )
}
