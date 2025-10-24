import { dummyResumeData, type Resume } from "@/assets/assts";
import Loading from "@/components/Loading";
import ResumePreview from "@/components/resume/ResumePreview";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const Preview: React.FC = () => {
  const { resumeId } = useParams<{ resumeId: string }>();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [resumeData, setResumeData] = useState<Resume | null>(null);

  useEffect(() => {
    const loadResume = async () => {
      // Simulate async fetch if needed
      const foundResume = dummyResumeData.find(
        (resume) => resume._id === resumeId
      ) || null;

      setResumeData(foundResume);
      setIsLoading(false);
    };

    loadResume();
  }, [resumeId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-100">
        <Loading />
      </div>
    );
  }

  if (!resumeData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-slate-100 text-gray-700">
        <h1 className="text-2xl font-semibold mb-4">Resume not found</h1>
        <p className="text-center">The resume you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="bg-slate-100 min-h-screen py-10">
      <div className="max-w-3xl mx-auto shadow-lg rounded-xl overflow-hidden">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classes="p-6 bg-white"
        />
      </div>
    </div>
  );
};

export default Preview;
