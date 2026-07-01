import { Product } from "@/types/product";

// Live product photos are served from Preeti Products' Shopify CDN.
// (cdn.shopify.com is whitelisted in next.config.js)
const CDN = "https://cdn.shopify.com/s/files/1/0651/2023/9673/files";

const shopData: Product[] = [
  {
    title: "Combo Box - Promo Kit 5 in 1",
    reviews: 42,
    price: 530.0,
    discountedPrice: 300.0,
    id: 1,
    imgs: {
      thumbnails: [`${CDN}/6.jpg?v=1734007975`, `${CDN}/5.jpg?v=1734007975`],
      previews: [`${CDN}/6.jpg?v=1734007975`, `${CDN}/5.jpg?v=1734007975`],
    },
  },
  {
    title: "Preeti Fairy – White Cleaning Liquid for Floors",
    reviews: 28,
    price: 155.0,
    discountedPrice: 120.0,
    id: 2,
    imgs: {
      thumbnails: [
        `${CDN}/Preeti_Fairy.png?v=1766406668`,
        `${CDN}/2_f950392b-df38-49dd-a822-b9f946b79c16.png?v=1766407286`,
      ],
      previews: [
        `${CDN}/Preeti_Fairy.png?v=1766406668`,
        `${CDN}/2_f950392b-df38-49dd-a822-b9f946b79c16.png?v=1766407286`,
      ],
    },
  },
  {
    title: "Preeti Micromatic Washing Powder",
    reviews: 34,
    price: 150.0,
    discountedPrice: 110.0,
    id: 3,
    imgs: {
      thumbnails: [
        `${CDN}/Micromatic5kgcreative.jpg?v=1733377553`,
        `${CDN}/Micromatic1kgcreative.jpg?v=1733377553`,
      ],
      previews: [
        `${CDN}/Micromatic5kgcreative.jpg?v=1733377553`,
        `${CDN}/Micromatic1kgcreative.jpg?v=1733377553`,
      ],
    },
  },
  {
    title: "Preeti Premium Washing Powder",
    reviews: 51,
    price: 160.0,
    discountedPrice: 140.0,
    id: 4,
    imgs: {
      thumbnails: [
        `${CDN}/Premium1kg_5kg.png?v=1733376989`,
        `${CDN}/IMG_0289.jpg?v=1733376961`,
      ],
      previews: [
        `${CDN}/Premium1kg_5kg.png?v=1733376989`,
        `${CDN}/IMG_0289.jpg?v=1733376961`,
      ],
    },
  },
  {
    title: "Preeti Milky Floor Cleaner",
    reviews: 19,
    price: 300.0,
    discountedPrice: 240.0,
    id: 5,
    imgs: {
      thumbnails: [`${CDN}/Milky5ltr.jpg?v=1733230860`, `${CDN}/Milky5ltr.jpg?v=1733230860`],
      previews: [`${CDN}/Milky5ltr.jpg?v=1733230860`, `${CDN}/Milky5ltr.jpg?v=1733230860`],
    },
  },
  {
    title: "Preeti Fairy Power Plus 500ml",
    reviews: 23,
    price: 250.0,
    discountedPrice: 200.0,
    id: 6,
    imgs: {
      thumbnails: [
        `${CDN}/Fairypowerplus500ml.jpg?v=1733227366`,
        `${CDN}/Fairypowerplus500ml.jpg?v=1733227366`,
      ],
      previews: [
        `${CDN}/Fairypowerplus500ml.jpg?v=1733227366`,
        `${CDN}/Fairypowerplus500ml.jpg?v=1733227366`,
      ],
    },
  },
  {
    title: "Preeti Deluxe Brooms",
    reviews: 37,
    price: 249.0,
    discountedPrice: 160.0,
    id: 7,
    imgs: {
      thumbnails: [`${CDN}/broom1.jpg?v=1733231594`, `${CDN}/broom.jpg?v=1733231595`],
      previews: [`${CDN}/broom1.jpg?v=1733231594`, `${CDN}/broom.jpg?v=1733231595`],
    },
  },
  {
    title: "Preeti Topclean – Liquid Cleaner for Hard Surfaces 500ml",
    reviews: 16,
    price: 125.0,
    discountedPrice: 95.0,
    id: 8,
    imgs: {
      thumbnails: [
        `${CDN}/Topclean500ml.jpg?v=1733231434`,
        `${CDN}/Topclean500ml.jpg?v=1733231434`,
      ],
      previews: [
        `${CDN}/Topclean500ml.jpg?v=1733231434`,
        `${CDN}/Topclean500ml.jpg?v=1733231434`,
      ],
    },
  },
  {
    title: "61-Bristle Virgin Plastic Broom",
    reviews: 20,
    price: 140.0,
    discountedPrice: 120.0,
    id: 9,
    imgs: {
      thumbnails: [
        `${CDN}/2_14671a76-d1cf-4a80-a1c4-dd21afaffba6.png?v=1733374953`,
        `${CDN}/2_14671a76-d1cf-4a80-a1c4-dd21afaffba6.png?v=1733374953`,
      ],
      previews: [
        `${CDN}/2_14671a76-d1cf-4a80-a1c4-dd21afaffba6.png?v=1733374953`,
        `${CDN}/2_14671a76-d1cf-4a80-a1c4-dd21afaffba6.png?v=1733374953`,
      ],
    },
  },
  {
    title: "Preeti Plus – Laundry Soap (Pack of 5)",
    reviews: 33,
    price: 175.0,
    discountedPrice: 135.0,
    id: 10,
    imgs: {
      thumbnails: [`${CDN}/Pluscreative.jpg?v=1733375336`, `${CDN}/plus.jpg?v=1733375336`],
      previews: [`${CDN}/Pluscreative.jpg?v=1733375336`, `${CDN}/plus.jpg?v=1733375336`],
    },
  },
  {
    title: "Preeti Popular Washing Powder",
    reviews: 27,
    price: 520.0,
    discountedPrice: 450.0,
    id: 11,
    imgs: {
      thumbnails: [`${CDN}/popular5kg.jpg?v=1733376268`, `${CDN}/Popular1kg.jpg?v=1733376268`],
      previews: [`${CDN}/popular5kg.jpg?v=1733376268`, `${CDN}/Popular1kg.jpg?v=1733376268`],
    },
  },
  {
    title: "Preeti Color Fix – Colour Protection Liquid",
    reviews: 21,
    price: 80.0,
    discountedPrice: 75.0,
    id: 12,
    imgs: {
      thumbnails: [
        `${CDN}/Colorfix500ml.jpg?v=1733382388`,
        `${CDN}/colorfix200ml.jpg?v=1733382388`,
      ],
      previews: [
        `${CDN}/Colorfix500ml.jpg?v=1733382388`,
        `${CDN}/colorfix200ml.jpg?v=1733382388`,
      ],
    },
  },
  {
    title: "Preeti Magic – Stain Lightener for Coloured Clothes",
    reviews: 30,
    price: 100.0,
    discountedPrice: 70.0,
    id: 13,
    imgs: {
      thumbnails: [`${CDN}/6.png?v=1766579342`, `${CDN}/8.png?v=1766579351`],
      previews: [`${CDN}/6.png?v=1766579342`, `${CDN}/8.png?v=1766579351`],
    },
  },
  {
    title: "Preeti C-N-C – Cuff & Collar Liquid Cleaner",
    reviews: 24,
    price: 100.0,
    discountedPrice: 75.0,
    id: 14,
    imgs: {
      thumbnails: [`${CDN}/CnC500ml.jpg?v=1733379531`, `${CDN}/CNC5ltr.jpg?v=1733379531`],
      previews: [`${CDN}/CnC500ml.jpg?v=1733379531`, `${CDN}/CNC5ltr.jpg?v=1733379531`],
    },
  },
  {
    title: "Preeti White – Liquid Bleach",
    reviews: 18,
    price: 70.0,
    discountedPrice: 60.0,
    id: 15,
    imgs: {
      thumbnails: [`${CDN}/13.png?v=1766579937`, `${CDN}/11.png?v=1766579937`],
      previews: [`${CDN}/13.png?v=1766579937`, `${CDN}/11.png?v=1766579937`],
    },
  },
  {
    title: "Lemon Handwash – 800ml",
    reviews: 39,
    price: 150.0,
    discountedPrice: 110.0,
    id: 16,
    imgs: {
      thumbnails: [`${CDN}/lemon800ml.jpg?v=1733221247`, `${CDN}/lemon800ml.jpg?v=1733221247`],
      previews: [`${CDN}/lemon800ml.jpg?v=1733221247`, `${CDN}/lemon800ml.jpg?v=1733221247`],
    },
  },
  {
    title: "Rose Handwash – 5 Litre",
    reviews: 26,
    price: 700.0,
    discountedPrice: 580.0,
    id: 17,
    imgs: {
      thumbnails: [
        `${CDN}/Rose_hanwash_5_ltr.jpg?v=1733221461`,
        `${CDN}/Rose_hanwash_5_ltr.jpg?v=1733221461`,
      ],
      previews: [
        `${CDN}/Rose_hanwash_5_ltr.jpg?v=1733221461`,
        `${CDN}/Rose_hanwash_5_ltr.jpg?v=1733221461`,
      ],
    },
  },
  {
    title: "Preeti Natural – Beauty Care Soap",
    reviews: 47,
    price: 42.0,
    discountedPrice: 40.0,
    id: 18,
    imgs: {
      thumbnails: [`${CDN}/Naturalbathsoap.jpg?v=1733222500`, `${CDN}/Natural1.jpg?v=1733222500`],
      previews: [`${CDN}/Naturalbathsoap.jpg?v=1733222500`, `${CDN}/Natural1.jpg?v=1733222500`],
    },
  },
  {
    title: "Preeti Herbal – Skin Care Soap",
    reviews: 35,
    price: 38.0,
    discountedPrice: 36.0,
    id: 19,
    imgs: {
      thumbnails: [
        `${CDN}/herbalbathsoap.jpg?v=1733222340`,
        `${CDN}/Herbalbathsoap1.jpg?v=1733222340`,
      ],
      previews: [
        `${CDN}/herbalbathsoap.jpg?v=1733222340`,
        `${CDN}/Herbalbathsoap1.jpg?v=1733222340`,
      ],
    },
  },
  {
    title: "Preeti Shikakai – Hair Care Soap",
    reviews: 29,
    price: 30.0,
    discountedPrice: 28.0,
    id: 20,
    imgs: {
      thumbnails: [`${CDN}/Shikakai.jpg?v=1733222144`, `${CDN}/Shikakai.jpg?v=1733222144`],
      previews: [`${CDN}/Shikakai.jpg?v=1733222144`, `${CDN}/Shikakai.jpg?v=1733222144`],
    },
  },
  {
    title: "Garbage Bags – 30 Oxo-Biodegradable Bags (19 x 21 in)",
    reviews: 22,
    price: 80.0,
    discountedPrice: 60.0,
    id: 21,
    imgs: {
      thumbnails: [`${CDN}/IMG_6222.jpg?v=1733383065`, `${CDN}/IMG_6222.jpg?v=1733383065`],
      previews: [`${CDN}/IMG_6222.jpg?v=1733383065`, `${CDN}/IMG_6222.jpg?v=1733383065`],
    },
  },
  {
    title: "Super Absorbent Turkish Towel Mopping Cloths",
    reviews: 31,
    price: 450.0,
    discountedPrice: 350.0,
    id: 22,
    imgs: {
      thumbnails: [`${CDN}/IMG_0140_jpg.jpg?v=1733374355`, `${CDN}/IMG_0140_jpg.jpg?v=1733374355`],
      previews: [`${CDN}/IMG_0140_jpg.jpg?v=1733374355`, `${CDN}/IMG_0140_jpg.jpg?v=1733374355`],
    },
  },
];

export default shopData;
