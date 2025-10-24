import { Palette, Check } from 'lucide-react';
import { useState } from 'react';

interface Color {
  name: string;
  value: string;
}

interface ColorPickerProps {
  selectedColor: string | undefined;
  onChange: (color: string) => void;
}

const colors: Color[] = [
  { name: "Blue", value: "#3B82F6" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Pink", value: "#EC4899" },
  { name: "Green", value: "#10B981" },
  { name: "Orange", value: "#F97316" },
  { name: "Red", value: "#EF4444" },
  { name: "Teal", value: "#14B8A6" },
  { name: "Indigo", value: "#6366F1" }
];

const ColorPicker = ({ selectedColor, onChange }: ColorPickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleColorSelect = (color: string) => {
    onChange(color);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
      >
        <Palette size={16} className="text-gray-600" />
        <span className="text-sm font-medium text-gray-700">Accent Color</span>
        <div
          className="w-4 h-4 rounded-full border-2 border-white shadow-sm ml-1"
          style={{ backgroundColor: selectedColor }}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 w-64 mt-2 p-3 bg-white rounded-lg border border-gray-200 shadow-lg z-20">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Choose Accent Color
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {colors.map((color) => (
                <button
                  key={color.value}
                  onClick={() => handleColorSelect(color.value)}
                  className="group relative flex flex-col items-center gap-1.5 p-2 rounded-md hover:bg-gray-50 transition-colors"
                  title={color.name}
                >
                  <div
                    className={`w-10 h-10 rounded-full shadow-md transition-transform group-hover:scale-110 ${
                      selectedColor === color.value
                        ? "ring-2 ring-offset-2 ring-gray-400"
                        : ""
                    }`}
                    style={{ backgroundColor: color.value }}
                  >
                    {selectedColor === color.value && (
                      <div className="flex items-center justify-center w-full h-full">
                        <Check size={18} className="text-white drop-shadow-md" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs text-gray-600 font-medium">
                    {color.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ColorPicker;