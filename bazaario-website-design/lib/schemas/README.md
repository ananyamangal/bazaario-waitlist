# Waitlist schemas

Schemas are derived from the frontend forms and used in the API to validate and sanitize input.

## Buyer waitlist (`buyer_waitlist` collection)

| Field        | Type   | Required | Notes                    |
|-------------|--------|----------|--------------------------|
| email       | string | ✓        | Valid email, stored lowercase |
| phoneNumber | string | ✓        | Max 20 chars, trimmed    |
| createdAt   | Date   | ✓        | Set by API on insert     |

**Frontend:** `components/buyer-form-modal.tsx`  
**API:** `app/api/buyer-waitlist/route.ts`  
**Zod:** `buyerWaitlistSchema` in `lib/schemas/waitlist.ts`

## Seller waitlist (`seller_waitlist` collection)

| Field             | Type     | Required | Notes                          |
|-------------------|----------|----------|--------------------------------|
| shopName          | string   | ✓        | Max 200 chars, trimmed         |
| ownerName         | string   | ✓        | Max 200 chars, trimmed         |
| mobileNumber      | string   | ✓        | Max 20 chars, trimmed          |
| categories        | string[] | ✓        | At least one; from allowed list |
| otherCategoryName | string   |          | When "Other" category selected; max 200 |
| openToVideoCalls   | "yes" \| "no" | ✓   |                                |
| createdAt         | Date     | ✓        | Set by API on insert           |

**Allowed categories:** Clothing / Boutique, Footwear, Jewellery, Furniture / Home decor, Beauty / Accessories, Electronics / Mobiles, Other

**Frontend:** `components/seller-form-modal.tsx`  
**API:** `app/api/seller-waitlist/route.ts`  
**Zod:** `sellerWaitlistSchema` in `lib/schemas/waitlist.ts`
