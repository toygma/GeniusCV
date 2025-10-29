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
    const userId = req?.user?._id;
    const image = req.file;

    if (!resumeId) {
      return res.status(400).json({ message: "resumeId is required" });
    }

    const resumeData = JSON.parse(req.body.resumeData);

    let imageUrl: string | undefined;
    if (image) {
      const base64Image = image.buffer.toString("base64");
      const fileName = `resume-${resumeId}-${Date.now()}-${image.originalname}`;
      const uploadResult = await uploadToImageKit(base64Image, fileName);
      imageUrl = uploadResult.url;
    }

    // Prepare update object
    const update: any = {
      title: resumeData.title,
      summary: resumeData.summary,
      experience: resumeData.experience,
      education: resumeData.education,
      projects: resumeData.projects,
      skills: resumeData.skills,
      template: resumeData.template,
      accent_color: resumeData.accent_color,
      public: resumeData.public,
      updatedAt: new Date(),
    };

    // Sadece personal_info varsa ekle
    if (resumeData.personal_info) {
      if (resumeData.personal_info.fullname !== undefined) {
        update["personal_info.fullname"] = resumeData.personal_info.fullname;
      }
      if (resumeData.personal_info.profession !== undefined) {
        update["personal_info.profession"] = resumeData.personal_info.profession;
      }
      if (resumeData.personal_info.email !== undefined) {
        update["personal_info.email"] = resumeData.personal_info.email;
      }
      if (resumeData.personal_info.phone !== undefined) {
        update["personal_info.phone"] = resumeData.personal_info.phone;
      }
      if (resumeData.personal_info.location !== undefined) {
        update["personal_info.location"] = resumeData.personal_info.location;
      }
      if (resumeData.personal_info.title !== undefined) {
        update["personal_info.title"] = resumeData.personal_info.title;
      }
    }

    // Eğer yeni image varsa
    if (imageUrl) {
      update["personal_info.image"] = imageUrl;
    }

    const updatedResume = await Resume.findOneAndUpdate(
      { _id: resumeId, userId },
      { $set: update },
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
