import React from "react";
import style from "./Home.module.scss";
import { Helmet } from "react-helmet";
import MainSlider from "../MainSlider/MainSlider";
import CatSlider from "../CatSlider/CatSlider";
import Products from "../Products/Products";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <MainSlider />
      <CatSlider />
      <Products />
    </>
  );
}
