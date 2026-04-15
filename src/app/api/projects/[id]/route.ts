import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";
import { ObjectId } from "mongodb";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const body = await req.json();

    // Remove _id from body to avoid update error
    const { _id, ...updateData } = body;

    const result = await db.collection("projects").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    return NextResponse.json({ success: true, modifiedCount: result.modifiedCount });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const result = await db.collection("projects").deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({ success: true, deletedCount: result.deletedCount });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
