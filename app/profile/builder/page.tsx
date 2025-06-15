import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProfileBuilder } from "@/components/profile/profile-builder";
import { type Profile, type Tile } from "@/lib/types";

export default async function ProfileBuilderPage() {
  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    redirect("/auth/login");
  }

  const { data } = await supabase
    .from("profiles")
    .select("id, display_name, bio, tiles(id, title, url, type, position, created_at)")
    .eq("user_id", userData!.user.id)
    .order("position", { foreignTable: "tiles" })
    .single();

  if (!data) {
    return <div className="p-4">No profile found</div>;
  }

  const profile = data as Profile;
  const tiles = (profile.tiles as Tile[]) || [];

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">{profile.display_name}</h1>
      {profile.bio && <p>{profile.bio}</p>}
      <ProfileBuilder profileId={profile.id} initialTiles={tiles} />
    </div>
  );
}
