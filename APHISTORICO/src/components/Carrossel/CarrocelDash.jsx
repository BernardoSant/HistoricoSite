import { Carousel } from "@material-tailwind/react";
import { useState } from "react";
import React from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export const CarrocelDash = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const length = React.Children.count(children);

  const handleNavigation = (index) => {
    setActiveIndex(index);
  };

  return (
    <Carousel
      className="rounded-xl absolute h-full"
      nextArrow={({ loop, handleNext, lastIndex }) => (
        <button
          onClick={handleNext}
          disabled={!loop && lastIndex}
          className="absolute top-2/4 right-[2px] -translate-y-2/4 rounded-full select-none transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[48px] h-10 max-h-[48px] text-gray-500 hover:bg-white/30 active:bg-white/50 grid place-items-center"
        >
          <IoIosArrowForward strokeWidth={3} className=" h-6 w-6" />
        </button>
      )}
      prevArrow={({ loop, handlePrev, firstIndex }) => (
        <button
          onClick={handlePrev}
          disabled={!loop && firstIndex}
          className="absolute top-2/4 left-[2px] -translate-y-2/4 rounded-full select-none transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[48px] h-10 max-h-[48px] text-gray-500 hover:bg-white/30 active:bg-white/50 grid place-items-center"
        >
          <IoIosArrowBack strokeWidth={3} className=" h-6 w-6" />
        </button>
      )}
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-1.5 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all ${
                activeIndex === i ? "w-8 bg-orange-500" : "w-4 bg-gray-500/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {React.Children.map(children, (child, index) => (
        <div
          key={index}
          className={`carousel-item ${index === activeIndex ? "active" : ""} w-full h-full`}
        >
          {child}
        </div>
      ))}
    </Carousel>
  );
};
