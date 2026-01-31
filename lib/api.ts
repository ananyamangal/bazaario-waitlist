/**
 * Frontend API client – connects to Next.js API routes.
 * Uses relative URLs in the browser so same-origin requests work.
 */

const getBase = () => (typeof window === "undefined" ? "" : "")

export type Stats = { shops: number; buyers: number }

export async function getStats(): Promise<Stats> {
  const res = await fetch(`${getBase()}/api/stats`)
  if (!res.ok) throw new Error("Failed to fetch stats")
  return res.json()
}

export type BuyerWaitlistPayload = { email: string; phoneNumber: string }

export async function postBuyerWaitlist(
  payload: BuyerWaitlistPayload
): Promise<{ success: true } | { success: false; error: string }> {
  const res = await fetch(`${getBase()}/api/buyer-waitlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  const data = await res.json().catch(() => ({}))
  if (res.ok) return { success: true }
  return { success: false, error: data.error ?? "Failed to submit. Please try again." }
}

export type SellerWaitlistPayload = {
  shopName: string
  ownerName: string
  mobileNumber: string
  categories: string[]
  otherCategoryName?: string
  openToVideoCalls: "yes" | "no"
}

export async function postSellerWaitlist(
  payload: SellerWaitlistPayload
): Promise<{ success: true } | { success: false; error: string }> {
  const res = await fetch(`${getBase()}/api/seller-waitlist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
  const data = await res.json().catch(() => ({}))
  if (res.ok) return { success: true }
  return { success: false, error: data.error ?? "Failed to submit. Please try again." }
}
