import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ProfileClient } from "@/src/components/blocks/ProfileClient";

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return <ProfileClient />;
}
