import Link from "next/link";

interface WideLinkTileProps {
  title: string;
  url: string;
}

export function WideLinkTile({ title, url }: WideLinkTileProps) {
  return (
    <Link
      href={url}
      className="block p-4 border rounded-md hover:underline"
      target="_blank"
      rel="noreferrer"
    >
      {title}
    </Link>
  );
}
