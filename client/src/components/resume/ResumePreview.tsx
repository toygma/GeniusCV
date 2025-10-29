import ClassicTemplate from "../template/ClassicTemplate";
import ModernTemplate from "../template/ModernTemplate";
import MinimalTemplate from "../template/MinimalTemplate";
import MinimalImageTemplate from "../template/MinimalImageTemplate";
import type { Resume } from "@/assets/assts";

interface ResumePreviewProps {
  data: Resume;
  accentColor: string | undefined;
  template: string | undefined;
  classes?: string | undefined;
  resumePreviewRef?: any;
}

const ResumePreview = ({
  data,
  template,
  accentColor,
  classes = "",
  resumePreviewRef,
}: ResumePreviewProps) => {
  

  
  const getImageUrl = (image?: string | File) => {
    if (!image) return undefined;
    return typeof image === "string" ? image : URL.createObjectURL(image);
  };
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate data={data} accentColor={accentColor} />;
      case "minimal":
        return <MinimalTemplate data={data} accentColor={accentColor} />;
      case "minimal-image":
        return (
          <MinimalImageTemplate
            data={data}
            accentColor={accentColor}
            getImageUrl={getImageUrl}
          />
        );
      default:
        return <ClassicTemplate data={data} accentColor={accentColor} />;
    }
  };

  return (
    <div className="sticky top-8">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Live View
        </h3>
        <div
          ref={resumePreviewRef}
          className={`bg-white rounded-lg border-2 border-dashed border-gray-300 w-full ${classes}`}
          style={{
            overflow: "visible",
            height: "auto",
          }}
        >
          <div className="w-full h-full">{renderTemplate()}</div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
