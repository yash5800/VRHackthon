import { checkStudent, student_look } from "@/lib/database";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('cache-control', 'no-store');
  console.log("got re")

  const result = await student_look();
  console.log(result);

  res.status(200).json({ found: result });
}