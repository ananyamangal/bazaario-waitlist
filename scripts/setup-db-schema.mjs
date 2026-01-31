/**
 * One-time setup: create bazaario DB collections with MongoDB JSON Schema validators.
 * Run from bazaario-website-design with:
 *   node --env-file=.env.local scripts/setup-db-schema.mjs
 * Or set MONGODB_URI in the environment first.
 */

import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) {
  console.error("Missing MONGODB_URI. Run: node --env-file=.env.local scripts/setup-db-schema.mjs")
  process.exit(1)
}

const BUYER_VALIDATOR = {
  $jsonSchema: {
    bsonType: "object",
    required: ["email", "phoneNumber", "createdAt"],
    properties: {
      email: { bsonType: "string", description: "Buyer email" },
      phoneNumber: { bsonType: "string", description: "Buyer phone" },
      createdAt: { bsonType: "date", description: "Insert time" },
    },
  },
}

const SELLER_VALIDATOR = {
  $jsonSchema: {
    bsonType: "object",
    required: ["shopName", "ownerName", "mobileNumber", "categories", "openToVideoCalls", "createdAt"],
    properties: {
      shopName: { bsonType: "string", maxLength: 200 },
      ownerName: { bsonType: "string", maxLength: 200 },
      mobileNumber: { bsonType: "string", maxLength: 20 },
      categories: {
        bsonType: "array",
        minItems: 1,
        items: { bsonType: "string" },
      },
      otherCategoryName: { bsonType: "string", maxLength: 200 },
      openToVideoCalls: { enum: ["yes", "no"] },
      createdAt: { bsonType: "date" },
    },
  },
}

async function main() {
  const client = new MongoClient(MONGODB_URI)
  try {
    await client.connect()
    const db = client.db("bazaario")

    // Get existing collections to decide create vs collMod
    const collections = await db.listCollections().toArray()
    const names = collections.map((c) => c.name)

    if (!names.includes("buyer_waitlist")) {
      await db.createCollection("buyer_waitlist", { validator: BUYER_VALIDATOR, validationLevel: "strict" })
      console.log("Created collection buyer_waitlist with schema validator.")
    } else {
      await db.command({
        collMod: "buyer_waitlist",
        validator: BUYER_VALIDATOR,
        validationLevel: "strict",
      })
      console.log("Updated buyer_waitlist validator.")
    }

    if (!names.includes("seller_waitlist")) {
      await db.createCollection("seller_waitlist", { validator: SELLER_VALIDATOR, validationLevel: "strict" })
      console.log("Created collection seller_waitlist with schema validator.")
    } else {
      await db.command({
        collMod: "seller_waitlist",
        validator: SELLER_VALIDATOR,
        validationLevel: "strict",
      })
      console.log("Updated seller_waitlist validator.")
    }

    console.log("Schema setup done.")
  } finally {
    await client.close()
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
