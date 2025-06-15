# Database Design

This document outlines a first-pass schema for the "link in bio" social profile MVP.

## Tables

### profiles
- `id` uuid primary key default `gen_random_uuid()`
- `user_id` uuid references `auth.users(id)` unique not null
- `display_name` text
- `bio` text
- `created_at` timestamp with time zone default `now()`

Each user has one profile referenced by `user_id`.

### tiles
- `id` uuid primary key default `gen_random_uuid()`
- `profile_id` uuid references `profiles(id)` on delete cascade
- `title` text not null
- `url` text
- `type` text not null default `link`
- `position` integer default `0`
- `created_at` timestamp with time zone default `now()`

Tiles are ordered by the `position` column so a user's profile can display them in a specific order. Tiles also include a `type` column for mapping to React components. The MVP supports two types: `link` and `wide_link`.

### relationships
- `profiles.user_id` → `auth.users.id`
- `tiles.profile_id` → `profiles.id`

## Notes
- Consider adding an index on `tiles.profile_id` and `tiles.position` for quick retrieval.
- Additional profile customization fields (avatar, theme, etc.) can be added later.
