import { checkSensei, UpdateStudent } from "@/lib/database";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { data,id } = req.body || {};
  res.setHeader('cache-control', 'no-store');

  const result = await UpdateStudent(data,id);

  res.status(200).json({ found: result });
}