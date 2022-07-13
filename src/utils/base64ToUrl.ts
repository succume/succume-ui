import type { AxiosResponse } from 'axios';
import axios from 'axios';

async function base64ToUrl(url: string): Promise<string> {
  if (url === '') return '';

  let res = '';
  await axios.get(url).then(async (result: AxiosResponse) => {
    res = URL.createObjectURL(await (await fetch(result.data)).blob());
  });
  return res;
}

export default base64ToUrl;
