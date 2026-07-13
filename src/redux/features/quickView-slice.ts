import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/product";

/**
 * Quick view holds the *unflattened* product plus the pack the card was showing,
 * so the modal can render the full pack list and open on the right one.
 */
export type QuickViewProduct = Product & {
  selectedVariantIndex?: number;
};

type InitialState = {
  value: QuickViewProduct;
};

const initialState = {
  value: {
    title: "",
    reviews: 0,
    price: 0,
    discountedPrice: 0,
    img: "",
    id: 0,
    images: [],
    imgs: { thumbnails: [], previews: [] },
  } as QuickViewProduct,
} as InitialState;

export const quickView = createSlice({
  name: "quickView",
  initialState,
  reducers: {
    updateQuickView: (_, action) => {
      return {
        value: {
          ...action.payload,
        },
      };
    },

    resetQuickView: () => {
      return {
        value: initialState.value,
      };
    },
  },
});

export const { updateQuickView, resetQuickView } = quickView.actions;
export default quickView.reducer;
