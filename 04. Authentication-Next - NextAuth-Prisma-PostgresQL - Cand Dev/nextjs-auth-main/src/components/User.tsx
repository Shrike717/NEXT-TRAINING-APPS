'use client';

import { useSession } from 'next-auth/react';

const User = () => {
	// Accessing the client side session object
	const { data: session } = useSession();
	return <pre>{JSON.stringify(session)}</pre>;
};

export default User;
