import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";
import { sendEmail } from "@/src/lib/mail";
import { auth } from "@/auth";

export async function POST(req: Request) {
  try {
    // Get session — use server-side email, never trust client
    const session = await auth();
    const sessionEmail = session?.user?.email;

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const body = await req.json();

    const { name, phone, position, message } = body;
    // Always use session email if available, fallback to body for non-auth submissions
    const email = sessionEmail || body.email;

    if (!name || !email || !position) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Duplicate check — session email + applicationType
    const existing = await db.collection("applications").findOne({
      email,
      applicationType: body.applicationType || "general",
    });
    if (existing) {
      return NextResponse.json({ error: "already_applied" }, { status: 409 });
    }

    const application = {
      name, email, phone, position, message,
      status: "pending",
      appliedAt: new Date(),
      // extended employee fields
      nationality: body.nationality || "",
      dateOfBirth: body.dateOfBirth || "",
      gender: body.gender || "",
      passportNumber: body.passportNumber || "",
      passportExpiry: body.passportExpiry || "",
      qidNumber: body.qidNumber || "",
      currentLocation: body.currentLocation || "",
      emergencyContactName: body.emergencyContactName || "",
      emergencyContactPhone: body.emergencyContactPhone || "",
      experience: body.experience || "",
      skills: body.skills || "",
      previousEmployer: body.previousEmployer || "",
      availableFrom: body.availableFrom || "",
      expectedSalary: body.expectedSalary || "",
      hasSaudiVisa: body.hasSaudiVisa || "",
      willingToRelocate: body.willingToRelocate || "",
      referredBy: body.referredBy || "",
      applicationType: body.applicationType || "general",
    };

    const result = await db.collection("applications").insertOne(application);

    const adminEmail = process.env.EMAIL_USER;
    if (adminEmail) {
      const emailHtml = `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #006C35;">New Job Application — ${body.applicationType === "employee" ? "Employee" : "General"}</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Position:</strong> ${position}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Nationality:</strong> ${body.nationality || "—"}</p>
          <p><strong>Experience:</strong> ${body.experience || "—"}</p>
          <p><strong>Skills:</strong> ${body.skills || "—"}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
      `;
      await sendEmail(adminEmail, `New Application: ${name} — ${position}`, emailHtml);
    }

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (e) {
    console.error("Career application error:", e);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const search = searchParams.get("search") || "";
    const status = searchParams.get("status") || "";
    const type = searchParams.get("type") || "";

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const query: Record<string, unknown> = {};
    if (status) query.status = status;
    if (type) query.applicationType = type;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { position: { $regex: search, $options: "i" } },
        { nationality: { $regex: search, $options: "i" } },
      ];
    }

    const total = await db.collection("applications").countDocuments(query);
    const applications = await db.collection("applications")
      .find(query)
      .sort({ appliedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return NextResponse.json({ applications, total, page, limit });
  } catch (e) {
    console.error("GET /api/careers error:", e);
    return NextResponse.json({ error: "Failed to fetch applications", details: String(e) }, { status: 500 });
  }
}
