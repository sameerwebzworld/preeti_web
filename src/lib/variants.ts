import { Product } from "@/types/product";

/**
 * Static variant catalog.
 *
 * Until the product service exposes real variants, packs are derived from the
 * product title and priced off the product's base price. `multiplier` is
 * relative to the pack the base price refers to (the one with multiplier 1).
 */

export type VariantBadge = "BEST VALUE" | "POPULAR" | "SAVER PACK";

export type ProductVariant = {
  /** Stable within a product; also the cart line-item discriminator. */
  index: number;
  label: string;
  /** e.g. "Pack of 3 · 250 g each" */
  packNote?: string;
  price: number;
  discountedPrice: number;
  /** Amount in `unit`, used for the per-unit price shown on each row. */
  amount: number;
  unit: "g" | "ml" | "unit";
  inStock: boolean;
  badge?: VariantBadge;
  /** The pack the product's listed price refers to; preselected on the card. */
  isDefault?: boolean;
};

type VariantTemplate = Omit<
  ProductVariant,
  "index" | "price" | "discountedPrice"
> & {
  multiplier: number;
};

const POWDER: VariantTemplate[] = [
  { label: "500 g", packNote: "Trial pack", amount: 500, unit: "g", multiplier: 0.55, inStock: true },
  { label: "1 kg", packNote: "Everyday pack", amount: 1000, unit: "g", multiplier: 1, inStock: true, isDefault: true, badge: "POPULAR" },
  { label: "2 kg", packNote: "Value pack", amount: 2000, unit: "g", multiplier: 1.85, inStock: true },
  { label: "4 kg", packNote: "Monthly pack", amount: 4000, unit: "g", multiplier: 3.5, inStock: true, badge: "SAVER PACK" },
  { label: "6 kg", packNote: "Bulk pack", amount: 6000, unit: "g", multiplier: 5, inStock: true, badge: "BEST VALUE" },
];

const LIQUID: VariantTemplate[] = [
  { label: "250 ml", packNote: "Trial pack", amount: 250, unit: "ml", multiplier: 0.3, inStock: true },
  { label: "500 ml", packNote: "Everyday pack", amount: 500, unit: "ml", multiplier: 0.55, inStock: true, badge: "POPULAR" },
  { label: "1 L", packNote: "Value pack", amount: 1000, unit: "ml", multiplier: 1, inStock: true, isDefault: true },
  { label: "2 L", packNote: "Monthly pack", amount: 2000, unit: "ml", multiplier: 1.9, inStock: true, badge: "SAVER PACK" },
  { label: "5 L", packNote: "Bulk pack", amount: 5000, unit: "ml", multiplier: 4.5, inStock: true, badge: "BEST VALUE" },
];

const COMBO: VariantTemplate[] = [
  { label: "1 Pack", packNote: "Single pack", amount: 1, unit: "unit", multiplier: 1, inStock: true, isDefault: true },
  { label: "2 Packs", packNote: "Save more per pack", amount: 2, unit: "unit", multiplier: 1.85, inStock: true, badge: "POPULAR" },
  { label: "3 Packs", packNote: "Family pack", amount: 3, unit: "unit", multiplier: 2.6, inStock: true, badge: "SAVER PACK" },
  { label: "5 Packs", packNote: "Bulk pack", amount: 5, unit: "unit", multiplier: 4.2, inStock: true, badge: "BEST VALUE" },
];

const SOAP: VariantTemplate[] = [
  { label: "1 Pack", packNote: "Single pack", amount: 1, unit: "unit", multiplier: 1, inStock: true, isDefault: true },
  { label: "3 Packs", packNote: "Pack of 3", amount: 3, unit: "unit", multiplier: 2.5, inStock: true, badge: "POPULAR" },
  { label: "6 Packs", packNote: "Pack of 6", amount: 6, unit: "unit", multiplier: 4.7, inStock: true, badge: "SAVER PACK" },
  { label: "12 Packs", packNote: "Monthly pack", amount: 12, unit: "unit", multiplier: 8.8, inStock: true, badge: "BEST VALUE" },
];

const UNITS: VariantTemplate[] = [
  { label: "1 Unit", packNote: "Single unit", amount: 1, unit: "unit", multiplier: 1, inStock: true, isDefault: true },
  { label: "2 Units", packNote: "Pack of 2", amount: 2, unit: "unit", multiplier: 1.9, inStock: true, badge: "POPULAR" },
  { label: "3 Units", packNote: "Pack of 3", amount: 3, unit: "unit", multiplier: 2.5, inStock: true, badge: "SAVER PACK" },
  { label: "5 Units", packNote: "Pack of 5", amount: 5, unit: "unit", multiplier: 3.9, inStock: true, badge: "BEST VALUE" },
];

const SINGLE: VariantTemplate[] = [
  { label: "1 Unit", amount: 1, unit: "unit", multiplier: 1, inStock: true, isDefault: true },
];

/**
 * Order matters: the first matching rule wins, so the most specific phrases
 * ("washing powder") must be tested before the broader ones ("wash").
 */
const RULES: { keywords: string[]; templates: VariantTemplate[] }[] = [
  { keywords: ["washing powder", "detergent powder", "powder", "detergent"], templates: POWDER },
  { keywords: ["combo", "value pack", "kit"], templates: COMBO },
  { keywords: ["soap", "pack of"], templates: SOAP },
  {
    keywords: [
      "cleaner", "liquid", "handwash", "wash", "cuff", "collar",
      "bleach", "topclean", "color fix", "colorfix",
    ],
    templates: LIQUID,
  },
  { keywords: ["bag", "towel", "broom"], templates: UNITS },
];

export const getProductVariants = (item: Product): ProductVariant[] => {
  const title = item.title.toLowerCase();
  const rule = RULES.find((r) => r.keywords.some((k) => title.includes(k)));
  const templates = rule ? rule.templates : SINGLE;

  return templates.map(({ multiplier, ...rest }, index) => ({
    ...rest,
    index,
    price: Math.round(item.price * multiplier),
    discountedPrice: Math.round(item.discountedPrice * multiplier),
  }));
};

/**
 * The pack a card should open on — the one the product's listed price refers to,
 * so the headline price on the card matches the catalog price.
 */
export const getDefaultVariantIndex = (variants: ProductVariant[]) => {
  const index = variants.findIndex((v) => v.isDefault && v.inStock);
  return index === -1 ? 0 : index;
};

/** Separate cart line item per pack, so 1 L and 5 L don't collapse into one row. */
export const getVariantCartId = (productId: number, variantIndex: number) =>
  productId * 100 + variantIndex;

export const getDiscountPercent = (variant: ProductVariant) => {
  if (variant.price <= variant.discountedPrice) return 0;
  return Math.round(((variant.price - variant.discountedPrice) / variant.price) * 100);
};

/** "₹18 / 100 g" — the comparison shoppers actually use to pick a pack. */
export const getUnitPriceLabel = (variant: ProductVariant): string | null => {
  if (variant.unit === "unit") {
    if (variant.amount <= 1) return null;
    return `₹${Math.round(variant.discountedPrice / variant.amount)} / pack`;
  }
  const per100 = (variant.discountedPrice / variant.amount) * 100;
  return `₹${per100.toFixed(per100 < 10 ? 1 : 0)} / 100 ${variant.unit}`;
};
