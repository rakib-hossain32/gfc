import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";

// GET all team members
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const team = await db.collection("team").find({}).toArray();
    return NextResponse.json(team);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch team members" }, { status: 500 });
  }
}

// POST create team member
export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const body = await req.json();
    
    const result = await db.collection("team").insertOne({
      ...body,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 });
  }
}
