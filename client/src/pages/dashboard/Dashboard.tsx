import {
  useCreateResumeMutation,
  useDeleteResumeMutation,
  useGetUserResumesQuery,
  useUpdateResumeMutation,
} from "@/app/api/resume-api";
import { useUploadResumeMutation } from "@/app/api/ai-api";
import type { Resume } from "@/assets/assts";
import CreateResumeModal from "@/components/dashboard/CreateResume";
import UploadResumeModal from "@/components/dashboard/UploadResume";
import type { CreateResumeFormData } from "@/validation/create.resume.schema";
import type { UploadResumeFormData } from "@/validation/upload.resume.schema";
import {
  FileText,
  Upload,
  Sparkles,
  ArrowRight,
  Clock,
  Edit,
  Trash,
  Loader2,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import pdfToText from "react-pdftotext";

const Dashboard = () => {
  const navigate = useNavigate();

  // RTK Query hooks
  const [
    createResume,
    { error: CreateError, isSuccess: CreateSuccess, isLoading: isCreating },
  ] = useCreateResumeMutation();

  const [
    uploadResume,
    { error: UploadError, isSuccess: UploadSuccess, isLoading: isUploading },
  ] = useUploadResumeMutation();

  const [updateResume, { error: UpdateError, isSuccess: UpdateSuccess }] =
    useUpdateResumeMutation();

  const [deleteResume, { isLoading: isDeleting }] = useDeleteResumeMutation();

  const {
    data: getUserResume,
    isLoading: isLoadingResumes,
    refetch,
  } = useGetUserResumesQuery();

  const colors = [
    "from-purple-500 to-pink-500",
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-purple-500",
    "from-teal-500 to-green-500",
  ];

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [editingResume, setEditingResume] = useState("");

  const allResumes = getUserResume?.resume || [];

  useEffect(() => {
    if (CreateSuccess) {
      toast.success("Resume created successfully! 🎉");
    } else if (CreateError && "data" in CreateError) {
      toast.error(
        (CreateError as any)?.data?.message || "Failed to create resume!"
      );
    }

    if (UploadSuccess) {
      toast.success("Resume uploaded successfully! 🎉");
    } else if (UploadError && "data" in UploadError) {
      toast.error(
        (UploadError as any)?.data?.message || "Failed to upload resume!"
      );
    }

    if (UpdateSuccess) {
      toast.success("Resume update successfully! 🎉");
    } else if (UpdateError && "data" in UpdateError) {
      toast.error(
        (UpdateError as any)?.data?.message || "Failed to update resume!"
      );
    }
  }, [
    CreateSuccess,
    CreateError,
    UploadError,
    UploadSuccess,
    UpdateError,
    UpdateSuccess,
  ]);

  const handleCreateResume = async (data: CreateResumeFormData) => {
    try {
      const result = await createResume({
        title: data.title,
      }).unwrap();

      setShowCreateModal(false);
      setEditingResume("");

      navigate(`/builder/${result?.resume?._id}`);
    } catch (error: any) {
      console.error("Error creating resume:", error);
    }
  };

  const handleUploadResume = async (data: UploadResumeFormData) => {
    try {
      if (!data.file) {
        toast.error("Please select a file");
        return;
      }

      const resumeText = await pdfToText(data.file[0]);

      if (!resumeText || resumeText.trim() === "") {
        toast.error("Could not extract text from PDF");
        return;
      }

      const result = await uploadResume({
        title: data.title || "Uploaded Resume",
        resumeText: resumeText,
      }).unwrap();

      setShowUploadModal(false);
      navigate(`/builder/${result?.resumeId}`);
    } catch (error: any) {
      console.error("Error uploading resume:", error);
      toast.error(error?.message || "Failed to upload resume");
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleDeleteResume = async (id: string) => {
    if (!confirm("Are you sure you want to delete this resume?")) return;

    try {
      await deleteResume(id).unwrap();
      toast.success("Resume deleted successfully!");
      await refetch();
    } catch (error: any) {
      console.error("Error deleting resume:", error);
      toast.error(error?.data?.message || "Failed to delete resume");
    }
  };

  const handleEditResume = async (id: string, updatedData: any) => {
    try {
      const formData = new FormData();

      formData.append("resumeData", JSON.stringify(updatedData));

      if (updatedData.image instanceof File) {
        formData.append("image", updatedData.image);
      }

      const result = await updateResume({
        resumeId: id,
        formData: formData,
      }).unwrap();

      setShowCreateModal(false);
      setEditingResume("");

      if (result?.resume?._id) {
        navigate(`/builder/${result.resume._id}`);
      } else {
        toast.error("Resume updated but ID not found");
      }
    } catch (error: any) {
      console.error("Error updating resume:", error);
      toast.error(error?.data?.message || "Failed to update resume");
    }
  };

  const handleCreateNew = () => {
    setEditingResume("");
    setShowCreateModal(true);
  };

  const closeModal = () => {
    setEditingResume("");
    setShowCreateModal(false);
  };
  const getImageUrl = (
    image: string | File | undefined
  ): string | undefined => {
    if (!image) return undefined;

    if (image instanceof File) {
      return URL.createObjectURL(image);
    }

    // If it's already a string URL
    return image;
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 backdrop-blur-sm border border-purple-500/20 rounded-full px-6 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">
              AI-Powered Resume Builder
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Create Your Perfect Resume
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Build a professional resume in minutes or upload your existing one
            to get started
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Create Resume Card */}
          <button
            onClick={handleCreateNew}
            disabled={isCreating}
            className="group relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-lg border border-purple-500/20 rounded-3xl p-8 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 transition-all duration-300 rounded-3xl"></div>

            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {isCreating ? (
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                ) : (
                  <FileText className="w-8 h-8 text-white" />
                )}
              </div>

              <h2 className="text-3xl font-bold text-white mb-3">
                Create New Resume
              </h2>

              <p className="text-slate-300 mb-6 leading-relaxed">
                Start from scratch with our intuitive builder. Choose from
                professional templates and let AI help you craft the perfect
                resume.
              </p>

              <div className="flex items-center gap-2 text-purple-400 font-semibold group-hover:gap-4 transition-all duration-300">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>

            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
          </button>

          {/* Upload Resume Card */}
          <button
            onClick={() => setShowUploadModal(true)}
            disabled={isUploading}
            className="group relative bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-lg border border-blue-500/20 rounded-3xl p-8 hover:scale-105 transition-all duration-300 cursor-pointer overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed text-left"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-cyan-600/0 group-hover:from-blue-600/10 group-hover:to-cyan-600/10 transition-all duration-300 rounded-3xl"></div>

            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {isUploading ? (
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                ) : (
                  <Upload className="w-8 h-8 text-white" />
                )}
              </div>

              <h2 className="text-3xl font-bold text-white mb-3">
                Upload Existing Resume
              </h2>

              <p className="text-slate-300 mb-6 leading-relaxed">
                Already have a resume? Upload it and we'll help you improve,
                format, and optimize it for better results.
              </p>

              <div className="flex items-center gap-2 text-blue-400 font-semibold group-hover:gap-4 transition-all duration-300">
                <span>Upload File</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>

            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
          </button>
        </div>

        {/* My Resumes Section */}
        {isLoadingResumes ? (
          <div className="mt-20 flex justify-center">
            <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
          </div>
        ) : allResumes.length > 0 ? (
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              My Resumes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {allResumes.map((resume: Resume, index: number) => {
                const baseColor = colors[index % colors.length];
                return (
                  <div
                    key={resume?._id}
                    className="group relative bg-slate-800/50 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-6 hover:scale-105 transition-all duration-300 overflow-hidden"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${baseColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    ></div>

                    <div className="relative z-10">
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className={`w-12 h-12 bg-gradient-to-br ${baseColor} rounded-full flex items-center justify-center flex-shrink-0`}
                        >
                          {resume?.personal_info?.image ? (
                            <img
                              src={getImageUrl(resume?.personal_info?.image) || ""}
                              alt={resume?.personal_info?.fullname || "Resume"}
                              className="w-full h-full rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-white font-bold text-lg">
                              {resume?.personal_info?.fullname?.charAt(0) ||
                                "R"}
                            </span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-semibold text-lg truncate mb-1">
                            {resume?.personal_info?.fullname ||
                              "Untitled Resume"}
                          </h3>
                          <p className="text-slate-400 text-sm truncate">
                            {resume?.personal_info?.profession ||
                              "No profession"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                        <div className="flex items-center gap-2 text-slate-400 text-xs">
                          <Clock className="w-3 h-3" />
                          <span>{formatDate(resume?.updatedAt as string)}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingResume(resume?._id);
                              setShowCreateModal(true);
                            }}
                            className="flex items-center gap-2 text-purple-400 text-sm font-medium hover:text-blue-300 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                            <span>Edit</span>
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteResume(resume?._id);
                            }}
                            disabled={isDeleting}
                            className="flex items-center gap-2 text-purple-400 text-sm font-medium hover:text-red-300 transition-colors disabled:opacity-50"
                          >
                            {isDeleting ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash className="w-4 h-4" />
                            )}
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mt-20 text-center">
            <p className="text-slate-400 text-lg">
              You don't have any resumes yet. Create your first one!
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreateResumeModal
          onClose={closeModal}
          onSubmit={
            editingResume
              ? (data) => handleEditResume(editingResume, data)
              : handleCreateResume
          }
          initialData={
            editingResume
              ? allResumes.find((r: any) => r._id === editingResume)
              : null
          }
        />
      )}

      {showUploadModal && (
        <UploadResumeModal
          onClose={() => setShowUploadModal(false)}
          onSubmit={handleUploadResume}
        />
      )}
    </div>
  );
};

export default Dashboard;
