import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";
import { ObjectId } from "mongodb";

// GET all services
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const services = await db.collection("services").find({}).toArray();
    return NextResponse.json(services);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

// POST create service category
export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const body = await req.json();
    
    const result = await db.collection("services").insertOne({
      ...body,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create service category" }, { status: 500 });
  }
}
