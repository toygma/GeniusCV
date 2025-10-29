import { type Resume } from "@/assets/assts";
import ColorPicker from "@/components/resume/ColorPicker";
import PersonalInfoPage from "@/components/resume/PersonalInfo";
import ResumePreview from "@/components/resume/ResumePreview";
import SummaryPage from "@/components/resume/form/SummaryPage";
import TemplateSelector from "@/components/resume/TemplateSelector";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Briefcase,
  GraduationCap,
  FolderKanban,
  Code,
  ArrowLeft,
  Share2Icon,
  EyeIcon,
  EyeOffIcon,
  DownloadIcon,
  Loader2,
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router";
import ExperienceForm from "@/components/resume/form/ExperienceForm";
import EducationForm from "@/components/resume/form/EducationForm";
import ProjectsForm from "@/components/resume/form/ProjectsForm";
import SkillsForm from "@/components/resume/form/SkillsForm";
import {
  useGetUserResumesQuery,
  useUpdateResumeMutation,
} from "@/app/api/resume-api";
import toast from "react-hot-toast";
import { useReactToPrint } from "react-to-print";

// Constants
const SECTIONS = [
  { id: "personal", name: "Personal Info", icon: User },
  { id: "summary", name: "Summary", icon: User },
  { id: "experience", name: "Experience", icon: Briefcase },
  { id: "education", name: "Education", icon: GraduationCap },
  { id: "projects", name: "Projects", icon: FolderKanban },
  { id: "skills", name: "Skills", icon: Code },
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
  summary: "",
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
  const [isDownloading, setIsDownloading] = useState(false);

  const resumePreviewRef = useRef<HTMLDivElement>(null);

  const activeSection = SECTIONS[activeSectionIndex];
  const isFirstSection = activeSectionIndex === 0;
  const isLastSection = activeSectionIndex === SECTIONS.length - 1;
  const progressPercentage = (activeSectionIndex / (SECTIONS.length - 1)) * 100;

  const { data: getUserResumesData } = useGetUserResumesQuery();

  const [updateResume, { error: UpdateError, isSuccess: UpdateSuccess }] =
    useUpdateResumeMutation();
  const navigate = useNavigate();
  useEffect(() => {
    if (UpdateSuccess) {
      toast.success("Resume updated successfully! 🎉");
    } else if (UpdateError && "data" in UpdateError) {
      toast.error(
        (UpdateError as any)?.data?.message || "Failed to update resume!"
      );
    }
  }, [UpdateSuccess, UpdateError]);

  useEffect(() => {
    if (getUserResumesData && resumeId) {
      const foundResume = getUserResumesData.resume.find(
        (r: Resume) => r._id === resumeId
      );
      if (foundResume) setResumeData(foundResume);
    }
  }, [getUserResumesData, resumeId]);

  // Render section content
  const renderSectionContent = () => {
    switch (activeSection.id) {
      case "personal":
        return (
          <PersonalInfoPage
            data={resumeData.personal_info}
            onChange={(data) =>
              setResumeData((prev: any) => ({ ...prev, personal_info: data }))
            }
            removeBackground={removeBackground}
            setRemoveBackground={setRemoveBackground}
          />
        );
      case "summary":
        return (
          <div className="text-gray-600">
            <SummaryPage
              data={resumeData.summary}
              onChange={(data) =>
                setResumeData((prev) => ({ ...prev, summary: data }))
              }
            />
          </div>
        );
      case "experience":
        return (
          <div className="text-gray-600">
            <ExperienceForm
              data={resumeData.experience}
              onChange={(data) =>
                setResumeData((prev) => ({ ...prev, experience: data }))
              }
            />
          </div>
        );
      case "education":
        return (
          <div className="text-gray-600">
            <EducationForm
              data={resumeData.education}
              onChange={(data) =>
                setResumeData((prev) => ({ ...prev, education: data }))
              }
            />
          </div>
        );
      case "projects":
        return (
          <div className="text-gray-600">
            <ProjectsForm
              data={resumeData.projects}
              onChange={(data) =>
                setResumeData((prev) => ({ ...prev, projects: data }))
              }
            />
          </div>
        );
      case "skills":
        return (
          <div className="text-gray-600">
            <SkillsForm
              data={resumeData.skills}
              onChange={(data) =>
                setResumeData((prev) => ({ ...prev, skills: data }))
              }
            />
          </div>
        );
      default:
        return null;
    }
  };

  const handleShare = () => {
    const frontendUrl = window.location.origin;
    const resumeUrl = `${frontendUrl}/view/${resumeId}`;

    if (navigator.share) {
      navigator.share({ url: resumeUrl, text: "My Resume" });
    } else {
      alert("Share not supported on this browser");
    }
  };

  const saveResume = async (updatedFields?: Partial<Resume>) => {
    if (!resumeId) return;

    try {
      // 1️⃣ Merge current data with any updated fields
      const updatedData = { ...resumeData, ...updatedFields };

      if (updatedData.skills) {
        updatedData.skills = updatedData.skills.map((skill) => ({
          name: skill.name,
          level: skill.level,
        }));
      }
      if (updatedData.projects) {
        updatedData.projects = updatedData.projects.map((project) => ({
          name: project.name,
          description: project.description || "",
          link: project.link || "",
          technologies: project.technologies || [],
          startDate: project.startDate || "",
          endDate: project.endDate || "",
        }));
      }

      if (updatedData.education) {
        updatedData.education = updatedData.education.map((ed) => ({
          school: ed.school || "",
          degree: ed.degree || "",
          fieldOfStudy: ed.fieldOfStudy || "",
          location: ed.location || "",
          startDate: ed.startDate || "",
          endDate: ed.endDate || "",
          description: ed.description || "",
        }));
      }

      if (updatedData.experience) {
        updatedData.experience = updatedData.experience.map((exp) => ({
          company: exp.company || "",
          position: exp.position || "",
          location: exp.location || "",
          description: exp.description || "",
          startDate: exp.startDate || "",
          endDate: exp.endDate || "",
        }));
      }
      const formData = new FormData();
      formData.append(
        "resumeData",
        JSON.stringify({
          ...updatedData,
          personal_info: {
            ...updatedData.personal_info,
            image:
              typeof updatedData.personal_info.image === "string"
                ? updatedData.personal_info.image
                : undefined,
          },
        })
      );

      if (updatedData.personal_info?.image instanceof File) {
        formData.append("image", updatedData.personal_info.image);
      }

      await updateResume({ resumeId, formData }).unwrap();

      setResumeData(updatedData);
      toast.success("Resume saved successfully!");
    } catch (error) {
      console.error("Error updating resume:", error);
      toast.error("Failed to save resume!");
    }
  };

  const changeResumeVisibility = async () => {
    await saveResume({ public: !resumeData.public });
  };

  const handlePrint = useReactToPrint({
    contentRef: resumePreviewRef,
    documentTitle: `${resumeData.title || "resume"}`,
    pageStyle: `
      @page { size: A4; margin: 0; }
      @media print {
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      }
    `,
    onBeforePrint: async (): Promise<void> => {
      setIsDownloading(true);
    },
    onAfterPrint: (): void => {
      setIsDownloading(false);
      toast.success("Resume downloaded successfully!");
    },
  });

  // Navigation handlers
  const handlePrevious = () => {
    setActiveSectionIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = async () => {
    if (isLastSection) {
      try {
        await saveResume();
        navigate(`/view/${resumeId}`);
      } catch (error) {
        toast.error("Failed to save resume!");
        console.error(error);
      }
    } else {
      setActiveSectionIndex((prev) => Math.min(prev + 1, SECTIONS.length - 1));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-[1600px]">
        {/* Header */}
        <div className="mb-8">
          <Link
            to={"/dashboard"}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
        </div>

        {/* 3 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Section Steps */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-8">
              <h4 className="text-sm font-semibold text-gray-700 mb-4">
                Sections
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
                        text-sm font-medium truncate
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
                        <span className="ml-auto text-green-600 flex-shrink-0">
                          ✓
                        </span>
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
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl text-white flex-shrink-0">
                      <activeSection.icon className="w-6 h-6" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-2xl font-bold text-gray-900 truncate">
                        {activeSection.name}
                      </h2>
                      <p className="text-sm text-gray-500 mt-1">
                        Step {activeSectionIndex + 1} / {SECTIONS.length}
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
                    Previous
                  </button>

                  <button
                    onClick={handleNext}
                    className={`
                      inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all
                      ${
                        isLastSection
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:scale-105"
                          : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:scale-105"
                      }
                    `}
                  >
                    {isLastSection ? "Complete" : "Next"}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Preview Section */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 mb-4 flex-wrap">
              <ColorPicker
                selectedColor={resumeData.accent_color}
                onChange={(accent_color: string) =>
                  setResumeData((prev) => ({ ...prev, accent_color }))
                }
              />
              <TemplateSelector
                selectedTemplate={resumeData.template}
                onChange={(template: string) =>
                  setResumeData((prev) => ({ ...prev, template }))
                }
              />
              <div className="flex items-center gap-2">
                {resumeData.public && (
                  <button
                    onClick={handleShare}
                    type="button"
                    className="p-2 text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-150"
                    aria-label="Share resume"
                  >
                    <Share2Icon className="w-5 h-5" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={changeResumeVisibility}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-150 ${
                    resumeData.public
                      ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 focus:ring-emerald-500"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 focus:ring-gray-500"
                  }`}
                >
                  {resumeData.public ? (
                    <EyeIcon className="w-5 h-5" />
                  ) : (
                    <EyeOffIcon className="w-5 h-5" />
                  )}
                  <span>{resumeData.public ? "Public" : "Private"}</span>
                </button>

                {/* Updated Download Button with loading state */}
                <button
                  onClick={handlePrint}
                  type="button"
                  disabled={isDownloading}
                  className="flex items-center justify-center gap-2 w-[130px] px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-150 disabled:bg-blue-400 disabled:cursor-not-allowed"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <DownloadIcon className="w-5 h-5" />
                      <span>Download</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Preview Container with Fixed Size */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* This 'ref' is crucial for html2canvas to target the correct element */}
              <div className="w-full h-full">
                <ResumePreview
                  data={resumeData}
                  template={resumeData.template}
                  accentColor={resumeData.accent_color}
                  resumePreviewRef={resumePreviewRef}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
