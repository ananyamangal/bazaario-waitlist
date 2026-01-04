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
    const { email, phoneNumber } = body

    // Validate required fields
    if (!email || !phoneNumber) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const client = await connectToDatabase()
    const db = client.db("bazaario")
    const collection = db.collection("buyer_waitlist")

    // Insert the buyer data
    await collection.insertOne({
      email,
      phoneNumber,
      createdAt: new Date(),
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error saving buyer waitlist:", error)
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 })
  }
}
