'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// This is  the page where we can add a new topic:
export default function AddTopic() {
	// State to extract the new topic data:
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	// console.log(title, description);

	// We need to use the router to re-route to the homepage:
	const router = useRouter();

	// Function to add the new topic to the database:
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title || !description) {
			alert('Title and Description are required');
			return;
		}
		try {
			// Here we are sending the data to the backend:
			const res = await fetch('http://localhost:3000/api/topics', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title,
					description,
				}),
			});
			// Then we re-route to the homepage:
			if (res.ok) {
				router.refresh('/'); // Daniel hack: This was me forcing the homepage to reload before we re-route to the homepage
				router.push('/');
			} else {
				throw new Error('Failed to create a topic');
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-3'>
			<input
				onChange={(e) => setTitle(e.target.value)}
				value={title}
				className='border border-slate-500 px-8 py-2'
				type='text'
				placeholder='Topic Title'
				required
				minlength='3'
			/>
			<input
				onChange={(e) => setDescription(e.target.value)}
				value={description}
				className='border border-slate-500 px-8 py-2'
				type='text'
				placeholder='Topic Description'
				required
				minlength='3'
			/>
			<button
				type='submit'
				className='w-fit bg-green-600 px-6  py-3 font-bold text-white'
			>
				Add Topic
			</button>
		</form>
	);
}
