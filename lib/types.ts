export type TileType = "link" | "wide_link";

export interface Tile {
  id: string;
  profile_id: string;
  title: string;
  url: string | null;
  type: TileType;
  position: number;
  created_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  display_name: string | null;
  bio: string | null;
  created_at: string;
  tiles?: Tile[];
}
