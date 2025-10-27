import { Resume } from "../models/resume.model";
import openai from "../utils/ai";
import { Request, Response, NextFunction } from "express";

// Enhance professional summary
const enhanceProfessionalSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL!,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing.Your task is to enhance the professional summary of a resume.The summary should be 1-2 sentences also highlighting key skills, experience, and career objectives. Make it compelling and ATS-friendly. and only return text no options or anything else.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    // OpenAI Response
    const enhancedContent = completion.choices?.[0]?.message?.content;

    if (!enhancedContent) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate enhanced content",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Professional summary enhanced successfully",
      data: {
        original: userContent,
        enhanced: enhancedContent,
      },
    });
  } catch (error: any) {
    console.error("OpenAI API Error:", error);

    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        message: "Rate limit exceeded. Please try again later.",
      });
    }

    if (error.status === 401) {
      return res.status(500).json({
        success: false,
        message: "OpenAI API authentication failed",
      });
    }

    next(error);
  }
};

// Enhance job description
const enhanceJobDescription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL!,
      messages: [
        {
          role: "system",
          content:
            "You are an expert in resume writing. Your task is to enhance the job description of a resume. The job description should be 1-2 sentences, highlighting key responsibilities and achievements. Use action verbs and quantifiable results where possible. Make it ATS-friendly. Return only the rewritten description without extra options.",
        },
        {
          role: "user",
          content: userContent,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const enhancedContent = completion.choices?.[0]?.message?.content;

    if (!enhancedContent) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate enhanced content",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job description enhanced successfully",
      data: {
        original: userContent,
        enhanced: enhancedContent,
      },
    });
  } catch (error: any) {
    console.error("OpenAI API Error:", error);

    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        message: "Rate limit exceeded. Please try again later.",
      });
    }

    if (error.status === 401) {
      return res.status(500).json({
        success: false,
        message: "OpenAI API authentication failed",
      });
    }

    next(error);
  }
};

// Enhance upload resume
const uploadResume = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.user?._id;

    if (!resumeText || !title || !userId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: resumeText, title, or userId",
      });
    }

    const systemPrompt =
      "You are an expert AI Agent to extract data from resume.";

    const userPrompt = `extract data from this resume: ${resumeText}
    
    Provide data in the following JSON format with no additional text before or after:
    
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
  },
    `;

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL!,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 200,
    });

    const extractedData = completion.choices?.[0]?.message?.content;

    if (!extractedData) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate extractedData content",
      });
    }
    const parsedData = JSON.parse(extractedData);
    const newResume = await Resume.create({ userId, title, ...parsedData });
    res.status(200).json({ resumeId: newResume._id });
  } catch (error: any) {
    console.error("OpenAI API Error:", error);

    if (error.status === 429) {
      return res.status(429).json({
        success: false,
        message: "Rate limit exceeded. Please try again later.",
      });
    }

    if (error.status === 401) {
      return res.status(500).json({
        success: false,
        message: "OpenAI API authentication failed",
      });
    }

    next(error);
  }
};

export { enhanceProfessionalSummary, enhanceJobDescription, uploadResume };
