-- DZStore OS initial MVP schema
create extension if not exists pgcrypto;

create table if not exists public.stores (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null,
  name text not null,
  phone text,
  currency text not null default 'DZD',
  default_language text not null default 'ar',
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  name text not null,
  description text,
  price numeric(12,2) not null default 0,
  stock integer,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  name text,
  phone text,
  instagram_handle text,
  wilaya text,
  created_at timestamptz not null default now()
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  customer_id uuid references public.customers(id) on delete set null,
  channel text not null check (channel in ('whatsapp','instagram','web','manual')),
  status text not null default 'open' check (status in ('open','needs_human','closed')),
  last_message_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  direction text not null check (direction in ('inbound','outbound')),
  sender_type text not null check (sender_type in ('customer','ai','human')),
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.stores(id) on delete cascade,
  customer_id uuid references public.customers(id) on delete set null,
  status text not null default 'draft' check (status in ('draft','confirmed','processing','shipped','delivered','cancelled')),
  subtotal numeric(12,2) not null default 0,
  delivery_fee numeric(12,2) not null default 0,
  total numeric(12,2) generated always as (subtotal + delivery_fee) stored,
  delivery_address text,
  wilaya text,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  unit_price numeric(12,2) not null,
  quantity integer not null default 1 check (quantity > 0)
);

create table if not exists public.ai_settings (
  store_id uuid primary key references public.stores(id) on delete cascade,
  enabled boolean not null default false,
  auto_reply boolean not null default false,
  tone text not null default 'friendly',
  system_instructions text,
  updated_at timestamptz not null default now()
);

create index if not exists idx_products_store on public.products(store_id);
create index if not exists idx_customers_store on public.customers(store_id);
create index if not exists idx_conversations_store on public.conversations(store_id);
create index if not exists idx_orders_store on public.orders(store_id);
