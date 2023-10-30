import React from "react";
import style from "./Categories.module.scss";
import { Helmet } from "react-helmet";
import axios, { Axios } from "axios";
import { useQuery } from "react-query";
import { ThreeDots } from "react-loader-spinner";

export default function Categories() {
  function getCats() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { data , isLoading} = useQuery("pcats", getCats);


  return (
    <div className="">
      <Helmet>
        <title>{window.location.pathname.split('/')[window.location.pathname.split('/').length-1]}</title>
      </Helmet>
      {isLoading ? 
        <div className=" text-center bg-dark vw-100 bg-opacity-10 position-absolute  start-0  vh-100 d-flex justify-content-center align-items-center ">
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

      <div className="d-flex justify-content-between flex-wrap ">
        
          {data?.data.data.map((cat , idx) => {
            return <div className="w-31 border  m-3 flex-grow-1 flex-xl-grow-0" key={idx}>
              <img height={400}  className=" w-100" src={cat.image} alt="" /> 
              <h3 className="text-center text-main my-4">{cat.name}</h3>
            </div>
          })}
       
      </div>
      
      }
    </div>
  );
}
