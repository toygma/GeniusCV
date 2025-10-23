import type { Resume } from "@/assets/assts";

interface MinimalTemplateProps {
  data: Resume;
  accentColor: string | undefined;
}
const MinimalTemplate = ({ data, accentColor }:MinimalTemplateProps) => (
  <div
    className="w-full h-full p-12 bg-white text-gray-700"
    style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
  >
    <div className="text-center pb-8 border-b-2 border-gray-200">
      <h1 className="text-5xl font-light tracking-widest uppercase">
        {data.personal_info.fullname || "Ad Soyad"}
      </h1>
      <p className="text-xl mt-3 tracking-wider" style={{ color: accentColor }}>
        {data.personal_info.profession || "Meslek Ünvanı"}
      </p>
      <div className="mt-4 text-xs tracking-wider space-x-4">
        <span>{data.personal_info.email}</span>
        <span>|</span>
        <span>{data.personal_info.phone}</span>
        <span>|</span>
        <span>{data.personal_info.location}</span>
      </div>
    </div>
    <div className="mt-10 space-y-10">
      <section>
        <h2 className="text-sm font-bold text-center uppercase tracking-widest" style={{ color: accentColor }}>
          Özet
        </h2>
        <p className="mt-4 text-center text-sm max-w-2xl mx-auto">
          {data.summary || "Profesyonel özetiniz buraya gelecek."}
        </p>
      </section>
      <section>
        <h2 className="text-sm font-bold text-center uppercase tracking-widest" style={{ color: accentColor }}>
          Deneyim
        </h2>
         <div className="mt-4 space-y-6">
            {data.experience.length > 0 ? (
              data.experience.map((exp) => (
                <div key={exp._id} className="text-sm text-center">
                  <h3 className="text-lg font-semibold">{exp.company}</h3>
                  <p className="font-medium text-gray-600">
                    {exp.company} | {exp.location}
                  </p>
                  <p className="text-xs text-gray-500 uppercase">
                    {exp.startDate} - {exp.endDate || "Halen"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center">Deneyim bilgisi eklenmedi.</p>
            )}
          </div>
      </section>
    </div>
  </div>
);

export default MinimalTemplate