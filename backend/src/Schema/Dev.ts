import { Schema, model, Document } from 'mongoose';

interface IDev extends Document {
  name: string;
  user: string;
  bio?: string;
  avatar: string;
  likes?: String[];
  dislikes?: String[];
}

const DevSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    },
    bio: String,
    avatar: {
      type: String,
      required: true
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Dev'
      }
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Dev'
      }
    ]
  },
  {
    timestamps: true
  }
);

export default model<IDev>('Dev', DevSchema);
