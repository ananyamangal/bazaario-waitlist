import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"

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
    const { shopName, ownerName, mobileNumber, categories, openToVideoCalls } = body

    // Validate required fields
    if (!shopName || !ownerName || !mobileNumber || !categories || !openToVideoCalls) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await connectToDatabase()
    const db = client.db("bazaario")
    const collection = db.collection("seller_waitlist")

    // Insert the seller data
    await collection.insertOne({
      shopName,
      ownerName,
      mobileNumber,
      categories,
      openToVideoCalls,
      createdAt: new Date(),
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error saving seller waitlist:", error)
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 })
  }
}
