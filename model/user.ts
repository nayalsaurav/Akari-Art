import mongoose, { Schema, Document, Model } from "mongoose";

// Define an interface representing a document in MongoDB
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  image?: string;
  emailVerified?: Date | null;
  provider?: "google" | "email";
}

// Define the Schema
const UserSchema: Schema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    emailVerified: { type: Date },
    provider: { type: String, enum: ["google", "email"] },
  },
  { timestamps: true }
);

// Export the model
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
