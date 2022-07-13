import type { OctokitResponse } from '@octokit/types';
import moment from 'moment';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

const { Octokit } = require('@octokit/core');

const accessToken = process.env.GITHUB_TOKEN;
const githubOwner = process.env.GITHUB_OWNER;
const githubRepo = process.env.GITHUB_REPO;
const octokit = new Octokit({ auth: `${accessToken}` });

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === 'PUT') {
    let path: string = moment().format('YYYY/MM');
    path += `/${req.body.filename}`;

    await octokit
      .request(`PUT /repos/${githubOwner}/${githubRepo}/contents/${path}`, {
        owner: githubOwner,
        repo: githubRepo,
        path,
        message: 'Succume picture avatar upload service.',
        committer: {
          name: 'Succume Team',
          email: 'succume@admin.io',
        },
        content: Buffer.from(req.body.content).toString('base64'),
      })
      .then((result: OctokitResponse<any>) => {
        res.status(200).json({
          code: 200,
          data: result.data,
        });
      });
  }
};

export default handler;
