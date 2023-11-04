// This is the code to connect to the MongoDB database:
import mongoose from 'mongoose';

const connectMongoDB = async () => {
	//
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log('Connected to MongoDB');
	} catch (error) {
		console.log(error);
	}
};
export default connectMongoDB;
