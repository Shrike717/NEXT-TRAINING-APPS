import Link from 'next/link';
import RemoveBtn from './RemoveBtn';
import { HiPencilAlt } from 'react-icons/hi';

export default function TopicsList() {
	return (
		<>
			<div className='my-3 flex items-start justify-between gap-5 border border-slate-300 p-4'>
				<article>
					<h2 className='text-2xl font-bold'>Topic Title</h2>
					<p>Topic Description</p>
				</article>

				<div className='flex gap-2'>
					<RemoveBtn />
					<Link href={'/editTopic/123'}>
						<HiPencilAlt size={24} />
					</Link>
				</div>
			</div>
		</>
	);
}
