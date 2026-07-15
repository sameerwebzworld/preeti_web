"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";

import Image from "next/image";

const HeroCarousal = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="hero-carousel"
    >
      <SwiperSlide>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center py-8 px-6 sm:px-10 lg:px-14 min-h-[340px] sm:min-h-[420px] md:min-h-[420px] relative overflow-hidden">
          {/* Left Text Column */}
          <div className="md:col-span-7 flex flex-col justify-center z-1">
            <div className="inline-flex items-center gap-2 bg-blue/10 text-blue px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider w-fit mb-5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue"></span>
              </span>
              🏷️ 43% OFF SUPER SALE
            </div>

            <h1 className="font-semibold text-dark text-2xl sm:text-4xl mb-3 leading-tight tracking-tight">
              <a href="/shop-with-sidebar" className="hover:text-blue transition-colors duration-200">
                Preeti Combo Box – 5 Cleaning Essentials in 1
              </a>
            </h1>

            <p className="text-dark-3 text-sm sm:text-base mb-6 leading-relaxed max-w-[450px]">
              Dishwash, detergent, fabric conditioner, toilet cleaner and floor
              cleaner in one value pack. A safety bubble for all your cleanliness
              troubles.
            </p>

            <a
              href="/shop-with-sidebar"
              className="group inline-flex items-center gap-2 font-medium text-white text-custom-sm rounded-lg bg-dark py-3 px-8 transition-all duration-300 hover:bg-blue hover:shadow-lg hover:shadow-blue/20 w-fit"
            >
              Shop Now
              <svg
                className="w-4.5 h-4.5 transform group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Right Image Column */}
          <div className="md:col-span-5 flex justify-center items-center relative h-64 sm:h-80 md:h-auto">
            {/* Background glowing blob */}
            <div className="absolute w-48 h-48 sm:w-60 sm:h-60 bg-blue/5 rounded-full filter blur-3xl -z-1"></div>
            
            <div className="relative transform hover:scale-105 transition-transform duration-500 ease-out flex items-center justify-center">
              <Image
                src="https://cdn.shopify.com/s/files/1/0651/2023/9673/files/6.jpg?v=1734007975"
                alt="Preeti combo box"
                width={300}
                height={300}
                className="object-contain max-h-[240px] sm:max-h-[300px] w-auto h-auto drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </SwiperSlide>
      
      <SwiperSlide>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center py-8 px-6 sm:px-10 lg:px-14 min-h-[340px] sm:min-h-[420px] md:min-h-[420px] relative overflow-hidden">
          {/* Left Text Column */}
          <div className="md:col-span-7 flex flex-col justify-center z-1">
            <div className="inline-flex items-center gap-2 bg-blue/10 text-blue px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider w-fit mb-5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue"></span>
              </span>
              🏷️ 27% OFF SPECIAL SALE
            </div>

            <h1 className="font-semibold text-dark text-2xl sm:text-4xl mb-3 leading-tight tracking-tight">
              <a href="/shop-with-sidebar" className="hover:text-blue transition-colors duration-200">
                Preeti Micromatic – Front-Load Washing Powder
              </a>
            </h1>

            <p className="text-dark-3 text-sm sm:text-base mb-6 leading-relaxed max-w-[450px]">
              Controlled-foam, quick-dissolving granules that lift trapped dirt
              while using less water — perfect for your washing machine.
            </p>

            <a
              href="/shop-with-sidebar"
              className="group inline-flex items-center gap-2 font-medium text-white text-custom-sm rounded-lg bg-dark py-3 px-8 transition-all duration-300 hover:bg-blue hover:shadow-lg hover:shadow-blue/20 w-fit"
            >
              Shop Now
              <svg
                className="w-4.5 h-4.5 transform group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Right Image Column */}
          <div className="md:col-span-5 flex justify-center items-center relative h-64 sm:h-80 md:h-auto">
            {/* Background glowing blob */}
            <div className="absolute w-48 h-48 sm:w-60 sm:h-60 bg-blue/5 rounded-full filter blur-3xl -z-1"></div>
            
            <div className="relative transform hover:scale-105 transition-transform duration-500 ease-out flex items-center justify-center">
              <Image
                src="https://cdn.shopify.com/s/files/1/0651/2023/9673/files/Micromatic5kgcreative.jpg?v=1733377553"
                alt="Preeti Micromatic washing powder"
                width={300}
                height={300}
                className="object-contain max-h-[240px] sm:max-h-[300px] w-auto h-auto drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroCarousal;
