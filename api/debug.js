export default async function handler(req, res) {
  return res.status(200).json({
    has_supabase_url: !!process.env.SUPABASE_URL,
    has_supabase_key: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    has_admin_password: !!process.env.ADMIN_PASSWORD,
  })
}
