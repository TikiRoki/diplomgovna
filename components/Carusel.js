"use client";
import { useState, useEffect } from "react";

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      console.log(currentIndex);
      setCurrentIndex((currentIndex + 1) % images.length);
    }, 3500);

    // return () => clearTimeout(timeOut);
  }, [currentIndex]);

  return (
    <div className="absolute w-full h-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute w-full h-full inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image}
            alt={`Slide ${index}`}
            className="absolutе top-0 w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
