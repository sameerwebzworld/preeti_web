import { Menu } from "@/types/Menu";

export const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Shop All",
    newTab: false,
    path: "/shop-with-sidebar",
  },
  {
    id: 3,
    title: "Categories",
    newTab: false,
    path: "/",
    submenu: [
      {
        id: 31,
        title: "House Care",
        newTab: false,
        path: "/shop-with-sidebar",
      },
      {
        id: 32,
        title: "Laundry Care",
        newTab: false,
        path: "/shop-with-sidebar",
      },
      {
        id: 33,
        title: "Personal Care",
        newTab: false,
        path: "/shop-with-sidebar",
      },
      {
        id: 34,
        title: "Kitchen Care",
        newTab: false,
        path: "/shop-with-sidebar",
      },
      {
        id: 35,
        title: "Brooms & Mops",
        newTab: false,
        path: "/shop-with-sidebar",
      },
    ],
  },
  {
    id: 4,
    title: "Combo Kits",
    newTab: false,
    path: "/shop-without-sidebar",
  },
  {
    id: 5,
    title: "Best Sellers",
    newTab: false,
    path: "/shop-without-sidebar",
  },
  {
    id: 6,
    title: "Contact",
    newTab: false,
    path: "/contact",
  },
];
