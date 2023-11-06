// Here we write the CRUD operations for the Topic model:

import connectMongoDB from '@/libs/mongodb';
import Topic from '@/models/topic';
import { NextResponse } from 'next/server';

// Create a new topic:
export async function POST(request) {
	// Here we destructure the request. This is a promise therefore await
	const { title, description } = await request.json();

	// Here we connect to the MongoDB database:
	await connectMongoDB();
	// Here we create a new topic:
	await Topic.create({ title, description });
	// Here we return a NexResponse:
	return NextResponse.json({ message: 'Topic created' }, { status: 201 });
}

// Get all topics:
export async function GET() {
	// Here we connect to the MongoDB database:
	await connectMongoDB();
	// Here we get all topics:
	const topics = await Topic.find();
	// Here we return a NexResponse:
	return NextResponse.json({ topics }, { status: 200 });
}

// Delete a topic:
export async function DELETE(request) {
	// Here we destructure the id from searchParams. This is a promise therefore await
	const id = await request.nextUrl.searchParams.get('id');
	// console.log('[function DELETE] id:', id);

	// Here we connect to the MongoDB database:
	await connectMongoDB();
	// Here we delete a topic:
	await Topic.findByIdAndDelete(id);
	// Here we return a NexResponse:
	return NextResponse.json(
		{ message: 'Topic deleted' },
		{
			status: 200,
		}
	);
}
