'use server';

import { createClient } from '@/lib/supabase/server';
import { Tile, TileType } from '@/lib/types';

export async function updateProfileAction(
  profileId: string,
  updates: { display_name?: string; bio?: string },
) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', profileId)
    .select('id, display_name, bio')
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function createTileAction(
  profileId: string,
  tile: { title: string; url?: string; type: TileType; position: number },
): Promise<Tile> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tiles')
    .insert({
      profile_id: profileId,
      title: tile.title,
      url: tile.url,
      type: tile.type,
      position: tile.position,
    })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as Tile;
}

export async function updateTileAction(
  tileId: string,
  updates: { title?: string; url?: string; type?: TileType; position?: number },
): Promise<Tile> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tiles')
    .update(updates)
    .eq('id', tileId)
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data as Tile;
}

export async function deleteTileAction(tileId: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from('tiles').delete().eq('id', tileId);
  if (error) throw new Error(error.message);
}
