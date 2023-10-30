import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { cartContext } from '../CartContext'
import toast from 'react-hot-toast'

export default function Details() {

  let {addToCart , addToWishList ,wishList ,setwishList ,GetWishList} = useContext(cartContext)
  
  async function GetWishListBridg(){
    let {data} = await GetWishList()
    console.log(data);
    if(data.status === "success"){
      setwishList(data?.data)
    }
  }
  useEffect(() => {
    GetWishListBridg()
  }, [])

  async function addToWL(id){
    let {data} =await addToWishList(id)
    // console.log(data);
    if (data.status === "success") {
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
  }

  async function addProToCart(id){
    let response = await addToCart(id);
    if (response.data.status === "success"){
      toast.success(response.data.message,{
        duration: 4000,
        position: 'top-center',
      })
    }else{
      toast.error(response.data.message,{
        duration: 4000,
        position: 'top-center',
      })
    }
  }


  let param = useParams();

  function getDetails() {
    return axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${param.id}`
    );
  }

  let { data } = useQuery("productDetails", getDetails);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <Helmet>
        <title>Product Details</title>
      </Helmet>

      <div className="row align-items-center my-5">
        <div className="col-md-3">
          <Slider {...settings}>
            {data?.data.data.images.map((img) => {
              return <img src={img} alt="" />;
            })}
          </Slider>
        </div>
        <div className="col-md-9">
          <h2 className="fw-bold">{data?.data.data.title}</h2>
          <p className="text-muted">{data?.data.data.description}</p>
          <p className="text-main">{data?.data.data.category.name}</p>

          <div className="d-flex justify-content-between mt-3">
            <span>{data?.data.data.price}EGP</span>
            <span>
              <i className="fa-solid fa-star rating-color"></i>
              {data?.data.data.ratingsAverage}
            </span>
          </div>

          <button onClick={() => addProToCart(param.id)} className="btn bg-main text-light w-75">add to cart</button>
          <button onClick={()=>addToWL(param.id)} id={param.id} className={ `heart-btn  w-25 m-0 fs-2 `}>
            <i  class="fa-solid fa-heart m-0  "></i>
          </button>

          {
            wishList?.map((pro)=>{
              if(pro.id === param.id){
                document.getElementById(param.id).style.color='red'
                GetWishListBridg()
              }
            })
          }

        </div>
      </div>
    </>
  );
}
