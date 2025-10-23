import type { Resume } from "@/assets/assts";
import { User } from "lucide-react";

interface MinimalImageTemplateProps {
  data: Resume;
  accentColor: string | undefined;
}


const MinimalImageTemplate = ({ data, accentColor }:MinimalImageTemplateProps) => (
  <div className="w-full h-full p-8 bg-white text-gray-800">
    <div
      className="flex items-center space-x-6 pb-6 border-b-4"
      style={{ borderColor: accentColor }}
    >
      <div className="w-32 h-32 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
        <User className="w-20 h-20 text-gray-400" />
      </div>
      <div>
        <h1 className="text-4xl font-bold">
          {data.personal_info.fullname || "Ad Soyad"}
        </h1>
        <p className="text-2xl" style={{ color: accentColor }}>
          {data.personal_info.profession || "Meslek Ünvanı"}
        </p>
      </div>
    </div>
    <div className="mt-8 space-y-6">
      <section>
        <h2
          className="text-xl font-bold uppercase tracking-wider"
          style={{ color: accentColor }}
        >
          Özet
        </h2>
        <p className="mt-2 text-gray-700 text-sm">
          {data.summary || "Profesyonel özetiniz buraya gelecek."}
        </p>
      </section>
    </div>
  </div>
);

export default MinimalImageTemplate;
