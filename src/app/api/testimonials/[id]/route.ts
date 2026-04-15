import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";
import { ObjectId } from "mongodb";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const result = await db.collection("testimonials").deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({ success: true, deletedCount: result.deletedCount });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}

// Support updating status (e.g., from pending to approved)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const { status } = await req.json();

    const result = await db.collection("testimonials").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    return NextResponse.json({ success: true, modifiedCount: result.modifiedCount });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}
