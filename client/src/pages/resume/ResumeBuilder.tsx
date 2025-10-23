import { dummyResumeData, type Resume } from "@/assets/assts";
import PersonalInfoPage from "@/components/resume/PersonalInfo";
import {
  ArrowLeftIcon,
  ChevronLeft,
  ChevronRight,
  User,
  Briefcase,
  GraduationCap,
  FolderKanban,
  Code,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

// Constants
const SECTIONS = [
  { id: "personal", name: "Kişisel Bilgiler", icon: User },
  { id: "summary", name: "Özet", icon: User },
  { id: "experience", name: "Deneyim", icon: Briefcase },
  { id: "education", name: "Eğitim", icon: GraduationCap },
  { id: "projects", name: "Projeler", icon: FolderKanban },
  { id: "skills", name: "Yetenekler", icon: Code },
] as const;

const INITIAL_RESUME_STATE: Resume = {
  _id: "",
  title: "",
  personal_info: {
    _id: "",
    userId: "",
    title: "",
    fullname: "",
    email: "",
    phone: "",
    location: "",
    profession: "",
  },
  experience: [],
  education: [],
  projects: [],
  skills: [],
  template: "classic",
  accent_color: "#3B82F6",
  public: false,
};

const ResumeBuilder = () => {
  const { resumeId } = useParams<{ resumeId: string }>();
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [resumeData, setResumeData] = useState<Resume>(INITIAL_RESUME_STATE);
  const [removeBackground, setRemoveBackground] = useState(false);

  const activeSection = SECTIONS[activeSectionIndex];
  const isFirstSection = activeSectionIndex === 0;
  const isLastSection = activeSectionIndex === SECTIONS.length - 1;
  const progressPercentage = (activeSectionIndex / (SECTIONS.length - 1)) * 100;

  // Load existing resume
  useEffect(() => {
    if (!resumeId) return;

    const resume = dummyResumeData.find((r) => r._id === resumeId);
    if (resume) {
      setResumeData(resume);
      document.title = `${resume.title} - CV Oluşturucu`;
    }
  }, [resumeId]);

  // Navigation handlers
  const handlePrevious = () => {
    setActiveSectionIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setActiveSectionIndex((prev) => Math.min(prev + 1, SECTIONS.length - 1));
  };

  // Render section content
  const renderSectionContent = () => {
    switch (activeSection.id) {
      case "personal":
        return (
         <PersonalInfoPage
            data={resumeData.personal_info}
            onChange={(data) =>
              setResumeData((prev:any) => ({ ...prev, personal_info: data }))
            }
            removeBackground={removeBackground}
            setRemoveBackground={setRemoveBackground}
          />
        );
      case "summary":
        return <div className="text-gray-600">Özet bölümü içeriği</div>;
      case "experience":
        return <div className="text-gray-600">Deneyim bölümü içeriği</div>;
      case "education":
        return <div className="text-gray-600">Eğitim bölümü içeriği</div>;
      case "projects":
        return <div className="text-gray-600">Projeler bölümü içeriği</div>;
      case "skills":
        return <div className="text-gray-600">Yetenekler bölümü içeriği</div>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/app"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group"
          >
            <ArrowLeftIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Gösterge Paneline Dön</span>
          </Link>
        </div>

        {/* 3 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Section Steps */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-8">
              <h4 className="text-sm font-semibold text-gray-700 mb-4">
                Bölümler
              </h4>
              <div className="space-y-2">
                {SECTIONS.map((section, index) => {
                  const Icon = section.icon;
                  const isActive = index === activeSectionIndex;
                  const isCompleted = index < activeSectionIndex;

                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSectionIndex(index)}
                      className={`
                        w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left
                        ${
                          isActive
                            ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300"
                            : isCompleted
                            ? "bg-green-50 border-2 border-green-200 hover:border-green-300"
                            : "bg-gray-50 border-2 border-transparent hover:border-gray-200"
                        }
                      `}
                    >
                      <div
                        className={`
                        p-2 rounded-lg
                        ${
                          isActive
                            ? "bg-blue-600 text-white"
                            : isCompleted
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        }
                      `}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span
                        className={`
                        text-sm font-medium
                        ${
                          isActive
                            ? "text-blue-900"
                            : isCompleted
                            ? "text-green-900"
                            : "text-gray-600"
                        }
                      `}
                      >
                        {section.name}
                      </span>
                      {isCompleted && (
                        <span className="ml-auto text-green-600">✓</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Middle - Form Section */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Progress Bar */}
              <div className="relative h-2 bg-gray-100">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white">
                      <activeSection.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {activeSection.name}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Adım {activeSectionIndex + 1} / {SECTIONS.length}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Content */}
                <div className="mb-8">{renderSectionContent()}</div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <button
                    onClick={handlePrevious}
                    disabled={isFirstSection}
                    className={`
                      inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
                      ${
                        isFirstSection
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md"
                      }
                    `}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Önceki
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={isLastSection}
                    className={`
                      inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
                      ${
                        isLastSection
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:scale-105"
                      }
                    `}
                  >
                    {isLastSection ? "Tamamla" : "Sonraki"}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Preview Section */}
          <div className="lg:col-span-4">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Canlı Önizleme
                </h3>
                <div className="aspect-[8.5/11] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-gray-400 transition-colors">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <User className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-400 text-sm font-medium">
                      CV önizlemesi
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      Değişiklikler otomatik güncellenir
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
