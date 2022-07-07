import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

/*
 * /api/auth/login:     Provider for them to log in.
 * /api/auth/callback:  Identity Provider redirects users to this route after they successfully log in.
 * /api/auth/logout:    Next.js application logs out the user.
 * /api/auth/me:        fetch user profile information in JSON format.
 */
export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        authorizationParams: {
          audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
          scope:
            'openid email profile read:current_user update:current_user_metadata',
        },
      });
    } catch ({ message, status }) {
      // @ts-ignore
      res.status(status || 400).end(message);
    }
  },
});
