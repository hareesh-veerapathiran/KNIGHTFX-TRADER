-- Run in the Supabase SQL editor before enabling workshop lead capture.
create table if not exists public.workshop_leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  mobile_number text not null,
  telegram_username_or_id text not null,
  coupon_code text not null,
  discount_amount integer not null check (discount_amount = 50),
  regular_price integer not null check (regular_price = 150),
  final_price integer not null check (final_price = 100),
  consent boolean not null check (consent is true),
  source text not null check (source = 'KNIGHTFX Futures + CFD Workshop'),
  created_at timestamptz not null default now(),
  constraint workshop_leads_email_unique unique (email)
);

alter table public.workshop_leads enable row level security;
revoke all on public.workshop_leads from anon, authenticated;
grant insert on public.workshop_leads to service_role;

create table if not exists public.workshop_lead_rate_limits (
  ip_hash text not null,
  bucket_start timestamptz not null,
  request_count integer not null default 1,
  primary key (ip_hash, bucket_start)
);
alter table public.workshop_lead_rate_limits enable row level security;
revoke all on public.workshop_lead_rate_limits from public, anon, authenticated;

create or replace function public.allow_workshop_lead(p_ip_hash text)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_bucket timestamptz := date_trunc('minute', now()) - make_interval(mins => (extract(minute from now())::integer % 10));
  current_count integer;
begin
  if p_ip_hash !~ '^[a-f0-9]{64}$' then return false; end if;
  insert into public.workshop_lead_rate_limits (ip_hash, bucket_start, request_count)
  values (p_ip_hash, current_bucket, 1)
  on conflict (ip_hash, bucket_start)
  do update set request_count = public.workshop_lead_rate_limits.request_count + 1
  returning request_count into current_count;
  if random() < 0.01 then
    delete from public.workshop_lead_rate_limits where bucket_start < now() - interval '2 days';
  end if;
  return current_count <= 5;
end;
$$;
revoke all on function public.allow_workshop_lead(text) from public, anon, authenticated;
grant execute on function public.allow_workshop_lead(text) to service_role;

notify pgrst, 'reload schema';
