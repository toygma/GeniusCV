import type { Resume } from "@/assets/assts";

interface ClassicTemplateProps {
  data: Resume;
  accentColor?: string;
}

const ClassicTemplate = ({ data, accentColor = "#6B46C1" }: ClassicTemplateProps) => (
  <div
    className="w-full h-full p-10 bg-white text-gray-800 font-sans"
    style={{ fontFamily: 'Georgia, "Times New Roman", Times, serif' }}
  >
    {/* HEADER */}
    <div className="pb-4 mb-6 border-b-8" style={{ borderColor: accentColor }}>
      <h1 className="text-5xl font-bold text-gray-900">
        {data.personal_info?.fullname || "Ad Soyad"}
      </h1>
      <p className="text-2xl mt-2" style={{ color: accentColor }}>
        {data.personal_info?.profession || "Meslek Ünvanı"}
      </p>
    </div>

    {/* MAIN GRID */}
    <div className="grid grid-cols-3 gap-10">
      {/* LEFT SIDE */}
      <div className="col-span-2 space-y-8">
        {/* ÖZET */}
        <section>
          <h2
            className="text-xl font-bold uppercase tracking-wider border-b-2 pb-2"
            style={{ borderColor: accentColor }}
          >
            Özet
          </h2>
          <p className="mt-4 text-gray-700 text-sm leading-relaxed whitespace-pre-line">
            {data.summary || "Profesyonel özetiniz buraya gelecek."}
          </p>
        </section>

        {/* DENEYİM */}
        <section>
          <h2
            className="text-xl font-bold uppercase tracking-wider border-b-2 pb-2"
            style={{ borderColor: accentColor }}
          >
            Deneyim
          </h2>
          <div className="mt-4 space-y-6">
            {data.experience?.length > 0 ? (
              data.experience.map((exp) => (
                <div key={exp._id} className="text-sm">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {exp.position || "Pozisyon"}
                  </h3>
                  <p className="font-medium" style={{ color: accentColor }}>
                    {exp.company} {exp.location && `| ${exp.location}`}
                  </p>
                  <p className="text-xs text-gray-500 uppercase">
                    {exp.startDate} - {exp.current ? "Halen" : exp.endDate}
                  </p>
                  {exp.description && (
                    <p className="mt-2 text-gray-700 whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Deneyim bilgisi eklenmedi.</p>
            )}
          </div>
        </section>

        {/* PROJELER */}
        <section>
          <h2
            className="text-xl font-bold uppercase tracking-wider border-b-2 pb-2"
            style={{ borderColor: accentColor }}
          >
            Projeler
          </h2>
          <div className="mt-4 space-y-6">
            {data.projects?.length > 0 ? (
              data.projects.map((proj) => (
                <div key={proj._id} className="text-sm">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {proj.name || "Proje Adı"}
                  </h3>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs underline"
                      style={{ color: accentColor }}
                    >
                      {proj.link}
                    </a>
                  )}
                  <p className="text-xs text-gray-500 uppercase">
                    {proj.startDate} - {proj.endDate || "Devam ediyor"}
                  </p>
                  {proj.technologies?.length > 0 && (
                    <p className="text-xs text-gray-600 mt-1 italic">
                      {proj.technologies.join(", ")}
                    </p>
                  )}
                  {proj.description && (
                    <p className="mt-2 text-gray-700 whitespace-pre-line">
                      {proj.description}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Proje bilgisi eklenmedi.</p>
            )}
          </div>
        </section>
      </div>

      {/* RIGHT SIDE */}
      <div className="col-span-1 space-y-6">
        {/* İLETİŞİM */}
        <section>
          <h3
            className="text-lg font-bold uppercase border-b pb-1"
            style={{ borderColor: accentColor }}
          >
            İletişim
          </h3>
          <div className="mt-2 space-y-1 text-sm">
            {data.personal_info?.email && <p>{data.personal_info.email}</p>}
            {data.personal_info?.phone && <p>{data.personal_info.phone}</p>}
            {data.personal_info?.location && <p>{data.personal_info.location}</p>}
          </div>
        </section>

        {/* EĞİTİM */}
        <section>
          <h3
            className="text-lg font-bold uppercase border-b pb-1"
            style={{ borderColor: accentColor }}
          >
            Eğitim
          </h3>
          <div className="mt-2 space-y-4">
            {data.education?.length > 0 ? (
              data.education.map((edu) => (
                <div key={edu._id} className="text-sm">
                  <h4 className="font-semibold">{edu.degree}</h4>
                  <p className="text-xs">{edu.school}</p>
                  {edu.field && (
                    <p className="text-xs text-gray-600">{edu.field}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </p>
                  {edu.location && (
                    <p className="text-xs text-gray-500">{edu.location}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Eğitim bilgisi eklenmedi.</p>
            )}
          </div>
        </section>

        {/* YETENEKLER */}
        <section>
          <h3
            className="text-lg font-bold uppercase border-b pb-1"
            style={{ borderColor: accentColor }}
          >
            Yetenekler
          </h3>
          {data.skills?.length > 0 ? (
            <ul className="mt-2 space-y-1 list-disc list-inside text-sm">
              {data.skills.map((skill) => (
                <li key={skill._id}>
                  <span className="font-medium">{skill.name}</span>
                  {skill.level && (
                    <span className="text-gray-500 text-xs">
                      {" "}
                      – {skill.level}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">Yetenek bilgisi eklenmedi.</p>
          )}
        </section>
      </div>
    </div>
  </div>
);

export default ClassicTemplate;
