import { Layout, Check } from "lucide-react";
import { useState } from "react";

interface Template {
  id: string;
  name: string;
  preview: string;
}

interface TemplateSelectorProps {
  selectedTemplate: string |undefined;
  onChange: (templateId: string) => void;
}

const TemplateSelector = ({ selectedTemplate, onChange }: TemplateSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const templates: Template[] = [
    {
      id: "classic",
      name: "Classic",
      preview: "Geleneksel ve profesyonel görünüm"
    },
    {
      id: "modern",
      name: "Modern",
      preview: "Çağdaş ve dinamik tasarım"
    },
    {
      id: "minimal",
      name: "Minimal",
      preview: "Sade ve zarif görünüm"
    },
    {
      id: "minimal-image",
      name: "Minimal Image",
      preview: "Görsel odaklı minimalist tasarım"
    }
  ];

  const handleSelect = (templateId: string) => {
    onChange(templateId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
      >
        <Layout size={16} className="text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Template</span>
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 w-72 mt-2 p-2 bg-white rounded-lg border border-gray-200 shadow-lg z-20">
            <div className="space-y-1">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleSelect(template.id)}
                  className={`w-full text-left p-3 rounded-md transition-colors ${
                    selectedTemplate === template.id
                      ? "bg-blue-50 border border-blue-200"
                      : "hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className={`text-sm font-semibold ${
                          selectedTemplate === template.id
                            ? "text-blue-700"
                            : "text-gray-900"
                        }`}>
                          {template.name}
                        </h3>
                        {selectedTemplate === template.id && (
                          <Check size={16} className="text-blue-600" />
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {template.preview}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TemplateSelector;