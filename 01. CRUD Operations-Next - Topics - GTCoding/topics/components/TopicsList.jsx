import Link from 'next/link';
import RemoveBtn from './RemoveBtn';
import { HiPencilAlt } from 'react-icons/hi';

// Making the call to the API to get the topics:
const getTopics = async () => {
	try {
		const res = await fetch('http://localhost:3000/api/topics', {
			cache: 'no-store',
		});
		if (!res.ok) {
			throw new Error('Failed to fetch topics');
		}

		return res.json();
	} catch (error) {
		console.log('Error loading topics', error);
	}
};

export default async function TopicsList() {
	// Here we get all the topics from the database and display them:
	const { topics } = await getTopics();
	// console.log('[TopicsList] 2. topics:', topics);

	return (
		<>
			{topics.map((topic) => (
				<div
					key={topic._id}
					className='my-3 flex items-start justify-between gap-5 border border-slate-300 p-4'
				>
					<article>
						<h2 className='text-2xl font-bold'>{topic.title}</h2>
						<p>{topic.description}</p>
					</article>

					<div className='flex gap-2'>
						<RemoveBtn id={topic._id} />
						<Link href={`/editTopic/${topic._id}`}>
							<HiPencilAlt size={24} />
						</Link>
					</div>
				</div>
			))}
		</>
	);
}
