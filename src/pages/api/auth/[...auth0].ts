import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        authorizationParams: {
          audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
          scope:
            'openid email profile read:current_user update:current_user update:current_user_metadata',
        },
      });
    } catch ({ message, status }) {
      // @ts-ignore
      res.status(status || 400).end(message);
    }
  },
});
