-- Migration to add tile type column
alter table if exists tiles
  add column if not exists type text not null default 'link';

create index if not exists tiles_type_idx on tiles(type);
