import EditTopicForm from '@/components/EditTopicForm';

// this function hits the controller action to fetch a single topic:
const getTopicById = async (id) => {
	try {
		// check: How do i know this hits the GET single topic action?
		const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
			cache: 'no-store',
		});

		if (!res.ok) {
			throw new Error('Failed to fetch topic');
		}

		return res.json();
	} catch (error) {
		console.log(error);
	}
};

export default async function EditTopic({ params }) {
	// We destructure the id from params:
	const { id } = params;
	// console.log('[EditTopic] id:', id);

	// Here we fetch a single topic:
	const { topic } = await getTopicById(id);
	// Then  we get title and description from topic:
	const { title, description } = topic;

	// Then we pass the id, title and description to the EditTopicForm:
	return <EditTopicForm id={id} title={title} description={description} />;
}
