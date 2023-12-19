import { Prisma } from '@prisma/client';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { db } from './db';

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(db),
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
					type: 'text',
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
};
