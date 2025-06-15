import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function UserProfileRedirect() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("user_id", data.user.id)
    .single();

  if (!profile) {
    return <div className="p-4">No profile found</div>;
  }

  redirect(`/profile/${profile.id}`);
}
