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
    const {
      title,
      personal_info,
      experience,
      education,
      projects,
      summary,
      skills,
      template,
      accent_color,
      public: isPublic,
    } = req.body;

    if (!personal_info || !personal_info.userId) {
      return res
        .status(400)
        .json({ message: "personal_info.userId is required" });
    }

    const newResume = new Resume({
      title: title || "",
      personal_info: {
        userId: personal_info.userId,
        title: personal_info.title || "",
        fullname: personal_info.fullname || "",
        email: personal_info.email || "",
        phone: personal_info.phone || "",
        location: personal_info.location || "",
        profession: personal_info.profession || "",
      },
      experience: experience || [],
      education: education || [],
      projects: projects || [],
      summary: summary || "",
      skills: skills || [],
      template: template || "classic",
      accent_color: accent_color || "#3B82F6",
      public: typeof isPublic === "boolean" ? isPublic : false,
    });

    const savedResume = await newResume.save();

    return res.status(201).json({
      message: "Resume created successfully",
      resume: savedResume,
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

    const resumes = await Resume.find({ "personal_info.userId": userId });

    if (!resumes || resumes.length === 0) {
      return res.status(404).json({ message: "This user has no resumes" });
    }

    return res.status(200).json(resumes);
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
    const { removeBackground } = req.body;
    const userId = req?.user?._id;
    const image = req.file;

    if (!resumeId) {
      return res.status(400).json({ message: "resumeId is required" });
    }

    // Resim varsa ImageKit'e yükle
    let imageUrl = undefined;
    if (image) {
      try {
        const base64Image = image.buffer.toString("base64");
        const fileName = `resume-${resumeId}-${Date.now()}-${
          image.originalname
        }`;

        const uploadResult = await uploadToImageKit(
          base64Image,
          fileName,
          removeBackground
        );
        imageUrl = uploadResult.url;

        console.log("Image uploaded to ImageKit:", imageUrl);
      } catch (uploadError: any) {
        console.error("ImageKit upload error:", uploadError);
        return res.status(500).json({
          message: "Image upload failed",
          error: uploadError.message,
        });
      }
    }

    // Update verisini hazırla
    const updateData = {
      ...req.body,
      ...(imageUrl && { image: imageUrl }),
    };

    const updatedResume = await Resume.findByIdAndUpdate(
      resumeId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedResume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({
      message: "Resume updated successfully",
      resume: updatedResume,
    });
  } catch (error: any) {
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
