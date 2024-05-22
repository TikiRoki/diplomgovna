"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function BackgroundCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
    cssEase: "linear",
  };

  return (
    <Slider {...settings}>
      <div className="w-[100px] h-[100px]">
        <img src="/1.jpg" alt="Slide 1" className="w-full h-full object-cover z-10" />
      </div>
      <div>
        <img src="/2.jpg" alt="Slide 2" className="w-full h-full object-cover z-10" />
      </div>
      <div>
        <img src="/3.jpg" alt="Slide 3" className="w-full h-full object-cover z-10" />
      </div>
    </Slider>
  );
}

export default BackgroundCarousel;
