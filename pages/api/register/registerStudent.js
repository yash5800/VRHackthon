import { registerStudent } from "@/lib/database";


export default async function handler(req,res){
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {user,ID,pwd,email} = req.body || {};
  res.setHeader('cache-control','no-store');

  const date = new Date().toLocaleDateString('en-US',{
    year:"numeric",
    month:"short",
    day:"numeric",
    hour:"numeric",
    minute:"numeric",
    second:"numeric"
  })

  const result = await  registerStudent({id:ID,name:user,pwd:pwd,email:email,data:[],_created:date});

  return res.status(200).json({found:result});
}