import { Request, Response, NextFunction } from "express";
import { Resume } from "../models/resume.model";
import { uploadToImageKit } from "../utils/imageKit";

/**
 * CREATE RESUME
 */
const createResume = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title } = req.body;
    const userId = req.user._id;

    const newResume = await Resume.create({ userId, title });

    return res.status(201).json({
      message: "Resume created successfully",
      resume: newResume,
    });
  } catch (error: any) {
    next(error);
  }
};

/**
 * GET USER RESUMES
 */
const getUserResume = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(400).json({ message: "userId not found" });
    }

    const resumes = await Resume.find({ userId });

    if (!resumes || resumes.length === 0) {
      return res.status(404).json({ message: "This user has no resumes" });
    }

    return res.status(200).json({
      resume: resumes,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * UPDATE RESUME
 */
const updateResume = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { resumeId } = req.params;
    const { resumeData } = req.body;
    const userId = req?.user?._id;
    const image = req.file;

    if (!resumeId) {
      return res.status(400).json({ message: "resumeId is required" });
    }



    let imageUrl: string | undefined = undefined;
    if (image) {
      try {
        const base64Image = image.buffer.toString("base64");
        const fileName = `resume-${resumeId}-${Date.now()}-${
          image.originalname
        }`;
        const uploadResult = await uploadToImageKit(
          base64Image,
          fileName,
        );
        imageUrl = uploadResult.url;
      } catch (uploadError: any) {
        return res.status(500).json({
          message: "Image upload failed",
          error: uploadError.message,
        });
      }
    }

    const updateData = {
      ...resumeData, 
      ...(imageUrl && { "personal_info.image": imageUrl }), 
      updatedAt: new Date(),
    };

    const updatedResume = await Resume.findOneAndUpdate(
      { _id: resumeId, userId },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Resume updated successfully",
      resume: updatedResume,
    });
  } catch (error: any) {
    console.error("❌ updateResume error:", error);
    next(error);
  }
};

/**
 * DELETE RESUME
 */
const deleteResume = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { resumeId } = req.params;

    if (!resumeId) {
      return res.status(400).json({ message: "resumeId is required" });
    }

    const deletedResume = await Resume.findByIdAndDelete(resumeId);

    if (!deletedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error: any) {
    next(error);
  }
};

export default {
  deleteResume,
  updateResume,
  getUserResume,
  createResume,
};
