import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { db } from 'src/lib/db';
import { CloudLightning } from 'lucide-react';
import * as z from 'zod';

// Define a schema for input validation
const userSchema = z.object({
	username: z.string().min(1, 'Username is required').max(100),
	email: z.string().min(1, 'Email is required').email('Invalid email'),
	password: z
		.string()
		.min(1, 'Password is required')
		.min(8, 'Password must have more  than 8 characters'),
});

// http://localhost:3000/api/user
export async function POST(req: Request) {
	try {
		const body = await req.json();
		const { username, email, password } = userSchema.parse(body);
		console.log(
			'[RouteHandler] POST /api/user username, email, password:',
			username,
			email,
			password
		);

		// Check if email already exists
		const existingUserByEmail = await db.user.findUnique({
			where: {
				email,
			},
		});
		if (existingUserByEmail) {
			return NextResponse.json({
				user: null,
				message: 'User with this email already exists',
				status: 409,
			});
		}

		// Check if username already exists
		const existingUserByUsername = await db.user.findUnique({
			where: {
				username,
			},
		});
		if (existingUserByUsername) {
			return NextResponse.json({
				user: null,
				message: 'User with this username already exists',
				status: 409,
			});
		}

		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// Create new user in database:
		const newUser = await db.user.create({
			data: {
				username,
				email,
				password: hashedPassword,
			},
		});

		// Ommitting password from response
		delete newUser.password;

		return NextResponse.json({
			user: newUser,
			message: 'User created successfully',
			status: 201,
		});
	} catch (error) {
		console.log(error);
		return NextResponse.json({
			user: null,
			message: 'Something went wrong',
			status: 500,
		});
	}
}
