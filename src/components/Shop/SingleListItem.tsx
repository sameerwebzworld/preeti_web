"use client";
import React from "react";
import ProductItem from "@/components/Common/ProductItem";
import { Product } from "@/types/product";

const SingleListItem = ({ item }: { item: Product }) => {
  return <ProductItem item={item} viewMode="list" />;
};

export default SingleListItem;
