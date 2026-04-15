import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { EmployeeApplicationForm } from "@/src/components/blocks/EmployeeApplicationForm";
import clientPromise from "@/src/lib/mongodb";
import { AlreadyAppliedScreen } from "@/src/components/blocks/EmployeeApplicationForm";

export default async function ApplyPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  // Server-side check — session email দিয়ে already applied কিনা দেখো
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);
  const existing = await db.collection("applications").findOne({
    email: session.user.email,
    applicationType: "employee",
  });

  if (existing) return <AlreadyAppliedScreen />;

  return <EmployeeApplicationForm />;
}
