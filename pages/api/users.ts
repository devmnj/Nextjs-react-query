import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/prisma-client';
import NextCors from 'nextjs-cors';
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
 });
  if (req.method !== 'POST') {
    const { limit=1 } = req.query
    
    const users = await prisma.user.findMany({take:Number(limit)});
    return res.status(200).json({ users });
  }
  else {
    const { name, email } = req.body;
    const user= await prisma.user.create({data: {
      name: name, email: email
    },});

    return res.status(200).json({user})
    
  }
}
