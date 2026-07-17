import React from "react";
import HeroCarousel from "./HeroCarousel";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="overflow-hidden pt-50 md:pt-40 pb-10 lg:pb-12.5 xl:pb-15 bg-[#E5EAF4] ">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap xl:flex-nowrap gap-5">

          {/* Main Carousel */}
          <div className="xl:w-[757px] w-full">
            <div className="relative h-auto md:h-[420px] rounded-2xl bg-white overflow-hidden shadow-md">
              <Image
                src="/images/hero/hero-bg.png"
                alt="Hero Background"
                width={534}
                height={520}
                className="absolute right-0 bottom-0 -z-10"
              />
              <HeroCarousel />
            </div>
          </div>

          {/* Sidebar */}
          <div className="xl:w-[393px] w-full h-[420px]">
            <div className="flex flex-col h-full gap-5">

              {/* Card 1 */}
              <div className="flex-1 rounded-2xl bg-white  shadow-sm hover:shadow-lg transition-all duration-300 p-5 group">
                <div className="flex items-center justify-between h-full gap-4">

                  <div className="flex flex-col justify-between flex-1 h-full">
                    <div>
                      <span className="inline-block bg-red/10 text-red text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded mb-2">
                        Limited Deal
                      </span>

                      <h3 className="mt-3 text-lg font-semibold  text-dark leading-snug">
                        <a
                          href="/shop-with-sidebar"
                          className="hover:text-blue-600"
                        >
                          Preeti Combo Box – 5 in 1
                        </a>
                      </h3>
                    </div>

                    <div className="mt-5 flex items-center gap-2">
                      <span className="text-2xl font-bold  text-dark">
                        ₹300
                      </span>

                      <span className="text-sm text-gray-400 line-through">
                        ₹530
                      </span>

                      <span className="text-sm font-semibold text-green-600">
                        43% OFF
                      </span>
                    </div>
                  </div>

                  <div className="w-28 h-28 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden">
                    <Image
                      src="https://cdn.shopify.com/s/files/1/0651/2023/9673/files/6.jpg?v=1734007975"
                      alt="Combo Box"
                      width={110}
                      height={110}
                      className="object-contain group-hover:scale-105 transition"
                    />
                  </div>

                </div>
              </div>

              {/* Card 2 */}
              <div className="flex-1 rounded-2xl bg-white  shadow-sm hover:shadow-lg transition-all duration-300 p-5 group">
                <div className="flex items-center justify-between h-full gap-4">

                  <div className="flex flex-col justify-between flex-1 h-full">
                    <div>
                      <span className="inline-block bg-red/10 text-red text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded mb-2">
                        Limited Deal
                      </span>

                      <h3 className="mt-3 text-lg font-semibold  text-dark leading-snug">
                        <a
                          href="/shop-with-sidebar"
                          className="hover:text-blue-600"
                        >
                          Preeti Fairy Floor Cleaner
                        </a>
                      </h3>
                    </div>

                    <div className="mt-5 flex items-center gap-2">
                      <span className="text-2xl font-bold  text-dark">
                        ₹120
                      </span>

                      <span className="text-sm text-gray-400 line-through">
                        ₹155
                      </span>

                      <span className="text-sm font-semibold text-green-600">
                        22% OFF
                      </span>
                    </div>
                  </div>

                  <div className="w-28 h-28 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden">
                    <Image
                      src="https://cdn.shopify.com/s/files/1/0651/2023/9673/files/Preeti_Fairy.png?v=1766406668"
                      alt="Fairy Floor Cleaner"
                      width={110}
                      height={110}
                      className="object-contain group-hover:scale-105 transition"
                    />
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;