import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { cartContext } from "../CartContext";
import toast from "react-hot-toast";

export default function Products() {
  let { addToCart , addToWishList ,wishList ,setwishList ,GetWishList } = useContext(cartContext);
  const [wishListIds, setwishListIds] = useState([])
  
  async function GetWishListBridg(){
    let {data} = await GetWishList()
    // console.log(data);
    if(data?.status === "success"){
      setwishList(data?.data)
      wishList?.forEach(element => {
        setwishListIds(prevArray => [...prevArray, element.id]);
      });
    }
  }
  useEffect(() => {
    GetWishListBridg()
    
  }, [wishList , wishListIds])

  async function addToWL(id){
    let {data} =await addToWishList(id)
    // console.log(data);
    if (data?.status === "success") {
      toast.success(data.message);
      GetWishListBridg();

    } else {
      toast.error(data.message, {
        duration: 4000,
        position: "top-right",
      });
      GetWishListBridg();
    }
  }

  async function addProToCart(id) {
    let {data} = await addToCart(id);
    if (data?.status === "success") {
      toast.success(data?.message, {
        duration: 4000,
        position: "top-right",
      });
    } else {
      toast.error(data?.message, {
        duration: 4000,
        position: "top-right",
      });
    }
  }

  function getProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  let { data, isLoading } = useQuery("productsQuery", getProducts);

  return (
    <>
      <Helmet>
        <title>{window.location.pathname.split('/')[window.location.pathname.split('/').length-1]}</title>
      </Helmet>
      {isLoading ? (
                <div className=" text-center bg-dark vw-100 bg-opacity-10 position-absolute top-0 start-0  vh-100 d-flex justify-content-center align-items-center ">
                  <div >
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
      
      ) : (
        <div className="row ">
          {data?.data.data.map((product , idx) => {                  
            
            return (
              <>
                <div key={idx} className="col-md-6 col-lg-4 col-xl-2 product p-2 mb-3 rounded-3">
                  <Link
                    className=" text-dark text-decoration-none"
                    to={`/Details/${product.id}`}
                  >
                    <img className="w-100" src={product.imageCover} alt="" />
                    <span className="font-sm text-main">
                      {product.category.name}
                    </span>
                    <h3 className="h6 text-muted">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h3>

                    <div className="d-flex justify-content-between mt-3">
                      <span>{product.price}EGP</span>
                      <span>
                        <i className="fa-solid fa-star rating-color"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  <button onClick={() => addProToCart(product.id)}className="btn bg-main text-light w-75">
                    add to cart
                  </button>
                      <button style={{ color: wishListIds?.includes(product.id) ? 'red' : 'black' }}
                       onClick={()=>addToWL(product.id , product)} className={ `heart-btn w-25 m-0  `}>
                          <i  className="fa-solid fa-heart m-0  "></i>
                      </button>

                  <div>

                  </div>                  
                </div>
              </>
            );
          })}
        </div>
      )}
    </>
  );
}
