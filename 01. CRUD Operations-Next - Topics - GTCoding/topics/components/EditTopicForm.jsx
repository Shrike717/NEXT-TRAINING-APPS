'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditTopicForm({ id, title, description }) {
	// State for title and description. Old values are populated as deefault values:
	const [newTitle, setNewTitle] = useState(title);
	const [newDescription, setNewDescription] = useState(description);

	// Here we get the router:
	const router = useRouter();

	// Here we create a function that handles the submit:
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			// Here we fetch the PUT action:
			const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ newTitle, newDescription }),
			});

			if (!res.ok) {
				throw new Error('Failed to update topic');
			}

			// Here we destructure the success message from the response and show it in an alert:
			const { message } = await res.json();
			alert(message);

			// Here we refresh the home page:
			router.refresh();
			// Here we redirect to the homepage:
			router.push('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={handleSubmit} className='flex flex-col gap-3'>
			<input
				onChange={(e) => setNewTitle(e.target.value)}
				value={newTitle}
				className='border border-slate-500 px-8 py-2'
				type='text'
				placeholder='Topic Title'
			/>
			<input
				onChange={(e) => setNewDescription(e.target.value)}
				value={newDescription}
				className='border border-slate-500 px-8 py-2'
				type='text'
				placeholder='Topic Description'
			/>
			<button className='w-fit bg-green-600 px-6 py-3 font-bold text-white'>
				Update Topic
			</button>
		</form>
	);
}
