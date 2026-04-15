import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";
import { ObjectId } from "mongodb";

// PUT update team member
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const body = await req.json();
    
    // Remove _id from body if it exists to prevent update error
    const { _id, ...updateData } = body;

    const result = await db.collection("team").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to update team member" }, { status: 500 });
  }
}

// DELETE team member
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const result = await db.collection("team").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Team member not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to delete team member" }, { status: 500 });
  }
}
