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

export async function GET() {
  try {
    const client = await connectToDatabase()
    const db = client.db("bazaario")

    // Count documents in both collections
    const shopsCount = await db.collection("seller_waitlist").countDocuments()
    const buyersCount = await db.collection("buyer_waitlist").countDocuments()

    // Start with base numbers and add real counts
    return NextResponse.json({
      shops: 112 + shopsCount,
      buyers: 1002131 + buyersCount,
    })
  } catch (error) {
    console.error("Error fetching stats:", error)
    // Return default values if DB fails
    return NextResponse.json({
      shops: 112,
      buyers: 1002131,
    })
  }
}
