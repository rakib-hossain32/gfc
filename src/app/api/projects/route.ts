import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";
import { ObjectId } from "mongodb";

// GET all projects
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const projects = await db.collection("projects").find({}).toArray();
    return NextResponse.json(projects);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

// POST create project
export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const body = await req.json();
    
    const result = await db.collection("projects").insertOne({
      ...body,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
