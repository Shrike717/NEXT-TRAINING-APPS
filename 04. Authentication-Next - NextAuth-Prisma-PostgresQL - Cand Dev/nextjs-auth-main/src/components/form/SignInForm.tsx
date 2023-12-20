'use client';

import { useEffect, useState } from 'react';
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
import { sign } from 'crypto';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

const FormSchema = z.object({
	email: z.string().min(1, 'Email is required').email('Invalid email'),
	password: z
		.string()
		.min(1, 'Password is required')
		.min(8, 'Password must have than 8 characters'),
});

const SignInForm = () => {
	// Router hook:
	const router = useRouter();
	const [isClient, setIsClient] = useState(false);
	const { toast } = useToast();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: '',
			password: '',
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
		// console.log(values);
		const signInData = await signIn('credentials', {
			email: values.email,
			password: values.password,
			redirect: false,
		}); // This signIn function is provided by next-auth

		if (signInData?.error) {
			toast({
				title: 'Error',
				description: 'Something went wrong',
				variant: 'destructive',
			});
		} else {
			// Refresh the admin page:
			router.refresh(); // This will refresh the page and the server will check if the user is logged in and redirect to the admin page
			router.push('/admin');
		}
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
				<div className='space-y-2'>
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
				</div>
				<Button className='w-full mt-6' type='submit'>
					Sign in
				</Button>
			</form>
			<div className='mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400'>
				or
			</div>
			<GoogleSignInButton>Sign in with Google</GoogleSignInButton>
			<p className='text-center text-sm text-gray-600 mt-2'>
				If you don&apos;t have an account, please&nbsp;
				<Link className='text-blue-500 hover:underline' href='/sign-up'>
					Sign up
				</Link>
			</p>
		</Form>
	);
};

export default SignInForm;
