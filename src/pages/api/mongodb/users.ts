import type { NextApiRequest, NextApiResponse } from 'next';

import connectMongo from '@/mongodb/connectMongo';
import Users from '@/mongodb/usersModel';

export default async function users(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await connectMongo();
    // @ts-ignore
    const user = await Users.create(req.body);

    res.status(200).json({
      code: 200,
      data: user,
    });
  }

  res.status(400).json({
    code: 400,
    data: 'Bad HTTP Request.',
  });
}
