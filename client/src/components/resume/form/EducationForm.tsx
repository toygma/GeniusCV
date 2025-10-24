import React from "react";
import type { Education } from "@/assets/assts";
import { GraduationCap, Plus, Trash2 } from "lucide-react";

interface EducationFormProps {
  data: Education[];
  onChange: (updated: Education[]) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ data, onChange }) => {
  const addEducation = () => {
    const newEducation: Education = {
      _id: crypto.randomUUID(),
      school: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (index: number) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateEducation = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Education
          </h3>
          <p className="text-sm text-gray-500">Add your educational background</p>
        </div>
        <button
          onClick={addEducation}
          type="button"
          className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Education
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No education added yet.</p>
          <p className="text-sm">Click “Add Education” to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((education, index) => (
            <div
              key={education._id || index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-semibold text-gray-800">
                  Education #{index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* Inputs */}
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="School / University"
                  value={education.school}
                  onChange={(e) =>
                    updateEducation(index, "school", e.target.value)
                  }
                  className="px-3 py-2 text-sm border rounded-lg w-full"
                />

                <input
                  type="text"
                  placeholder="Degree (e.g. Bachelor's, Master's)"
                  value={education.degree}
                  onChange={(e) =>
                    updateEducation(index, "degree", e.target.value)
                  }
                  className="px-3 py-2 text-sm border rounded-lg w-full"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Field of Study"
                  value={education.field}
                  onChange={(e) =>
                    updateEducation(index, "field", e.target.value)
                  }
                  className="px-3 py-2 text-sm border rounded-lg w-full"
                />

                <input
                  type="text"
                  placeholder="Location"
                  value={education.location}
                  onChange={(e) =>
                    updateEducation(index, "location", e.target.value)
                  }
                  className="px-3 py-2 text-sm border rounded-lg w-full"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="month"
                  placeholder="Start Date"
                  value={education.startDate}
                  onChange={(e) =>
                    updateEducation(index, "startDate", e.target.value)
                  }
                  className="px-3 py-2 text-sm border rounded-lg w-full"
                />

                <input
                  type="month"
                  placeholder="End Date"
                  value={education.endDate}
                  onChange={(e) =>
                    updateEducation(index, "endDate", e.target.value)
                  }
                  className="px-3 py-2 text-sm border rounded-lg w-full"
                />
              </div>

              <textarea
                placeholder="Description (optional)"
                value={education.description || ""}
                onChange={(e) =>
                  updateEducation(index, "description", e.target.value)
                }
                className="w-full px-3 py-2 text-sm border rounded-lg"
                rows={3}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm;
