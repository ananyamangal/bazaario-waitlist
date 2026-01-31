import { NextResponse } from "next/server"
import { MongoClient } from "mongodb"
import { buyerWaitlistSchema } from "@/lib/schemas/waitlist"

// Initialize MongoDB client
let cachedClient: MongoClient | null = null

async function connectToDatabase() {
  const uri = process.env.MONGODB_URI
  if (!uri) {
    throw new Error("MONGODB_URI is not set. Add it in Vercel → Settings → Environment Variables.")
  }
  if (cachedClient) {
    return cachedClient
  }
  const client = await MongoClient.connect(uri)
  cachedClient = client
  return client
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const parsed = buyerWaitlistSchema.safeParse(body)

    if (!parsed.success) {
      const message = parsed.error.errors.map((e) => e.message).join("; ") || "Invalid input"
      return NextResponse.json({ error: message }, { status: 400 })
    }

    const { email, phoneNumber } = parsed.data
    const client = await connectToDatabase()
    const db = client.db("bazaario")
    const collection = db.collection("buyer_waitlist")

    await collection.insertOne({
      email,
      phoneNumber,
      createdAt: new Date(),
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Error saving buyer waitlist:", error)
    const message = error instanceof Error && error.message.includes("MONGODB_URI")
      ? "Server is not configured for the database yet. Please try again later."
      : "Failed to save data. Please check your connection and try again."
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
