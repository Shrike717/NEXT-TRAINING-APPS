'use client';

import { HiOutlineTrash } from 'react-icons/hi';
import { useRouter } from 'next/navigation';

export default function RemoveBtn({ id }) {
	const router = useRouter();
	// This function will delete the topic from the database:
	const removeTopic = async () => {
		const confirmed = confirm(
			'Are you sure you want to delete this topic?'
		);

		// Delete the topic from the database:
		if (confirmed) {
			const res = await fetch(
				`http://localhost:3000/api/topics?id=${id}`,
				{
					method: 'DELETE',
				}
			);
			if (res.ok) {
				// Then we refresh the homepage again:
				router.refresh();
			}
		}
	};
	return (
		<button onClick={removeTopic} className='text-red-400'>
			<HiOutlineTrash size={24} />
		</button>
	);
}
