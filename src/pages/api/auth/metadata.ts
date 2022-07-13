import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

/**
 * Axios requests to fetch data from Auth0 service.
 * @param method the HTTP method
 * @param url the request url
 * @param accessToken the Auth0 access token
 * @param data  the data for PATCH request
 */
const metadataRequest = async (
  method: string,
  url: string,
  accessToken: string | undefined,
  data?: Object
): Promise<Object> => {
  let res = {};

  /**
   * Axios request configuration.
   */
  const options: AxiosRequestConfig<any> = {
    method,
    data,
    url,
    headers: {
      authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
    },
  };

  /**
   * Axios request to fetch data from specific url.
   */
  await axios.request(options).then((axiosRes) => {
    res = axiosRes.data;
  });

  return res;
};

/**
 * API handler for route /api/auth/metadata.
 * @param req the next.js API request
 * @param res the next.js API response
 */
async function metadata(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession(req, res);

  const id = session?.user?.sub;
  const accessToken = session?.accessToken;
  const url = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${id}`;

  if (req.method === 'GET') {
    res.status(200).json(await metadataRequest('GET', url, accessToken));
  } else if (req.method === 'PATCH') {
    res
      .status(200)
      .json(await metadataRequest('PATCH', url, accessToken, req.body));
  } else {
    res.status(400).json({
      code: 400,
      message: 'Bad HTTP request method.',
    });
  }
}

export default withApiAuthRequired(metadata);
