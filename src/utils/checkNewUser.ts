import axios from 'axios';

async function checkNewUser(): Promise<boolean> {
  let isNewUser = false;
  const url = `http://localhost/api/auth/metadata`;

  await axios.get(url).then((res) => {
    if (res.data.logins_count === 1 && res.data.user_metadata === undefined) {
      isNewUser = true;
      axios.patch(url, {
        user_metadata: {
          new_user: true,
        },
      });
    } else if (res.data.user_metadata?.new_user) {
      isNewUser = true;
    }
  });

  return isNewUser;
}

export default checkNewUser;
