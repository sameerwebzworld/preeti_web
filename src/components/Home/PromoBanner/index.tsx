import React from "react";
import Image from "next/image";

const PromoBanner = () => {
  return (
    <section className="overflow-hidden py-10">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* <!-- promo banner big --> */}
        <div className="relative z-1 overflow-hidden rounded-lg bg-[#F5F5F7] py-9 lg:py-11 xl:py-14 px-4 sm:px-7.5 lg:px-14 xl:px-19 mb-7.5">
          <div className="max-w-[550px] w-full">
            <span className="block font-medium text-xl text-dark mb-3">
              Preeti Combo Box – 5 in 1
            </span>

            <h2 className="font-bold text-xl lg:text-heading-4 xl:text-heading-3 text-dark mb-5">
              UP TO 43% OFF
            </h2>

            <p>
              Five household cleaning essentials in a single value pack —
              dishwash, detergent, fabric conditioner, toilet cleaner and floor
              cleaner. Free delivery in select areas.
            </p>

            <a
              href="/shop-with-sidebar"
              className="inline-flex font-medium text-custom-sm text-white bg-blue py-[11px] px-9.5 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
            >
              Buy Now
            </a>
          </div>

          <Image
            src="https://cdn.shopify.com/s/files/1/0651/2023/9673/files/6.jpg?v=1734007975"
            alt="Preeti combo box"
            className="absolute bottom-0 right-4 lg:right-26 -z-1 object-contain"
            width={274}
            height={350}
          />
        </div>

        <div className="grid gap-7.5 grid-cols-1 lg:grid-cols-2">
          {/* <!-- promo banner small --> */}
          <div className="relative z-1 overflow-hidden rounded-lg bg-[#DBF4F3] py-8 xl:py-11 px-4 sm:px-7.5 xl:px-10">
            <Image
              src="https://cdn.shopify.com/s/files/1/0651/2023/9673/files/Rose_hanwash_5_ltr.jpg?v=1733221461"
              alt="Rose handwash"
              className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-10 -z-1 object-contain"
              width={241}
              height={241}
            />

            <div className="text-right">
              <span className="block text-lg text-dark mb-1.5">
                Rose & Lemon Handwash
              </span>

              <h2 className="font-bold text-xl lg:text-heading-4 text-dark mb-2.5">
                pH-Neutral Care
              </h2>

              <p className="font-semibold text-custom-1 text-teal">
                Flat 20% off
              </p>

              <a
                href="/shop-with-sidebar"
                className="inline-flex font-medium text-custom-sm text-white bg-teal py-2.5 px-8.5 rounded-md ease-out duration-200 hover:bg-teal-dark mt-9"
              >
                Grab Now
              </a>
            </div>
          </div>

          {/* <!-- promo banner small --> */}
          <div className="relative z-1 overflow-hidden rounded-lg bg-[#FFECE1] py-8 xl:py-11 px-4 sm:px-7.5 xl:px-10">
            <Image
              src="https://cdn.shopify.com/s/files/1/0651/2023/9673/files/Naturalbathsoap.jpg?v=1733222500"
              alt="Preeti beauty soap"
              className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-8.5 -z-1 object-contain"
              width={200}
              height={200}
            />

            <div>
              <span className="block text-lg text-dark mb-1.5">
                Preeti Beauty Soaps
              </span>

              <h2 className="font-bold text-xl lg:text-heading-4 text-dark mb-2.5">
                Up to <span className="text-orange">20%</span> off
              </h2>

              <p className="max-w-[285px] text-custom-sm">
                Cocoa butter, vitamin E, aloe vera & tulsi — gentle care that
                keeps skin soft and nourished.
              </p>

              <a
                href="/shop-with-sidebar"
                className="inline-flex font-medium text-custom-sm text-white bg-orange py-2.5 px-8.5 rounded-md ease-out duration-200 hover:bg-orange-dark mt-7.5"
              >
                Buy Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
