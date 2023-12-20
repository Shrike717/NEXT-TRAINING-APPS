import { Prisma } from '@prisma/client';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from './db';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(db),
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/sign-in',
	},
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. "Sign in with...")
			name: 'Credentials',

			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'Your email',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials.email || !credentials.password) {
					return null;
				}
				// Check if user exists
				const existingUser = await db.user.findUnique({
					where: {
						email: credentials?.email,
					},
				});
				if (!existingUser) {
					return null;
				}

				// Check if password is correct
				const isPasswordCorrect = await bcrypt.compare(
					credentials.password,
					existingUser.password
				);
				if (!isPasswordCorrect) {
					return null;
				}

				// Return user object
				return {
					id: existingUser.id + '', // Sets id to string
					email: existingUser.email,
					username: existingUser.username,
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			// Passing the username to the token right after signin
			if (user) {
				return {
					...token,
					username: user.username,
				};
			}
			return token;
		},
		async session({ session, token }) {
			// Setting the username from the token to the session
			return {
				...session,
				user: {
					...session.user,
					username: token.username,
				},
			};
		},
	},
};
