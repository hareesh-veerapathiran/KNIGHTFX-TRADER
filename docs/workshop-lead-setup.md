# Workshop lead capture setup

The registration API returns success only after it has written the lead to Supabase. Until deployment has valid server environment variables and the migration below has been run, the form intentionally fails closed and does not unlock the offer.

## Configure Supabase

1. Create or select the Supabase project used for private workshop registration.
2. Run `supabase/workshop-leads.sql` in its SQL editor.
3. Configure these environment variables in the hosting project and local `.env.local` (never commit the latter):
   - `SUPABASE_URL` — the project URL. `NEXT_PUBLIC_SUPABASE_URL` is also accepted as a fallback for the URL only.
   - `SUPABASE_SECRET_KEY` — the current Supabase secret key. The legacy `SUPABASE_SERVICE_ROLE_KEY` name is also accepted. Keep either key server-only; never use a `NEXT_PUBLIC_` variable for it.
4. Deploy and confirm the form can submit a test registration before advertising the offer. Remove the test record afterward.

The table has row-level security enabled, denies browser roles access, enforces one lead per normalized email, and only the server's secret key can write. Supabase secret keys are sent in the `apikey` header, not as a Bearer token. Rate limiting uses a database-backed, ten-minute bucket and stores only a SHA-256 hash of the request IP. The API independently validates all fields, consent, and the configured coupon, and calculates the price on the server.

The Privacy Policy at `/privacy` deliberately identifies provider and retention details as operator-configurable. Update it if the chosen provider, data-retention period, or privacy contact changes.
