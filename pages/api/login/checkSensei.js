import { checkSensei } from "@/lib/database";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, pwd } = req.body || {};
  res.setHeader('cache-control', 'no-store');

  const result = await checkSensei({
    id: id,
    pwd: pwd
  });

  res.status(200).json({ found: result });
}