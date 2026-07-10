"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToCart, removeItemFromCart, updateCartItemQuantity } from "@/redux/features/cart-slice";
import { addItemToWishlist, removeItemFromWishlist } from "@/redux/features/wishlist-slice";
import { updateproductDetails } from "@/redux/features/product-details";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useToast } from "@/app/context/ToastContext";

// Options helper based on product title/type
const getProductOptions = (title: string) => {
  const lowercaseTitle = title.toLowerCase();
  if (lowercaseTitle.includes("washing powder") || lowercaseTitle.includes("powder") || lowercaseTitle.includes("detergent")) {
    return ["1kg", "2kg", "5kg"];
  }
  if (
    lowercaseTitle.includes("cleaner") ||
    lowercaseTitle.includes("liquid") ||
    lowercaseTitle.includes("handwash") ||
    lowercaseTitle.includes("wash") ||
    lowercaseTitle.includes("cuff") ||
    lowercaseTitle.includes("collar") ||
    lowercaseTitle.includes("bleach") ||
    lowercaseTitle.includes("topclean") ||
    lowercaseTitle.includes("color fix") ||
    lowercaseTitle.includes("colorfix")
  ) {
    return ["500ml", "1L", "5L"];
  }
  if (lowercaseTitle.includes("combo") || lowercaseTitle.includes("value pack") || lowercaseTitle.includes("kit")) {
    return ["1 Pack", "2 Packs"];
  }
  if (lowercaseTitle.includes("soap") || lowercaseTitle.includes("pack of")) {
    return ["1 Pack", "3 Packs"];
  }
  if (lowercaseTitle.includes("bag") || lowercaseTitle.includes("towel") || lowercaseTitle.includes("broom")) {
    return ["1 Unit", "3 Units"];
  }
  return ["1 Unit"];
};

// Pricing scaling helper based on size choice
const getAdjustedPrices = (basePrice: number, baseDiscountedPrice: number, option: string) => {
  switch (option) {
    case "1kg":
    case "1 Pack":
    case "1 Unit":
      return { price: basePrice, discountedPrice: baseDiscountedPrice };
    case "2kg":
      return { price: Math.round(basePrice * 1.8), discountedPrice: Math.round(baseDiscountedPrice * 1.8) };
    case "5kg":
      return { price: Math.round(basePrice * 4.2), discountedPrice: Math.round(baseDiscountedPrice * 4.2) };
    case "500ml":
      return { price: Math.round(basePrice * 0.5), discountedPrice: Math.round(baseDiscountedPrice * 0.5) };
    case "1L":
      return { price: basePrice, discountedPrice: baseDiscountedPrice };
    case "5L":
      return { price: Math.round(basePrice * 4.5), discountedPrice: Math.round(baseDiscountedPrice * 4.5) };
    case "2 Packs":
      return { price: Math.round(basePrice * 1.8), discountedPrice: Math.round(baseDiscountedPrice * 1.8) };
    case "3 Packs":
    case "3 Units":
      return { price: Math.round(basePrice * 2.5), discountedPrice: Math.round(baseDiscountedPrice * 2.5) };
    default:
      return { price: basePrice, discountedPrice: baseDiscountedPrice };
  }
};

interface ProductItemProps {
  item: Product;
  viewMode?: "grid" | "list";
}

const ProductItem = ({ item, viewMode = "grid" }: ProductItemProps) => {
  const { openModal } = useModalContext();
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();

  const options = getProductOptions(item.title);
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);

  // Adjust preview image and pricing based on selection
  const selectedOptionIndex = options.indexOf(selectedOption);
  const activeImage = item?.imgs?.previews[selectedOptionIndex] || item?.imgs?.previews[0] || "/images/placeholder.jpg";
  const { price, discountedPrice } = getAdjustedPrices(item.price, item.discountedPrice, selectedOption);

  // Generate unique ID per variant to allow separate line items in the cart
  const variantId = item.id * 100 + selectedOptionIndex;

  // Retrieve cart quantity and wishlist status for the current variant
  const cartItems = useAppSelector((state) => state.cartReducer.items);
  const cartItem = cartItems.find((ci) => ci.id === variantId);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const wishlistItems = useAppSelector((state) => state.wishlistReducer.items);
  const isWishlisted = wishlistItems.some((wi) => wi.id === variantId);

  // Dynamic dispatch payloads
  const dynamicItem = {
    ...item,
    id: variantId,
    price,
    discountedPrice,
    title: `${item.title} (${selectedOption})`,
  };

  const handleQuickViewUpdate = () => {
    dispatch(updateQuickView({ ...dynamicItem }));
  };

  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        ...dynamicItem,
        quantity: 1,
      })
    );
    toast.success("Added to Cart", `Added ${item.title} (${selectedOption}) to your cart.`);
  };

  const handleIncreaseQuantity = () => {
    dispatch(
      updateCartItemQuantity({
        id: variantId,
        quantity: quantityInCart + 1,
      })
    );
  };

  const handleDecreaseQuantity = () => {
    if (quantityInCart > 1) {
      dispatch(
        updateCartItemQuantity({
          id: variantId,
          quantity: quantityInCart - 1,
        })
      );
    } else {
      dispatch(removeItemFromCart(variantId));
      toast.info("Removed from Cart", `${item.title} (${selectedOption}) was removed.`);
    }
  };

  const handleAddToWishlist = () => {
    if (isWishlisted) {
      dispatch(removeItemFromWishlist(variantId));
      toast.info("Removed from Watchlist", `Removed ${item.title} (${selectedOption}) from your watchlist.`);
    } else {
      dispatch(
        addItemToWishlist({
          ...dynamicItem,
          status: "available",
          quantity: 1,
        })
      );
      toast.success("Added to Watchlist", `Added ${item.title} (${selectedOption}) to your watchlist.`);
    }
  };

  const handleProductDetails = () => {
    dispatch(updateproductDetails({ ...dynamicItem }));
  };

  if (viewMode === "list") {
    return (
      <div className="group flex bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md hover:border-gray-200/90 transition-all duration-300 relative w-full h-48 sm:h-52">
        {/* Left Block: Image Container */}
        <div className="relative w-36 h-36 sm:w-44 sm:h-44 bg-[#F8F9FA] rounded-xl flex items-center justify-center overflow-hidden p-2.5 flex-shrink-0 mr-4 sm:mr-6">
          <Image
            src={activeImage}
            alt={item.title}
            width={130}
            height={130}
            className="object-contain w-full h-full group-hover:scale-[1.03] transition-transform duration-300"
          />

          {/* Floating Actions on Top-Right of Image */}
          <div className="absolute top-2 right-2 flex flex-col gap-1.5 z-10">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToWishlist();
              }}
              aria-label="Toggle Watchlist"
              className={`w-7.5 h-7.5 rounded-full flex items-center justify-center shadow-md border transition-all ${
                isWishlisted
                  ? "bg-blue/10 border-blue/20 text-blue"
                  : "bg-white border-gray-100 text-dark-3 hover:text-blue hover:bg-gray-2"
              }`}
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill={isWishlisted ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleQuickViewUpdate();
                openModal();
              }}
              aria-label="Quick View"
              className="w-7.5 h-7.5 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-md text-dark-3 hover:text-blue hover:bg-gray-2 transition-all"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Block: Content Details */}
        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            {/* Title */}
            <h3 className="font-semibold text-dark text-sm sm:text-base leading-snug hover:text-blue transition-colors h-11 flex items-center">
              <Link href="/shop-details" onClick={handleProductDetails} className="line-clamp-2">
                {item.title}
              </Link>
            </h3>

            {/* Ratings */}
            <div className="flex items-center gap-1.5 mb-2 h-5">
              <div className="flex items-center gap-0.5">
                <Image src="/images/icons/icon-star.svg" alt="star" width={13} height={13} />
                <Image src="/images/icons/icon-star.svg" alt="star" width={13} height={13} />
                <Image src="/images/icons/icon-star.svg" alt="star" width={13} height={13} />
                <Image src="/images/icons/icon-star.svg" alt="star" width={13} height={13} />
                <Image src="/images/icons/icon-star.svg" alt="star" width={13} height={13} />
              </div>
              <span className="text-2xs sm:text-xs text-dark-4">({item.reviews})</span>
            </div>

            {/* Variant Price Chips */}
            {options.length > 1 && (
              <div className="flex flex-wrap gap-1.5 my-2">
                {options.map((opt) => {
                  const optPrices = getAdjustedPrices(item.price, item.discountedPrice, opt);
                  const isSelected = selectedOption === opt;
                  return (
                    <button
                      key={opt}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOption(opt);
                      }}
                      className={`flex flex-col items-center justify-center px-2 py-0.5 rounded-lg border text-[10px] font-semibold transition-all duration-150 ${
                        isSelected
                          ? "bg-blue text-white border-blue shadow-2xs"
                          : "bg-white text-dark-2 border-gray-3 hover:border-blue hover:text-blue"
                      }`}
                      style={{ minWidth: "56px" }}
                    >
                      <span>{opt}</span>
                      <span className={`text-[9px] ${isSelected ? "text-blue-light-4" : "text-dark-4"}`}>
                        ₹{optPrices.discountedPrice}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Pricing & ADD/Stepper Row */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-bold text-dark">₹{discountedPrice}</span>
              <span className="text-xs text-dark-4 line-through">₹{price}</span>
            </div>

            {/* Stepper / ADD Button (Fixed size) */}
            <div className="relative w-[84px] h-[34px] flex-shrink-0 flex items-center justify-center">
              {quantityInCart === 0 ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart();
                  }}
                  className="w-full h-full border border-blue text-blue hover:bg-blue hover:text-white font-bold rounded-lg text-xs tracking-wider uppercase transition-all duration-200 bg-white shadow-2xs"
                >
                  Add
                </button>
              ) : (
                <div className="w-full h-full bg-blue text-white flex items-center justify-between px-2.5 rounded-lg text-sm font-bold shadow-sm">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDecreaseQuantity();
                    }}
                    aria-label="Decrease quantity"
                    className="text-white hover:text-white/80 transition-colors w-5 h-full flex items-center justify-center text-base"
                  >
                    −
                  </button>
                  <span className="select-none text-xs">{quantityInCart}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleIncreaseQuantity();
                    }}
                    aria-label="Increase quantity"
                    className="text-white hover:text-white/80 transition-colors w-5 h-full flex items-center justify-center text-base"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default Grid layout: Fixed h-[410px] card with internal flex to prevent layout drift
  return (
    <div className="group flex flex-col justify-between bg-white border border-gray-100 rounded-2xl p-3.5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 relative h-[410px] w-full overflow-hidden">
      {/* Top Block: Image Container (Fixed square container) */}
      <div className="relative w-full h-[180px] bg-[#F8F9FA] rounded-xl flex items-center justify-center overflow-hidden p-2.5 flex-shrink-0 mb-3">
        <Image
          src={activeImage}
          alt={item.title}
          width={180}
          height={180}
          className="object-contain w-full h-full group-hover:scale-[1.03] transition-transform duration-300"
        />

        {/* Floating Actions on Top-Right */}
        <div className="absolute top-2.5 right-2.5 flex flex-col gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToWishlist();
            }}
            aria-label="Toggle Watchlist"
            className={`w-8.5 h-8.5 rounded-full flex items-center justify-center shadow-md border transition-all ${
              isWishlisted
                ? "bg-blue/10 border-blue/20 text-blue"
                : "bg-white border-gray-100 text-dark-3 hover:text-blue hover:bg-gray-2"
            }`}
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill={isWishlisted ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleQuickViewUpdate();
              openModal();
            }}
            aria-label="Quick View"
            className="w-8.5 h-8.5 rounded-full bg-white border border-gray-100 flex items-center justify-center shadow-md text-dark-3 hover:text-blue hover:bg-gray-2 transition-all"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mid Block: Details Info */}
      <div className="flex-1 flex flex-col justify-start">
        {/* Ratings row (Fixed height h-5) */}
        <div className="flex items-center gap-1.5 h-5 mb-1 flex-shrink-0">
          <div className="flex items-center gap-0.5">
            <Image src="/images/icons/icon-star.svg" alt="star" width={12} height={12} />
            <Image src="/images/icons/icon-star.svg" alt="star" width={12} height={12} />
            <Image src="/images/icons/icon-star.svg" alt="star" width={12} height={12} />
            <Image src="/images/icons/icon-star.svg" alt="star" width={12} height={12} />
            <Image src="/images/icons/icon-star.svg" alt="star" width={12} height={12} />
          </div>
          <span className="text-[11px] text-dark-4">({item.reviews})</span>
        </div>

        {/* Title row (Fixed height h-10 to fit 2 lines clamp) */}
        <h3 className="font-semibold text-dark text-xs sm:text-sm h-10 flex items-center mb-2 flex-shrink-0 leading-snug hover:text-blue transition-colors">
          <Link href="/shop-details" onClick={handleProductDetails} className="line-clamp-2">
            {item.title}
          </Link>
        </h3>

        {/* Variant Price Chips row (Fixed height h-9 to keep spacing aligned) */}
        <div className="h-9 flex items-center mb-3 flex-shrink-0">
          {options.length > 1 ? (
            <div className="flex flex-wrap gap-1.5 w-full">
              {options.map((opt) => {
                const optPrices = getAdjustedPrices(item.price, item.discountedPrice, opt);
                const isSelected = selectedOption === opt;
                return (
                  <button
                    key={opt}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedOption(opt);
                    }}
                    className={`flex flex-col items-center justify-center px-2 py-0.5 rounded-lg border text-[10px] font-semibold transition-all duration-150 ${
                      isSelected
                        ? "bg-blue text-white border-blue shadow-2xs"
                        : "bg-white text-dark-2 border-gray-3 hover:border-blue hover:text-blue"
                    }`}
                    style={{ minWidth: "56px" }}
                  >
                    <span>{opt}</span>
                    <span className={`text-[9px] ${isSelected ? "text-blue-light-4" : "text-dark-4"}`}>
                      ₹{optPrices.discountedPrice}
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            // Spacer to keep layout heights perfectly uniform across cards with/without variants
            <div className="h-9 w-full" />
          )}
        </div>
      </div>

      {/* Bottom Block: Pricing & ADD/Stepper Action Row */}
      <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between flex-shrink-0">
        <div className="flex flex-col justify-center">
          <span className="text-base font-bold text-dark leading-tight">₹{discountedPrice}</span>
          <span className="text-[11px] text-dark-4 line-through leading-tight">₹{price}</span>
        </div>

        {/* Stepper / ADD Button (Fixed size) */}
        <div className="relative w-[84px] h-[34px] flex-shrink-0 flex items-center justify-center">
          {quantityInCart === 0 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              className="w-full h-full border border-blue text-blue hover:bg-blue hover:text-white font-bold rounded-lg text-xs tracking-wider uppercase transition-all duration-200 bg-white shadow-2xs"
            >
              Add
            </button>
          ) : (
            <div className="w-full h-full bg-blue text-white flex items-center justify-between px-2.5 rounded-lg text-sm font-bold shadow-sm">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDecreaseQuantity();
                }}
                aria-label="Decrease quantity"
                className="text-white hover:text-white/80 transition-colors w-5 h-full flex items-center justify-center text-base"
              >
                −
              </button>
              <span className="select-none text-xs">{quantityInCart}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleIncreaseQuantity();
                }}
                aria-label="Increase quantity"
                className="text-white hover:text-white/80 transition-colors w-5 h-full flex items-center justify-center text-base"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
