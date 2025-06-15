"use client";

import { useState } from "react";
import { ProfileTile } from "./profile-tile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal } from "@/components/ui/modal";
import { Tile, TileType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProfileBuilderProps {
  profileId: string;
  initialTiles: Tile[];
}

export function ProfileBuilder({ profileId, initialTiles }: ProfileBuilderProps) {
  const [tiles, setTiles] = useState<Tile[]>(initialTiles);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Tile | null>(null);
  const [form, setForm] = useState<{ title: string; url: string; type: TileType }>(
    { title: "", url: "", type: "link" },
  );

  const openAdd = () => {
    setEditing(null);
    setForm({ title: "", url: "", type: "link" });
    setOpen(true);
  };

  const openEdit = (tile: Tile) => {
    setEditing(tile);
    setForm({ title: tile.title, url: tile.url ?? "", type: tile.type });
    setOpen(true);
  };

  const handleSave = async () => {
    if (form.title.trim() === "") return;
    if (editing) {
      const res = await fetch(`/api/tiles/${editing.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: form.title, url: form.url, type: form.type }),
      });
      if (res.ok) {
        const data = (await res.json()) as Tile;
        setTiles((prev) => prev.map((t) => (t.id === data.id ? data : t)));
      }
    } else {
      const res = await fetch("/api/tiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profileId,
          title: form.title,
          url: form.url,
          type: form.type,
          position: tiles.length,
        }),
      });
      if (res.ok) {
        const data = (await res.json()) as Tile;
        setTiles((prev) => [...prev, data]);
      }
    }
    setOpen(false);
  };

  const handleRemove = async () => {
    if (!editing) return;
    const res = await fetch(`/api/tiles/${editing.id}`, { method: "DELETE" });
    if (res.ok) {
      setTiles((prev) => prev.filter((t) => t.id !== editing.id));
    }
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 auto-rows-min">
        {tiles.map((tile) => (
          <div
            key={tile.id}
            className={cn(
              tile.type === "wide_link" ? "md:col-span-2" : "",
              "cursor-pointer border border-dashed hover:bg-accent/50",
            )}
            onClick={() => openEdit(tile)}
          >
            <ProfileTile tile={tile} />
          </div>
        ))}
      </div>
      <Button onClick={openAdd} variant="outline" className="self-start">
        Add Tile
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="flex flex-col gap-4 relative"
        >
          <div className="grid gap-2">
            <Label htmlFor="type">Tile Type</Label>
            <select
              id="type"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as TileType })}
              className="border rounded-md p-2"
            >
              <option value="link">Link</option>
              <option value="wide_link">Wide Link</option>
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              required
            />
          </div>
          <div className="flex gap-2 mt-2">
            {editing && (
              <Button type="button" variant="destructive" onClick={handleRemove}>
                Delete
              </Button>
            )}
            <Button type="submit" className="ml-auto">
              Save
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
