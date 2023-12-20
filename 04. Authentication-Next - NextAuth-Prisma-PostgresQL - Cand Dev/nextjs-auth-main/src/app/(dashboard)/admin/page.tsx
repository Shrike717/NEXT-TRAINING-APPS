import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

const page = async () => {
	// Access a session from a server component:
	const session = await getServerSession(authOptions);
	console.log('[Admin Server Component] session:', session);

	// Check if there is a session and it is still valid
	if (session?.user) {
		return (
			<h2 className='text-2xl'>
				Admin Page - Welcome back {session?.user.username}
			</h2>
		);
	} else {
		return (
			<h2 className='text-2xl'>Please login to see this Admin Page</h2>
		);
	}
};

export default page;
