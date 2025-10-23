import type { Resume } from "@/assets/assts";

interface ModernTemplateProps {
  data: Resume;
  accentColor: string | undefined;
}
const ModernTemplate = ({ data, accentColor }:ModernTemplateProps) => (
  <div className="w-full h-full flex bg-white">
    <div
      className="w-1/3 p-8 text-white"
      style={{ backgroundColor: accentColor }}
    >
      <h1 className="text-4xl font-bold">
        {data.personal_info.fullname || "Ad Soyad"}
      </h1>
      <p className="text-xl mt-2 opacity-90">
        {data.personal_info.profession || "Meslek Ünvanı"}
      </p>
      <hr className="my-6 opacity-50" />
      <div className="space-y-6">
        <section>
          <h3 className="text-lg font-bold uppercase tracking-wider">İletişim</h3>
          <div className="mt-2 space-y-2 text-sm opacity-90">
            <p>{data.personal_info.email}</p>
            <p>{data.personal_info.phone}</p>
            <p>{data.personal_info.location}</p>
          </div>
        </section>
        <section>
          <h3 className="text-lg font-bold uppercase tracking-wider">Yetenekler</h3>
          <ul className="mt-2 space-y-1 list-disc list-inside text-sm opacity-90">
            {data.skills.length > 0 ? (
              data.skills.map((skill) => <li key={skill._id}>{skill.name}</li>))
              : (
              <p className="text-sm">Yetenek bilgisi eklenmedi.</p>
            )}
          </ul>
        </section>
      </div>
    </div>
    <div className="w-2/3 p-10 text-gray-800 space-y-8">
      <section>
        <h2 className="text-2xl font-bold uppercase" style={{ color: accentColor }}>
          Özet
        </h2>
        <p className="mt-4 text-gray-700 text-sm">
          {data.summary || "Profesyonel özetiniz buraya gelecek."}
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-bold uppercase" style={{ color: accentColor }}>
          Deneyim
        </h2>
        <div className="mt-4 space-y-6">
            {data.experience.length > 0 ? (
              data.experience.map((exp) => (
                <div key={exp._id} className="text-sm">
                  <h3 className="text-lg font-semibold">{exp.company}</h3>
                  <p className="font-medium text-gray-600">
                    {exp.company} | {exp.location}
                  </p>
                  <p className="text-xs text-gray-500 uppercase">
                    {exp.startDate} - {exp.endDate || "Halen"}
                  </p>
                  <p className="mt-2 text-gray-700 whitespace-pre-line">
                    {exp.description}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Deneyim bilgisi eklenmedi.</p>
            )}
          </div>
      </section>
    </div>
  </div>
);

export default ModernTemplate