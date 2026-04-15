import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";
import { sendEmail } from "@/src/lib/mail";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, sector, message } = body;

    // --- DB STORAGE ---
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const result = await db.collection("inquiries").insertOne({
      name,
      email,
      phone,
      sector,
      message,
      createdAt: new Date(),
      status: "unread"
    });

    // --- HYBRID: SEND EMAIL NOTIFICATION ---
    const adminEmail = process.env.EMAIL_USER;
    if (adminEmail) {
      const emailHtml = `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #006C35;">New Corporate Inquiry Received</h2>
          <p><strong>Client Name:</strong> ${name}</p>
          <p><strong>Service Sector:</strong> ${sector || "Not Specified"}</p>
          <p><strong>Email:</strong> ${email || "Not Provided"}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Project Details:</strong> ${message}</p>
          <hr />
          <p style="font-size: 12px; color: #666;">This is an automated notification from your Golden First Contracting website Quick Request form.</p>
        </div>
      `;
      await sendEmail(adminEmail, `Quick Request: ${name} - ${sector || "Inquiry"}`, emailHtml);
    }

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (e) {
    console.error("Quick Request Error:", e);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const inquiries = await db.collection("inquiries").find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(inquiries);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    await db.collection("inquiries").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
