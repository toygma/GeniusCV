import { useEnhanceJobDescriptionMutation } from "@/app/api/ai-api";
import type { Experience } from "@/assets/assts";
import { Briefcase, Plus, Sparkles, Trash2 } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface ExperienceFormProps {
  data: Experience[];
  onChange: (updated: Experience[]) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, onChange }) => {
  const [enhanceJobDescription, { isLoading }] = useEnhanceJobDescriptionMutation();
  const [generatingIndex, setGeneratingIndex] = useState<number | null>(null);

  const addExperience = () => {
    const newExperience: Experience = {
      _id: Date.now(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
      current: false,
    };

    onChange([...data, newExperience]);
  };

  const removeExperience = (index: number) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (
    index: number,
    field: keyof Experience,
    value: string | boolean
  ) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const generateEnhancedDescription = async (index: number) => {
    const experience = data[index];
    
    if (!experience.description || experience.description.trim() === "") {
      toast.error("Please enter a description first");
      return;
    }

    try {
      setGeneratingIndex(index);
      
      const prompt = `Enhance this job description for ${experience.position} at ${experience.company}: ${experience.description}`;
      
      const response = await enhanceJobDescription({
        userContent: prompt,
      }).unwrap();

      const enhancedContent = response?.enhanced || response?.enhancedContent || response?.data?.enhanced;
      
      if (enhancedContent) {
        updateExperience(index, "description", enhancedContent);
        toast.success("Description enhanced successfully! 🎉");
      } else {
        toast.error("Failed to enhance description");
      }
    } catch (error: any) {
      console.error("Error enhancing description:", error);
      toast.error(
        error?.data?.message || error.message || "Failed to enhance description"
      );
    } finally {
      setGeneratingIndex(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Experience
          </h3>
          <p className="text-sm text-gray-500">
            Add your professional work experience
          </p>
        </div>
        <button
          onClick={addExperience}
          type="button"
          className="flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No work experience added yet.</p>
          <p className="text-sm">Click "Add Experience" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div
              key={experience._id || index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-semibold text-gray-800">
                  Experience #{index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* Input Fields */}
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={experience.company}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  className="px-3 py-2 text-sm border rounded-lg w-full"
                />

                <input
                  type="text"
                  placeholder="Position"
                  value={experience.position}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  className="px-3 py-2 text-sm border rounded-lg w-full"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Location"
                  value={experience.location}
                  onChange={(e) =>
                    updateExperience(index, "location", e.target.value)
                  }
                  className="px-3 py-2 text-sm border rounded-lg w-full"
                />

                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-600">
                    Currently Working
                  </label>
                  <input
                    type="checkbox"
                    checked={experience.current || false}
                    onChange={(e) =>
                      updateExperience(index, "current", e.target.checked)
                    }
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="month"
                  placeholder="Start Date"
                  value={experience.startDate}
                  onChange={(e) =>
                    updateExperience(index, "startDate", e.target.value)
                  }
                  className="px-3 py-2 text-sm border rounded-lg w-full"
                />
                {!experience.current && (
                  <input
                    type="month"
                    placeholder="End Date"
                    value={experience.endDate}
                    onChange={(e) =>
                      updateExperience(index, "endDate", e.target.value)
                    }
                    className="px-3 py-2 text-sm border rounded-lg w-full"
                  />
                )}
              </div>

              <textarea
                placeholder="Description"
                value={experience.description}
                onChange={(e) =>
                  updateExperience(index, "description", e.target.value)
                }
                className="w-full px-3 py-2 text-sm border rounded-lg"
                rows={3}
              />

              <button
                type="button"
                onClick={() => generateEnhancedDescription(index)}
                disabled={isLoading && generatingIndex === index}
                className="flex items-center cursor-pointer gap-1 px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-3 h-3" />
                {isLoading && generatingIndex === index
                  ? "Enhancing..."
                  : "Enhance with AI"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;