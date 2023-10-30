import React from "react";
import style from "./Brands.module.scss";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useQuery } from "react-query";
import { ThreeDots } from "react-loader-spinner";

export default function Brands() {

  function getbrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  let { data , isLoading} = useQuery("brands", getbrands);
  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>
      {
        isLoading?
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

        :
          <>
            <h1 className="text-main text-center m-3">All Brands</h1>
            <div className="row ">
              {data?.data.data.map((brand , idx) => {
                return <div className="col-md-4 col-sm-6 col-lg-3 border  my-3" key={idx}>
                  <img   className=" w-100" src={brand.image} alt="" /> 
                  <h3 className="text-center text-main my-4">{brand.name}</h3>
                </div>
              })}
            </div>
          </>
      }

    </>
  );
}
