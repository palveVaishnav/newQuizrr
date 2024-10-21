import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions } from 'next-auth';
import axios from 'axios';

export const NEXT_AUTH_CONFIG: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async jwt({ token, account, profile }) {
            // Check if the account and profile are available during the sign-in process
            if (account && profile) {
                // Store the Google user ID and other profile information in the token
                token.id = profile.sub;
                token.email = profile.email;
                token.name = profile.name;
                token.picture = profile.image;
                try {
                    const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/user`, {
                        providerId: profile.sub,
                        email: profile.email,
                        name: profile.name,
                        picture: profile.image,
                    })
                    const user = res.data
                    console.log(user)
                    // Add to atom. 
                } catch (error) {
                    console.log("Request me kuch dikkat hai: ", error)
                }
            }
            return token;
        },

        async session({ session, token }) {
            // Check if session.user exists
            if (session.user) {
                // Store the Google ID, email, name, and picture in the session object
                session.user.email = token.email;
                session.user.name = token.name;
                session.user.image = token.picture;
            }
            return session;
        },

        async redirect() {
            return '/home'; //  after successful login
        },
    },
};
