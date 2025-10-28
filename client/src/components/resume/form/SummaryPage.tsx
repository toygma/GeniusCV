import { Subscript } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

// Define the schema
const personalInfoSchema = z.object({
  summary: z.string().min(10, "Summary must be at least 10 characters"),
});

type PersonalInfoSchema = z.infer<typeof personalInfoSchema>;

interface Props {
  data: string | undefined;
  onChange: (data: string) => void;
}

const SummaryPage = ({ data, onChange }: Props) => {
  const {
    register,
    formState: { errors },
  } = useForm<PersonalInfoSchema>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      summary: data || "",
    },
    mode: "onChange",
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <div className="space-y-2">
      <label
        htmlFor="summary"
        className="block text-sm font-medium text-gray-700"
      >
        Professional Summary
      </label>
      <div className="relative">
        <Subscript className="absolute left-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
        <textarea
          {...register("summary")}
          id="summary"
          rows={5}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Write a brief professional summary highlighting your key skills and experience..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
        />
      </div>
      {errors.summary?.message && (
        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
          <span className="inline-block w-1 h-1 bg-red-500 rounded-full" />
          {errors.summary.message}
        </p>
      )}
      <p className="text-xs text-gray-500">
        Tip: Include your years of experience, key skills, and career goals
      </p>
    </div>
  );
};

export default SummaryPage;
