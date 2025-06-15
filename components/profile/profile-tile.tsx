import { Tile } from "@/lib/types";
import { LinkTile } from "./link-tile";
import { WideLinkTile } from "./wide-link-tile";

export function ProfileTile({ tile }: { tile: Tile }) {
  switch (tile.type) {
    case "wide_link":
      return tile.url ? <WideLinkTile title={tile.title} url={tile.url} /> : null;
    case "link":
    default:
      return tile.url ? <LinkTile title={tile.title} url={tile.url} /> : null;
  }
}
