import type { Resume } from "@/assets/assts";


interface ClassicTemplateProps {
  data: Resume;
  accentColor: string | undefined;
}

const ClassicTemplate = ({ data, accentColor }:ClassicTemplateProps) => (
  <div
    className="w-full h-full p-10 bg-white text-gray-800 font-sans"
    style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif' }}
  >
    <div className="pb-4 mb-6 border-b-8" style={{ borderColor: accentColor }}>
      <h1 className="text-5xl font-bold text-gray-900">
        {data.personal_info.fullname || "Ad Soyad"}
      </h1>
      <p className="text-2xl mt-2" style={{ color: accentColor }}>
        {data.personal_info.profession || "Meslek Ünvanı"}
      </p>
    </div>
    <div className="grid grid-cols-3 gap-10">
      <div className="col-span-2 space-y-8">
        {/* Özet */}
        <section>
          <h2
            className="text-xl font-bold uppercase tracking-wider border-b-2 pb-2"
            style={{ borderColor: accentColor }}
          >
            Özet
          </h2>
          <p className="mt-4 text-gray-700 text-sm">
            {data.summary || "Profesyonel özetiniz buraya gelecek."}
          </p>
        </section>

        {/* Deneyim */}
        <section>
          <h2
            className="text-xl font-bold uppercase tracking-wider border-b-2 pb-2"
            style={{ borderColor: accentColor }}
          >
            Deneyim
          </h2>
          <div className="mt-4 space-y-6">
            {data.experience.length > 0 ? (
              data.experience.map((exp) => (
                <div key={exp._id} className="text-sm">
                  <h3 className="text-lg font-semibold">{exp.company}</h3>
                  <p className="font-medium" style={{ color: accentColor }}>
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
              <p className="text-sm text-gray-500">
                Deneyim bilgisi eklenmedi.
              </p>
            )}
          </div>
        </section>
      </div>

      <div className="col-span-1 space-y-6">
        {/* İletişim */}
        <section>
          <h3 className="text-lg font-bold uppercase">İletişim</h3>
          <div className="mt-2 space-y-2 text-sm">
            <p>{data.personal_info.email}</p>
            <p>{data.personal_info.phone}</p>
            <p>{data.personal_info.location}</p>
          </div>
        </section>
        {/* Eğitim */}
        <section>
          <h3 className="text-lg font-bold uppercase">Eğitim</h3>
          <div className="mt-2 space-y-4">
            {data.education.length > 0 ? (
              data.education.map((edu) => (
                <div key={edu._id} className="text-sm">
                  <h4 className="font-semibold">{edu.degree}</h4>
                  <p className="text-xs">{edu.school}</p>
                  <p className="text-xs text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Eğitim bilgisi eklenmedi.</p>
            )}
          </div>
        </section>
        {/* Yetenekler */}
        <section>
          <h3 className="text-lg font-bold uppercase">Yetenekler</h3>
          <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
            {data.skills.length > 0 ? (
              data.skills.map((skill) => <li key={skill._id}>{skill.name}</li>)
            ) : (
              <p className="text-sm text-gray-500">
                Yetenek bilgisi eklenmedi.
              </p>
            )}
          </ul>
        </section>
      </div>
    </div>
  </div>
);
export default ClassicTemplate;
