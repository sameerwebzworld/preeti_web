"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { Product } from "@/types/product";
import {
  ProductVariant,
  getDiscountPercent,
  getUnitPriceLabel,
  getVariantCartId,
} from "@/lib/variants";
import {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
} from "@/redux/features/cart-slice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useToast } from "@/app/context/ToastContext";

interface VariantModalProps {
  item: Product;
  variants: ProductVariant[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  onClose: () => void;
}

const BADGE_STYLES: Record<string, string> = {
  "BEST VALUE": "bg-green-light-6 text-green-dark border-green-light-3",
  "SAVER PACK": "bg-yellow-light-4 text-yellow-dark-2 border-yellow-light-2",
  POPULAR: "bg-blue-light-5 text-blue-dark border-blue-light-3",
};

const VariantModal = ({
  item,
  variants,
  selectedIndex,
  onSelect,
  onClose,
}: VariantModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const cartItems = useAppSelector((state) => state.cartReducer.items);

  // Drives the enter transition; the panel mounts off-screen and slides in.
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setEntered(true));

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const quantityOf = (variant: ProductVariant) =>
    cartItems.find((ci) => ci.id === getVariantCartId(item.id, variant.index))
      ?.quantity ?? 0;

  const packsInCart = variants.reduce((sum, v) => sum + quantityOf(v), 0);
  const cartTotal = variants.reduce(
    (sum, v) => sum + v.discountedPrice * quantityOf(v),
    0
  );

  const variantImage = (variant: ProductVariant) =>
    item.imgs?.previews?.[variant.index] ||
    item.imgs?.previews?.[0] ||
    "/images/placeholder.jpg";

  const handleAdd = (variant: ProductVariant) => {
    dispatch(
      addItemToCart({
        ...item,
        id: getVariantCartId(item.id, variant.index),
        title: `${item.title} (${variant.label})`,
        price: variant.price,
        discountedPrice: variant.discountedPrice,
        quantity: 1,
      })
    );
    onSelect(variant.index);
    toast.success("Added to Cart", `${item.title} (${variant.label}) added.`);
  };

  const handleIncrease = (variant: ProductVariant) => {
    dispatch(
      updateCartItemQuantity({
        id: getVariantCartId(item.id, variant.index),
        quantity: quantityOf(variant) + 1,
      })
    );
  };

  const handleDecrease = (variant: ProductVariant) => {
    const id = getVariantCartId(item.id, variant.index);
    const quantity = quantityOf(variant);

    if (quantity > 1) {
      dispatch(updateCartItemQuantity({ id, quantity: quantity - 1 }));
    } else {
      dispatch(removeItemFromCart(id));
      toast.info("Removed from Cart", `${item.title} (${variant.label}) was removed.`);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-99999 flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={`Choose a pack for ${item.title}`}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-dark/60 backdrop-blur-[2px] transition-opacity duration-300 ${
          entered ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel: bottom sheet on mobile, centered dialog from sm up */}
      <div
        className={`relative flex max-h-[88vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-3 transition-all duration-300 ease-out sm:max-w-[480px] sm:rounded-2xl ${
          entered
            ? "translate-y-0 opacity-100 sm:scale-100"
            : "translate-y-8 opacity-0 sm:translate-y-0 sm:scale-95"
        }`}
      >
        {/* Drag handle (mobile affordance only) */}
        <div className="flex justify-center pt-3 sm:hidden">
          <span className="h-1 w-10 rounded-full bg-gray-3" />
        </div>

        {/* Header */}
        <div className="flex items-start gap-3 border-b border-gray-3 px-5 py-4">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F8F9FA] p-1.5">
            <Image
              src={variantImage(variants[selectedIndex] ?? variants[0])}
              alt={item.title}
              width={56}
              height={56}
              className="h-full w-full object-contain"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-dark sm:text-base">
              {item.title}
            </h3>
            <p className="mt-0.5 text-xs text-dark-4">
              {variants.length} pack sizes available
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close pack selector"
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-2 text-dark-4 transition-colors hover:bg-gray-3 hover:text-dark"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Variant list */}
        <div className="flex-1 overflow-y-auto px-3 py-3" role="radiogroup">
          <div className="flex flex-col gap-2">
            {variants.map((variant) => {
              const isSelected = variant.index === selectedIndex;
              const quantity = quantityOf(variant);
              const discount = getDiscountPercent(variant);
              const unitPrice = getUnitPriceLabel(variant);

              return (
                <div
                  key={variant.index}
                  role="radio"
                  aria-checked={isSelected}
                  aria-disabled={!variant.inStock}
                  tabIndex={variant.inStock ? 0 : -1}
                  onClick={() => variant.inStock && onSelect(variant.index)}
                  onKeyDown={(e) => {
                    if (!variant.inStock) return;
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(variant.index);
                    }
                  }}
                  className={`flex items-center gap-3 rounded-xl border p-3 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue/40 ${
                    variant.inStock ? "cursor-pointer" : "cursor-not-allowed opacity-60"
                  } ${
                    isSelected
                      ? "border-blue bg-blue-light-5/60 shadow-1"
                      : "border-gray-3 bg-white hover:border-blue/50 hover:bg-gray-1"
                  }`}
                >
                  {/* Radio */}
                  <span
                    className={`flex h-4.5 w-4.5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      isSelected ? "border-blue" : "border-gray-4"
                    }`}
                  >
                    {isSelected && <span className="h-2 w-2 rounded-full bg-blue" />}
                  </span>

                  {/* Pack info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-sm font-semibold text-dark">{variant.label}</span>
                      {variant.badge && (
                        <span
                          className={`rounded border px-1.5 py-px text-[9px] font-bold uppercase tracking-wide ${
                            BADGE_STYLES[variant.badge]
                          }`}
                        >
                          {variant.badge}
                        </span>
                      )}
                    </div>

                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-sm font-bold text-dark">
                        ₹{variant.discountedPrice}
                      </span>
                      {discount > 0 && (
                        <>
                          <span className="text-xs text-dark-4 line-through">
                            ₹{variant.price}
                          </span>
                          <span className="text-[11px] font-semibold text-green">
                            {discount}% off
                          </span>
                        </>
                      )}
                    </div>

                    {(unitPrice || variant.packNote) && (
                      <p className="mt-0.5 text-[11px] text-dark-4">
                        {[unitPrice, variant.packNote].filter(Boolean).join(" · ")}
                      </p>
                    )}
                  </div>

                  {/* Per-pack ADD / stepper */}
                  <div className="h-8.5 w-[84px] flex-shrink-0">
                    {!variant.inStock ? (
                      <span className="flex h-full w-full items-center justify-center rounded-lg bg-gray-2 text-[10px] font-semibold uppercase text-dark-5">
                        Sold out
                      </span>
                    ) : quantity === 0 ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAdd(variant);
                        }}
                        className="h-full w-full rounded-lg border border-blue bg-white text-xs font-bold uppercase tracking-wider text-blue shadow-1 transition-all duration-200 hover:bg-blue hover:text-white"
                      >
                        Add
                      </button>
                    ) : (
                      <div className="flex h-full w-full items-center justify-between rounded-lg bg-blue px-2 text-sm font-bold text-white shadow-sm">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDecrease(variant);
                          }}
                          aria-label={`Decrease ${variant.label} quantity`}
                          className="flex h-full w-5 items-center justify-center text-base transition-colors hover:text-white/80"
                        >
                          −
                        </button>
                        <span className="select-none text-xs">{quantity}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleIncrease(variant);
                          }}
                          aria-label={`Increase ${variant.label} quantity`}
                          className="flex h-full w-5 items-center justify-center text-base transition-colors hover:text-white/80"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 border-t border-gray-3 bg-white px-5 py-3.5">
          <div className="min-w-0">
            {packsInCart > 0 ? (
              <>
                <p className="text-sm font-bold text-dark">₹{cartTotal}</p>
                <p className="text-[11px] text-dark-4">
                  {packsInCart} {packsInCart === 1 ? "pack" : "packs"} in cart
                </p>
              </>
            ) : (
              <p className="text-xs text-dark-4">Pick a pack size to add</p>
            )}
          </div>

          <button
            onClick={onClose}
            className="h-10 rounded-lg bg-blue px-7 text-sm font-semibold text-white transition-colors hover:bg-blue-dark"
          >
            Done
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default VariantModal;
