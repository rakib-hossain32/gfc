import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import clientPromise from "@/src/lib/mongodb"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Protocol incomplete. All credentials required." },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB)

    // Check for existing user
    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { error: "Identification already exists in database." },
        { status: 400 }
      )
    }

    // Hash security key
    const hashedPassword = await bcrypt.hash(password, 12)

    // Provision new user
    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      role: "user",
      createdAt: new Date(),
    })

    return NextResponse.json(
      { message: "Registration protocol completed successfully.", id: result.insertedId },
      { status: 201 }
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: "System failure during registration." },
      { status: 500 }
    )
  }
}
