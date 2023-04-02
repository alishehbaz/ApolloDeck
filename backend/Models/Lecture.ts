import { Schema, model, connect } from "mongoose";

// 1. Create an interface representing a document in MongoDB.
export interface ILecture {
  lectureId: string;
  title: string;
  courseId: string;
  course: string;
  status: string;
  hasNFT: boolean;
  slidesURL: string;
}

// 2. Create a Schema corresponding to the document interface.
export const lectureSchema = new Schema<ILecture>({
  lectureId: { type: String, required: true },
  title: { type: String, required: true },
  courseId: { type: String, required: true },
  course: { type: String, required: true },
  status: { type: String, required: true },
  hasNFT: { type: Boolean, required: true },
  slidesURL: { type: String, required: true },
});
