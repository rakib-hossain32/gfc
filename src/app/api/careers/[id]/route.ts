import { NextResponse } from "next/server";
import clientPromise from "@/src/lib/mongodb";
import { ObjectId } from "mongodb";
import { sendEmail } from "@/src/lib/mail";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const { id } = await params;
    await db.collection("applications").deleteOne({ _id: new ObjectId(id) });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to delete application" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const { id } = await params;
    const body = await req.json();
    const newStatus = body.status;

    // Fetch application before updating (to get email/name)
    const app = await db.collection("applications").findOne({ _id: new ObjectId(id) });
    if (!app) return NextResponse.json({ error: "Not found" }, { status: 404 });

    await db.collection("applications").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: newStatus, updatedAt: new Date() } }
    );

    // Send email notification to applicant
    if (app.email && app.name) {
      const emailTemplates: Record<string, { subject: string; html: string }> = {
        reviewed: {
          subject: "Your Application is Being Reviewed — Golden First Contracting",
          html: `
            <div style="font-family:'Segoe UI',sans-serif;max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #eee;">
              <div style="background:#2B2E34;padding:32px 40px;">
                <h1 style="color:#fff;margin:0;font-size:22px;font-weight:900;letter-spacing:-0.5px;">GOLDEN FIRST CONTRACTING</h1>
                <p style="color:rgba(255,255,255,0.4);margin:4px 0 0;font-size:11px;letter-spacing:3px;text-transform:uppercase;">Application Update</p>
              </div>
              <div style="padding:40px;">
                <p style="color:#6B7280;font-size:12px;text-transform:uppercase;letter-spacing:2px;margin:0 0 8px;">Status Update</p>
                <h2 style="color:#2B2E34;font-size:24px;font-weight:900;margin:0 0 24px;">Under Review</h2>
                <p style="color:#4B5563;font-size:15px;line-height:1.7;">Dear <strong>${app.name}</strong>,</p>
                <p style="color:#4B5563;font-size:15px;line-height:1.7;">Your application for <strong>${app.position}</strong> is currently being reviewed by our HR team. We will get back to you shortly.</p>
                <div style="background:#F8F9FA;border-radius:12px;padding:20px;margin:24px 0;">
                  <p style="margin:0;color:#6B7280;font-size:12px;text-transform:uppercase;letter-spacing:2px;">Applied Position</p>
                  <p style="margin:6px 0 0;color:#2B2E34;font-size:16px;font-weight:700;">${app.position}</p>
                </div>
              </div>
              <div style="background:#F8F9FA;padding:20px 40px;text-align:center;">
                <p style="color:#9CA3AF;font-size:11px;margin:0;">Golden First Contracting — Saudi Arabia's Premier Facility Management Company</p>
              </div>
            </div>`,
        },
        shortlisted: {
          subject: "🎉 Congratulations! You've Been Shortlisted — Golden First Contracting",
          html: `
            <div style="font-family:'Segoe UI',sans-serif;max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #eee;">
              <div style="background:linear-gradient(135deg,#006C35,#2B2E34);padding:32px 40px;">
                <h1 style="color:#fff;margin:0;font-size:22px;font-weight:900;">GOLDEN FIRST CONTRACTING</h1>
                <p style="color:rgba(255,255,255,0.5);margin:4px 0 0;font-size:11px;letter-spacing:3px;text-transform:uppercase;">Application Update</p>
              </div>
              <div style="padding:40px;">
                <div style="background:#dcfce7;border-radius:12px;padding:16px 20px;margin-bottom:24px;display:inline-block;">
                  <p style="margin:0;color:#16a34a;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;">✓ Shortlisted</p>
                </div>
                <h2 style="color:#2B2E34;font-size:24px;font-weight:900;margin:0 0 16px;">Great News, ${app.name}!</h2>
                <p style="color:#4B5563;font-size:15px;line-height:1.7;">You have been <strong>shortlisted</strong> for the position of <strong>${app.position}</strong>. Our team will contact you soon to schedule the next steps.</p>
                <p style="color:#4B5563;font-size:15px;line-height:1.7;">Please keep your phone and email accessible. Prepare your original documents for verification.</p>
              </div>
              <div style="background:#F8F9FA;padding:20px 40px;text-align:center;">
                <p style="color:#9CA3AF;font-size:11px;margin:0;">Golden First Contracting — Saudi Arabia's Premier Facility Management Company</p>
              </div>
            </div>`,
        },
        hired: {
          subject: "🏆 Welcome to Golden First Contracting — You're Hired!",
          html: `
            <div style="font-family:'Segoe UI',sans-serif;max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #eee;">
              <div style="background:linear-gradient(135deg,#006C35 0%,#D4AF37 100%);padding:40px;">
                <h1 style="color:#fff;margin:0;font-size:24px;font-weight:900;letter-spacing:-0.5px;">GOLDEN FIRST CONTRACTING</h1>
                <p style="color:rgba(255,255,255,0.6);margin:4px 0 0;font-size:11px;letter-spacing:3px;text-transform:uppercase;">Official Offer</p>
              </div>
              <div style="padding:40px;">
                <h2 style="color:#006C35;font-size:28px;font-weight:900;margin:0 0 8px;">Welcome Aboard!</h2>
                <p style="color:#4B5563;font-size:15px;line-height:1.7;">Dear <strong>${app.name}</strong>,</p>
                <p style="color:#4B5563;font-size:15px;line-height:1.7;">We are thrilled to officially welcome you to the <strong>Golden First Contracting</strong> family. You have been selected for the position of <strong>${app.position}</strong>.</p>
                <div style="background:linear-gradient(135deg,#006C35,#2B2E34);border-radius:16px;padding:24px;margin:24px 0;color:#fff;">
                  <p style="margin:0 0 4px;font-size:11px;letter-spacing:2px;text-transform:uppercase;opacity:0.6;">Your Position</p>
                  <p style="margin:0;font-size:20px;font-weight:900;">${app.position}</p>
                </div>
                <p style="color:#4B5563;font-size:15px;line-height:1.7;">Please log in to your profile at <a href="${process.env.AUTH_URL}/profile" style="color:#006C35;font-weight:700;">Golden First Contracting Portal</a> to download your official Employee ID Card.</p>
              </div>
              <div style="background:#F8F9FA;padding:20px 40px;text-align:center;">
                <p style="color:#9CA3AF;font-size:11px;margin:0;">Golden First Contracting — Saudi Arabia's Premier Facility Management Company</p>
              </div>
            </div>`,
        },
        rejected: {
          subject: "Application Update — Golden First Contracting",
          html: `
            <div style="font-family:'Segoe UI',sans-serif;max-width:560px;margin:0 auto;background:#fff;border-radius:16px;overflow:hidden;border:1px solid #eee;">
              <div style="background:#2B2E34;padding:32px 40px;">
                <h1 style="color:#fff;margin:0;font-size:22px;font-weight:900;">GOLDEN FIRST CONTRACTING</h1>
                <p style="color:rgba(255,255,255,0.4);margin:4px 0 0;font-size:11px;letter-spacing:3px;text-transform:uppercase;">Application Update</p>
              </div>
              <div style="padding:40px;">
                <h2 style="color:#2B2E34;font-size:22px;font-weight:900;margin:0 0 16px;">Thank You for Applying</h2>
                <p style="color:#4B5563;font-size:15px;line-height:1.7;">Dear <strong>${app.name}</strong>,</p>
                <p style="color:#4B5563;font-size:15px;line-height:1.7;">After careful consideration, we regret to inform you that we will not be moving forward with your application for <strong>${app.position}</strong> at this time.</p>
                <p style="color:#4B5563;font-size:15px;line-height:1.7;">We appreciate your interest in Golden First Contracting and encourage you to apply again in the future when new positions open.</p>
              </div>
              <div style="background:#F8F9FA;padding:20px 40px;text-align:center;">
                <p style="color:#9CA3AF;font-size:11px;margin:0;">Golden First Contracting — Saudi Arabia's Premier Facility Management Company</p>
              </div>
            </div>`,
        },
      };

      const template = emailTemplates[newStatus];
      if (template) {
        await sendEmail(app.email, template.subject, template.html);
      }
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 });
  }
}
