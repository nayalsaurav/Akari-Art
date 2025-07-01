import mongoose, { Schema, Document, Model } from "mongoose";

// Define an interface representing a document in MongoDB
export interface IPost extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  prompt: string;
  photo: string;
}

// Define the Schema
const PostSchema: Schema<IPost> = new Schema({
  name: {
    type: String,
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});

// Export the model
const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);
export default Post;
