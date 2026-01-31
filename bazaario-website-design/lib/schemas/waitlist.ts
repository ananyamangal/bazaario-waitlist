import { z } from "zod"

/**
 * Schemas derived from frontend forms.
 * Buyer: buyer-form-modal (email, phoneNumber)
 * Seller: seller-form-modal (shopName, ownerName, mobileNumber, categories, otherCategoryName?, openToVideoCalls)
 */

const SELLER_CATEGORIES = [
  "Clothing / Boutique",
  "Footwear",
  "Jewellery",
  "Furniture / Home decor",
  "Beauty / Accessories",
  "Electronics / Mobiles",
  "Other",
] as const

/** Buyer waitlist – matches BuyerFormModal formData */
export const buyerWaitlistSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email")
    .transform((s) => s.trim().toLowerCase()),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .max(20)
    .transform((s) => s.trim()),
})

/** Seller waitlist – matches SellerFormModal formData */
export const sellerWaitlistSchema = z.object({
  shopName: z
    .string()
    .min(1, "Shop name is required")
    .max(200)
    .transform((s) => s.trim()),
  ownerName: z
    .string()
    .min(1, "Owner/Manager name is required")
    .max(200)
    .transform((s) => s.trim()),
  mobileNumber: z
    .string()
    .min(1, "Mobile number is required")
    .max(20)
    .transform((s) => s.trim()),
  categories: z
    .array(z.enum(SELLER_CATEGORIES))
    .min(1, "Select at least one category"),
  otherCategoryName: z
    .string()
    .max(200)
    .transform((s) => (s.trim() === "" ? undefined : s.trim()))
    .optional(),
  openToVideoCalls: z.enum(["yes", "no"], {
    required_error: "Please select if you're open to video calls",
  }),
})

export type BuyerWaitlistInput = z.infer<typeof buyerWaitlistSchema>
export type SellerWaitlistInput = z.infer<typeof sellerWaitlistSchema>

/** Document shape stored in MongoDB (includes createdAt from API) */
export type BuyerWaitlistDocument = BuyerWaitlistInput & {
  createdAt: Date
}

export type SellerWaitlistDocument = Omit<SellerWaitlistInput, "otherCategoryName"> & {
  otherCategoryName?: string
  createdAt: Date
}
