import Link from 'next/link';

export default function Navbar() {
	return (
		<nav className='flex items-center justify-between bg-slate-800 px-8 py-3 '>
			<Link href={'/'} className='font-bold text-white'>
				GTCoding.
			</Link>
			<Link href={'/addTopic'} className='bg-white p-2 '>
				Add Topic
			</Link>
		</nav>
	);
}
