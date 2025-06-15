import Link from "next/link";

export function EmptyTile() {
  return (
    <Link
      href="/profile/builder"
      className="flex items-center justify-center p-6 border-2 border-dashed rounded-md text-sm text-muted-foreground hover:bg-accent/50"
    >
      Add your first tile
    </Link>
  );
}

