import React from "react";
import HeroCarousel from "./HeroCarousel";
import HeroFeature from "./HeroFeature";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="overflow-hidden pb-10 lg:pb-12.5 xl:pb-15 pt-40 md:pt-30 bg-[#E5EAF4]">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap gap-5">
          {/* Main Carousel Slider */}
          <div className="xl:max-w-[757px] w-full">
            <div className="relative z-1 rounded-[10px] bg-white overflow-hidden">
              <Image
                src="/images/hero/hero-bg.png"
                alt="hero bg shapes"
                className="absolute right-0 bottom-0 -z-1"
                width={534}
                height={520}
              />
              <HeroCarousel />
            </div>
          </div>

          {/* Sidebar Mini-deals */}
          <div className="xl:max-w-[393px] w-full">
            <div className="flex flex-col sm:flex-row xl:flex-col gap-5">
              
              {/* Card 1 */}
              <div className="w-full group relative rounded-xl border border-gray-3/45 bg-white p-5 sm:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-in-out">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col justify-between flex-1 h-full">
                    <div>
                      <span className="inline-block bg-red/10 text-red text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded mb-2">
                        Limited Deal
                      </span>
                      <h3 className="font-semibold text-dark text-base lg:text-custom-lg mb-1 leading-snug line-clamp-2">
                        <a href="/shop-with-sidebar" className="hover:text-blue transition-colors duration-200">
                          Preeti Combo Box – 5 in 1
                        </a>
                      </h3>
                    </div>

                    <div className="flex items-baseline gap-2 mt-3">
                      <span className="font-bold text-xl text-red">
                        ₹300
                      </span>
                      <span className="text-xs text-dark-4 line-through">
                        ₹530
                      </span>
                      <span className="text-xs font-semibold text-green">
                        (43% off)
                      </span>
                    </div>
                  </div>

                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-gray-2/60 border border-gray-3/30 rounded-xl p-2 flex items-center justify-center overflow-hidden group-hover:border-blue/15 transition-all">
                    <Image
                      src="https://cdn.shopify.com/s/files/1/0651/2023/9673/files/6.jpg?v=1734007975"
                      alt="Preeti combo box"
                      width={100}
                      height={100}
                      className="object-contain max-h-[85px] max-w-[85px] group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="w-full group relative rounded-xl border border-gray-3/45 bg-white p-5 sm:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 ease-in-out">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col justify-between flex-1 h-full">
                    <div>
                      <span className="inline-block bg-red/10 text-red text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded mb-2">
                        Limited Deal
                      </span>
                      <h3 className="font-semibold text-dark text-base lg:text-custom-lg mb-1 leading-snug line-clamp-2">
                        <a href="/shop-with-sidebar" className="hover:text-blue transition-colors duration-200">
                          Preeti Fairy Floor Cleaner
                        </a>
                      </h3>
                    </div>

                    <div className="flex items-baseline gap-2 mt-3">
                      <span className="font-bold text-xl text-red">
                        ₹120
                      </span>
                      <span className="text-xs text-dark-4 line-through">
                        ₹155
                      </span>
                      <span className="text-xs font-semibold text-green">
                        (22% off)
                      </span>
                    </div>
                  </div>

                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-gray-2/60 border border-gray-3/30 rounded-xl p-2 flex items-center justify-center overflow-hidden group-hover:border-blue/15 transition-all">
                    <Image
                      src="https://cdn.shopify.com/s/files/1/0651/2023/9673/files/Preeti_Fairy.png?v=1766406668"
                      alt="Preeti Fairy floor cleaner"
                      width={100}
                      height={100}
                      className="object-contain max-h-[85px] max-w-[85px] group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero features list */}
      <HeroFeature />
    </section>
  );
};

export default Hero;
