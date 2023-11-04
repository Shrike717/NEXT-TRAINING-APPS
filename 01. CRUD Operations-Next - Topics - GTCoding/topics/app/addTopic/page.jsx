export default function page() {
	return (
		<form className='flex flex-col gap-3'>
			<input
				className='border border-slate-500 px-8 py-2'
				type='text'
				placeholder='Topic Title'
			/>
			<input
				className='border border-slate-500 px-8 py-2'
				type='text'
				placeholder='Topic Description'
			/>
			<button className='w-fit bg-green-600 px-6  py-3 font-bold text-white'>
				Add Topic
			</button>
		</form>
	);
}
