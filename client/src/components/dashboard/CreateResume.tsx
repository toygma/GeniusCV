import { FileText, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createResumeSchema,
  type CreateResumeFormData,
} from "@/validation/create.resume.schema";

interface Props {
  onClose: () => void;
  onSubmit: (data: CreateResumeFormData) => void;
  resume?: string;
}

const CreateResumeModal = ({ onClose, onSubmit, resume }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateResumeFormData>({
    resolver: zodResolver(createResumeSchema),
    defaultValues: { title: resume || "" },
  });

  const handleFormSubmit = (data: CreateResumeFormData) => {
    onSubmit(data);
  };
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
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">
            {resume ? "Edit Resume" : "Create Resume"}
          </h2>
          <p className="text-slate-600 mt-2">
            {resume
              ? "Update the title of your resume"
              : "Give your resume a title to get started"}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Resume Title
            </label>
            <input
              {...register("title")}
              type="text"
              id="title"
              placeholder="e.g., Software Engineer Resume"
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.title
                  ? "border-red-500 focus:ring-red-500"
                  : "border-slate-300 focus:ring-purple-500"
              } outline-none focus:ring-2 transition-all`}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? resume
                ? "Updating..."
                : "Creating..."
              : resume
              ? "Update Resume"
              : "Create Resume"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateResumeModal;
