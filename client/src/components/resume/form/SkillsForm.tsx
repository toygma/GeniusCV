import React from "react";
import type { Skill } from "@/assets/assts";
import { Wrench, Plus, Trash2 } from "lucide-react";

interface SkillsFormProps {
  data: Skill[];
  onChange: (updated: Skill[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data, onChange }) => {
  const addSkill = () => {
    const newSkill: Skill = {
      _id: crypto.randomUUID(),
      name: "",
      level: "",
      category: "",
    };
    onChange([...data, newSkill]);
  };

  const removeSkill = (index: number) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateSkill = (index: number, field: keyof Skill, value: string) => {
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
            Skills
          </h3>
          <p className="text-sm text-gray-500">
            Add your professional and personal skills
          </p>
        </div>
        <button
          onClick={addSkill}
          type="button"
          className="flex items-center gap-2 px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Skill
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Wrench className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No skills added yet.</p>
          <p className="text-sm">Click “Add Skill” to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((skill, index) => (
            <div
              key={skill._id || index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-semibold text-gray-800">
                  Skill #{index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-3">
                {/* Name */}
                <input
                  type="text"
                  placeholder="Skill Name (e.g. JavaScript)"
                  value={skill.name}
                  onChange={(e) => updateSkill(index, "name", e.target.value)}
                  className="px-3 py-2 text-sm border rounded-lg w-full"
                />

                {/* Level */}
                <select
                  value={skill.level || ""}
                  onChange={(e) => updateSkill(index, "level", e.target.value)}
                  className="px-3 py-2 text-sm border rounded-lg w-full bg-white"
                >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>

                {/* Category */}
                <input
                  type="text"
                  placeholder="Category (e.g. Programming, Design)"
                  value={skill.category || ""}
                  onChange={(e) => updateSkill(index, "category", e.target.value)}
                  className="px-3 py-2 text-sm border rounded-lg w-full"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillsForm;
