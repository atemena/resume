import { createClient } from "@/lib/supabase/server";
import { ProfileTile } from "@/components/profile/profile-tile";
import { type Profile, type Tile } from "@/lib/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function PublicProfilePage({ params }: any) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("profiles")
    .select("id, display_name, bio, tiles(id, title, url, type, position, created_at)")
    .eq("id", params.id)
    .order("position", { foreignTable: "tiles" })
    .single();

  if (error || !data) {
    return <div className="p-4">Profile not found</div>;
  }

  const profile = data as Profile;
  const tiles = (profile.tiles as Tile[]) || [];

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">{profile.display_name}</h1>
      {profile.bio && <p>{profile.bio}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 auto-rows-min">
        {tiles.map((tile) => (
          <div
            key={tile.id}
            className={tile.type === "wide_link" ? "md:col-span-2" : ""}
          >
            <ProfileTile tile={tile} />
          </div>
        ))}
      </div>
    </div>
  );
}
