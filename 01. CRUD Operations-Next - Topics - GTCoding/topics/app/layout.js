import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<div className='mx-auto max-w-3xl p-4'>
					<Navbar />
					<div className='mt-8'>{children}</div>
				</div>
			</body>
		</html>
	);
}
