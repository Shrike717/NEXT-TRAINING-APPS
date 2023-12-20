'use client';

import { useForm } from 'react-hook-form';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import Link from 'next/link';
import GoogleSignInButton from '../GoogleSignInButton';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const FormSchema = z
	.object({
		username: z.string().min(1, 'Username is required').max(100),
		email: z.string().min(1, 'Email is required').email('Invalid email'),
		password: z
			.string()
			.min(1, 'Password is required')
			.min(8, 'Password must have at least 8 characters'),
		confirmPassword: z.string().min(1, 'Password confirmation is required'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'Password do not match',
	});

const SignUpForm = () => {
	// Router hook:
	const router = useRouter();
	const [isClient, setIsClient] = useState(false);
	const { toast } = useToast();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	//  This is a custom hook that will only run on the client side
	// It prevents the form from rendering on the server side and causing an error caused by two diferent HTML versions
	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!isClient) {
		return null;
	}

	const onSubmit = async (values: z.infer<typeof FormSchema>) => {
		console.log('[SignUpForm Component] onSubmit', values);

		// Send a POST request to the POST handler on the server. The server will create a new user in the database.
		const response = await fetch('/api/user', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: values.username,
				email: values.email,
				password: values.password,
			}),
		});

		if (response.ok) {
			// After successful sign up, redirect to sign in page:
			router.push('/sign-in');
		} else {
			toast({
				title: 'Error',
				description: 'Registration failed',
				variant: 'destructive',
			});
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
				<div className='space-y-2'>
					<FormField
						control={form.control}
						name='username'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder='johndoe' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder='mail@example.com'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										type='password'
										placeholder='Enter your password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='confirmPassword'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Re-Enter your password</FormLabel>
								<FormControl>
									<Input
										placeholder='Re-Enter your password'
										type='password'
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button className='w-full mt-6' type='submit'>
					Sign up
				</Button>
			</form>
			<div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
				or
			</div>
			<GoogleSignInButton>Sign up with Google</GoogleSignInButton>
			<p className='text-center text-sm text-gray-600 mt-2'>
				If you don&apos;t have an account, please&nbsp;
				<Link className='text-blue-500 hover:underline' href='/sign-in'>
					Sign in
				</Link>
			</p>
		</Form>
	);
};

export default SignUpForm;
