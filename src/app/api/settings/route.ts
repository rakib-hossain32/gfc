import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";

// GET settings
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const settings = await db.collection("settings").findOne({});
    
    // Return default settings if none found
    if (!settings) {
      return NextResponse.json({
        siteName: "Golden First Contracting",
        email: "info@goldenfirstcontracting.com",
        phone: "+97400000000",
        address: "Riyadh, Saudi Arabia",
        facebook: "",
        instagram: "",
        linkedin: "",
        metaDescription: "Golden First Contracting - Premium Integrated Facility Management, Cleaning, and Manpower Services.",
        operationalHours: "Sun - Thu: 08:00 AM - 06:00 PM",
      });
    }
    
    return NextResponse.json(settings);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

// POST/PUT update settings
export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const body = await req.json();
    
    // Remove _id for safety
    const { _id, ...updateData } = body;

    const result = await db.collection("settings").updateOne(
      {},
      { $set: { ...updateData, updatedAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
