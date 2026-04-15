import { NextResponse } from "next/server";
import { auth } from "@/auth";
import clientPromise from "@/src/lib/mongodb";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const user = await db.collection("users").findOne(
    { _id: new ObjectId(session.user.id) },
    { projection: { password: 0 } }
  );

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Also fetch employee application status
  const application = await db.collection("applications").findOne(
    { email: user.email, applicationType: "employee" },
    { projection: { status: 1, position: 1, appliedAt: 1, name: 1, nationality: 1, _id: 1 } }
  );

  return NextResponse.json({
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    role: user.role,
    phone: user.phone || "",
    createdAt: user.createdAt,
    application: application ? {
      id: application._id.toString(),
      status: application.status,
      position: application.position,
      appliedAt: application.appliedAt,
      name: application.name,
      nationality: application.nationality,
    } : null,
  });
}
export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, phone, currentPassword, newPassword } = body;

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const updateFields: Record<string, unknown> = {};
  if (name) updateFields.name = name;
  if (phone !== undefined) updateFields.phone = phone;

  if (newPassword) {
    if (!currentPassword) return NextResponse.json({ error: "Current password required" }, { status: 400 });
    const user = await db.collection("users").findOne({ _id: new ObjectId(session.user.id) });
    if (!user?.password) return NextResponse.json({ error: "Cannot change password for OAuth accounts" }, { status: 400 });
    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    updateFields.password = await bcrypt.hash(newPassword, 12);
  }

  await db.collection("users").updateOne(
    { _id: new ObjectId(session.user.id) },
    { $set: updateFields }
  );

  return NextResponse.json({ message: "Profile updated successfully" });
}
