import { Upload, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  uploadResumeSchema,
  type UploadResumeFormData,
} from "@/validation/upload.resume.schema";

interface Props {
  onClose: () => void;
  onSubmit: (data: UploadResumeFormData) => void;
}

const UploadResumeModal = ({ onClose, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UploadResumeFormData>({
    resolver: zodResolver(uploadResumeSchema),
  });

  const selectedFile = watch("file");
  const fileName = selectedFile?.[0]?.name;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur z-50 flex items-center justify-center p-4">
      <div
        className="relative bg-slate-50 shadow-2xl rounded-2xl w-full max-w-md p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          type="button"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-4">
            <Upload className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Upload Resume</h2>
          <p className="text-slate-600 mt-2">
            Upload your existing resume (PDF or Word)
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="upload-title"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Resume Title
            </label>
            <input
              {...register("title")}
              type="text"
              id="upload-title"
              placeholder="e.g., My Current Resume"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.title
                  ? "border-red-500 focus:ring-red-500"
                  : "border-slate-300 focus:ring-blue-500"
              } outline-none focus:ring-2 transition-all`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="file"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Resume File
            </label>
            <div className="relative">
              <input
                {...register("file")}
                type="file"
                id="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
              />
              <label
                htmlFor="file"
                className={`flex items-center justify-center w-full px-4 py-8 border-2 border-dashed ${
                  errors.file
                    ? "border-red-500 bg-red-50"
                    : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50"
                } rounded-lg cursor-pointer transition-all`}
              >
                <div className="text-center">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-600">
                    {fileName || "Click to upload or drag and drop"}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    PDF or Word (max 5MB)
                  </p>
                </div>
              </label>
            </div>
            {errors.file && (
              <p className="text-red-500 text-sm mt-1">
                {errors.file.message as string}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Uploading..." : "Upload Resume"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default UploadResumeModal;
