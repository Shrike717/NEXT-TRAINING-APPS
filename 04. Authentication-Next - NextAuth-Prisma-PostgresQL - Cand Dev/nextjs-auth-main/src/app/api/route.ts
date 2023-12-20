import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

// Test route to show ssion access
export const GET = async (req: Request) => {
	const session = await getServerSession(authOptions);
	console.log('[GET Route Handller] session: ', session);

	return NextResponse.json({ authenticated: !!session });
};
