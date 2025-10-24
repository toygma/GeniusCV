import React from "react";
import type { Project } from "@/assets/assts";
import { FolderGit2, Plus, Trash2 } from "lucide-react";

interface ProjectsFormProps {
  data: Project[];
  onChange: (updated: Project[]) => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, onChange }) => {
  const addProject = () => {
    const newProject: Project = {
      _id: crypto.randomUUID(),
      name: "",
      description: "",
      technologies: [],
      link: "",
      startDate: "",
      endDate: "",
    };
    onChange([...data, newProject]);
  };

  const removeProject = (index: number) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateProject = (
    index: number,
    field: keyof Project,
    value: string | string[]
  ) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const updateTechnologies = (index: number, value: string) => {
    const techArray = value.split(",").map((t) => t.trim()).filter(Boolean);
    updateProject(index, "technologies", techArray);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Projects
          </h3>
          <p className="text-sm text-gray-500">Add your professional or personal projects</p>
        </div>
        <button
          onClick={addProject}
          type="button"
          className="flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
        >
          <Plus className="size-4" />
          Add Project
        </button>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <FolderGit2 className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No projects added yet.</p>
          <p className="text-sm">Click “Add Project” to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((project, index) => (
            <div
              key={project._id || index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-semibold text-gray-800">
                  Project #{index + 1}
                </h4>
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              {/* Name */}
              <input
                type="text"
                placeholder="Project Name"
                value={project.name}
                onChange={(e) => updateProject(index, "name", e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg"
              />

              {/* Description */}
              <textarea
                placeholder="Project Description"
                value={project.description}
                onChange={(e) =>
                  updateProject(index, "description", e.target.value)
                }
                className="w-full px-3 py-2 text-sm border rounded-lg"
                rows={3}
              />

              {/* Technologies */}
              <input
                type="text"
                placeholder="Technologies (comma separated, e.g. React, Node.js, MongoDB)"
                value={project.technologies.join(", ")}
                onChange={(e) => updateTechnologies(index, e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg"
              />

              {/* Dates */}
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="month"
                  placeholder="Start Date"
                  value={project.startDate || ""}
                  onChange={(e) =>
                    updateProject(index, "startDate", e.target.value)
                  }
                  className="px-3 py-2 text-sm border rounded-lg w-full"
                />
                <input
                  type="month"
                  placeholder="End Date"
                  value={project.endDate || ""}
                  onChange={(e) =>
                    updateProject(index, "endDate", e.target.value)
                  }
                  className="px-3 py-2 text-sm border rounded-lg w-full"
                />
              </div>

              {/* Link */}
              <input
                type="url"
                placeholder="Project Link (optional)"
                value={project.link || ""}
                onChange={(e) => updateProject(index, "link", e.target.value)}
                className="w-full px-3 py-2 text-sm border rounded-lg"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsForm;
