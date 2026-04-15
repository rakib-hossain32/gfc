import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";
import { projects } from "@/src/lib/projects";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    // Remove existing projects and insert new ones
    await db.collection("projects").deleteMany({});
    const result = await db.collection("projects").insertMany(projects);

    return NextResponse.json({ 
      success: true, 
      message: `${result.insertedCount} projects seeded successfully` 
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ success: false, error: "Failed to seed data" }, { status: 500 });
  }
}
