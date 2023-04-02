import { Schema, model, connect } from "mongoose";

export interface ICourse {
  courseId: string;
  course: string;
  numLectures: number;
}

export const courseSchema = new Schema<ICourse>({
  courseId: { type: String, required: true },
  course: { type: String, required: true },
  numLectures: { type: Number, required: true },
});
