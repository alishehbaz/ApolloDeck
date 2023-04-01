import { Schema, model, connect } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface ILecture {
    path: string;
    course: string;
    tone?: string;
    reminder?: boolean;
    mintAsNFT?: boolean;
    IPFS?:boolean;
  }
  
// 2. Create a Schema corresponding to the document interface.
export const lectureSchema = new Schema<ILecture>({
    path: { type: String, required: true },
    course: { type: String, required: true },
    tone: String,
    reminder: Boolean,
    mintAsNFT: Boolean,
    IPFS: Boolean,
  });