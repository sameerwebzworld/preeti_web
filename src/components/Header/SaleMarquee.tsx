import React from "react";

const saleMessages = [
  "MEGA SALE — Flat 25% OFF sitewide",
  "Free shipping on all orders above ₹499",
  "Use code PREETI10 for an extra 10% OFF",
  "Buy 2 Get 1 Free on select home care packs",
];

// The track slides left by 25% of its own width (see the `marquee` keyframes),
// so it must hold exactly 4 copies for each loop to land on an identical frame.
// The 3 copies left of the fold also keep the bar filled on wide screens.
const COPIES = 4;

const SaleMarquee = () => {
  return (
    <div className="group relative overflow-hidden bg-blue text-white">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {Array.from({ length: COPIES }).map((_, copy) => (
          <ul key={copy} aria-hidden={copy > 0} className="flex shrink-0">
            {saleMessages.map((message, key) => (
              <li
                key={key}
                className="flex items-center gap-6 whitespace-nowrap px-6 py-2 text-custom-sm font-medium"
              >
                {message}
                <span aria-hidden className="text-white/50">
                  ✦
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default SaleMarquee;
