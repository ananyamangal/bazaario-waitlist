import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import { sellerWaitlistSchema } from "@/lib/schemas/waitlist"

// Initialize MongoDB client
let cachedClient: MongoClient | null = null

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient
  }

  const client = await MongoClient.connect(process.env.MONGODB_URI!)
  cachedClient = client
  return client
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = sellerWaitlistSchema.safeParse(body)

    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join("; ") || "Invalid input"
      return NextResponse.json({ error: message }, { status: 400 })
    }

    const { shopName, ownerName, mobileNumber, categories, otherCategoryName, openToVideoCalls } =
      parsed.data
    const client = await connectToDatabase()
    const db = client.db("bazaario")
    const collection = db.collection("seller_waitlist")

    await collection.insertOne({
      shopName,
      ownerName,
      mobileNumber,
      categories,
      ...(otherCategoryName && { otherCategoryName }),
      openToVideoCalls,
      createdAt: new Date(),
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error saving seller waitlist:", error)
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 })
  }
}
