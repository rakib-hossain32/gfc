import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const query = status ? { status } : {};

    const total = await db.collection("testimonials").countDocuments(query);
    const reviews = await db.collection("testimonials")
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      reviews,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const body = await req.json();

    const result = await db.collection("testimonials").insertOne({
      ...body,
      status: "pending",
      rating: body.rating || 5,
      avatar: body.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(body.name)}&background=006C35&color=fff`,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}
