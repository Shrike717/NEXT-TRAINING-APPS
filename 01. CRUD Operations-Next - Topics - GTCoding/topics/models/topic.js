// Here we define the Topic model:
import mongoose, { Schema } from 'mongoose';

const topicSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
	},

	{
		timestamps: true,
	}
);

// Here we create the Topic model. We check if we alrrady have a model called Topic, if not we create it.
const Topic = mongoose.models.Topic || mongoose.model('Topic', topicSchema);

// Here we export the Topic model:
export default Topic;
