import mongoose, { Schema } from "mongoose";
import { IResume } from "../types/resume.types";

const ResumeSchema = new Schema<IResume>(
  {
    title: { type: String, default: "" },
    personal_info: {
      userId: { type: String },
      title: { type: String, default: "" },
      fullname: { type: String, default: "" },
      email: { type: String, default: "" },
      phone: { type: String, default: "" },
      location: { type: String, default: "" },
      profession: { type: String, default: "" },
    },
    experience: [
      {
        company: { type: String },
        position: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        description: { type: String },
      },
    ],
    education: [
      {
        school: { type: String },
        degree: { type: String },
        fieldOfStudy: { type: String },
        startDate: { type: String },
        endDate: { type: String },
        description: { type: String },
      },
    ],
    projects: [
      {
        name: { type: String },
        description: { type: String },
        link: { type: String },
        technologies: [{ type: String }],
      },
    ],
    summary: { type: String, default: "" },
    skills: { type: [String], default: [] },
    template: { type: String, default: "classic" },
    accent_color: { type: String, default: "#3B82F6" },
    public: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Resume =
  mongoose.models.Resume || mongoose.model<IResume>("Resume", ResumeSchema);
