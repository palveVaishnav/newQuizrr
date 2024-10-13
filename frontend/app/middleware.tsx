// middleware.ts
import { withAuth } from 'next-auth/middleware';

export default withAuth({
    pages: {
        signIn: '/', // Redirect users to the landing page for sign in
    },
});

export const config = {
    matcher: ['/dashboard'], // Protect the /dashboard route
};
