import connectMongoDB from '@/libs/mongodb';
import Topic from '@/models/topic';
import { NextResponse } from 'next/server';

// Here we have the update function for a topic:
export async function PUT(request, { params }) {
	// Here we destruucture the id..
	const { id } = params;
	// Here we destructure the request. This is a promise therefore await
	const { newTitle: title, newDescription: description } =
		await request.json();

	// Here we connect to the MongoDB database:
	await connectMongoDB();
	// Here we update a topic:
	await Topic.findByIdAndUpdate(id, { title, description });
	// Here we return a NexResponse:
	return NextResponse.json({ message: 'Topic updated' }, { status: 200 });
}

// Here we get a single topic:
export async function GET(request, { params }) {
	// Here we destructure the id..
	const { id } = params;

	// Here we connect to the MongoDB database:
	await connectMongoDB();
	// Here we get a topic:
	const topic = await Topic.findOne({ _id: id });
	// Here we return a NexResponse:
	return NextResponse.json({ topic }, { status: 200 });
}
