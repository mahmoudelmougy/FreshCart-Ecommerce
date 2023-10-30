import React from "react";
import style from "./MainSlider.module.scss";
import Slider from "react-slick";
import img1 from "../../Assets/imgs/slider-image-1.jpeg";
import img2 from "../../Assets/imgs/slider-image-2.jpeg";
import img3 from "../../Assets/imgs/slider-image-3.jpeg";
import img4 from "../../Assets/imgs/grocery-banner.png";
import img5 from "../../Assets/imgs/grocery-banner-2.jpeg";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoPlay:true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className="row gx-0 my-5">

        <div className="col-md-9">
        <Slider  {...settings}>
          <img height={400} src={img1} alt="" />
          <img height={400} src={img2} alt="" />
          <img height={400} src={img3} alt="" />
        </Slider>
        </div>

        <div className="col-md-3">
          <img height={200} className="w-100" src={img4} alt="" />
          <img height={200} className="w-100" src={img5} alt="" />
        </div>
      </div>
    </>
  );
}
