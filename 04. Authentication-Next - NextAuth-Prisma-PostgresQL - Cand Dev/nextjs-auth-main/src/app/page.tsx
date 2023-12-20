import User from '@/components/User';
import { buttonVariants } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import Link from 'next/link';

export default async function Home() {
	const session = await getServerSession();
	return (
		<div>
			<h1 className='text-4xl'>Home</h1>
			<Link className={buttonVariants()} href='/admin'>
				Open my Admin Page
			</Link>
			<div className='flex flex-col gap-1 pt-4'>
				<h2 className='text-lg'>Client Session:</h2>
				<User />
				<h2 className='text-lg'>Server Session:</h2>
				{JSON.stringify({ session })}
			</div>
		</div>
	);
}
