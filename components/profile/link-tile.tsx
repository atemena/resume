import Link from "next/link";

interface LinkTileProps {
  title: string;
  url: string;
}

export function LinkTile({ title, url }: LinkTileProps) {
  return (
    <Link
      href={url}
      className="block p-3 border rounded-md hover:underline"
      target="_blank"
      rel="noreferrer"
    >
      {title}
    </Link>
  );
}
