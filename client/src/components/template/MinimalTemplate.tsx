import type { Resume } from "@/assets/assts";

interface MinimalTemplateProps {
  data: Resume;
  accentColor?: string;
}

const MinimalTemplate = ({ data, accentColor = "#2563EB" }: MinimalTemplateProps) => {
  return (
 <div
      className="w-full h-full p-12 md:p-16 bg-white text-gray-800 max-w-5xl mx-auto"
      style={{
        fontFamily: '"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif',
      }}
    >
      <header className="text-center pb-10 border-b border-gray-200">
        <h1 className="text-4xl font-bold tracking-wide uppercase mb-3">
          {data.personal_info.fullname || "Your Name"}
        </h1>
        <p
          className="text-lg font-medium tracking-[0.2em] uppercase mb-4"
          style={{ color: accentColor }}
        >
          {data.personal_info.profession || "Professional Title"}
        </p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-gray-600">
          {data.personal_info.email && <span>{data.personal_info.email}</span>}
          {data.personal_info.phone && <span>{data.personal_info.phone}</span>}
          {data.personal_info.location && (
            <span>{data.personal_info.location}</span>
          )}
        </div>
      </header>

      <main className="mt-12 space-y-12">
        {data.summary && (
          <section>
            <h2
              className="text-sm font-bold uppercase tracking-widest mb-5"
              style={{ color: accentColor }}
            >
              Professional Summary
              <div
                className="h-[1.5px] w-12 mt-2"
                style={{ backgroundColor: accentColor }}
              />
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">
              {data.summary}
            </p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section>
            <h2
              className="text-sm font-bold uppercase tracking-widest mb-6"
              style={{ color: accentColor }}
            >
              Experience
              <div
                className="h-[1.5px] w-12 mt-2"
                style={{ backgroundColor: accentColor }}
              />
            </h2>
            <div className="space-y-8">
              {data.experience.map((exp) => (
                <article key={exp._id}>
                  <h3 className="text-lg font-semibold mb-1">{exp.position}</h3>
                  <p className="text-base text-gray-700 font-medium mb-1">
                    {exp.company} {exp.location && `• ${exp.location}`}
                  </p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">
                    {exp.startDate} — {exp.endDate || "Present"}
                  </p>
                  {exp.description && (
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {exp.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section>
            <h2
              className="text-sm font-bold uppercase tracking-widest mb-6"
              style={{ color: accentColor }}
            >
              Education
              <div
                className="h-[1.5px] w-12 mt-2"
                style={{ backgroundColor: accentColor }}
              />
            </h2>
            <div className="space-y-6">
              {data.education.map((edu) => (
                <article key={edu._id}>
                  <h3 className="text-lg font-semibold mb-1">{edu.degree}</h3>
                  <p className="text-base text-gray-700 font-medium mb-1">
                    {edu.school}
                  </p>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">
                    {edu.startDate} — {edu.endDate || "Present"}
                  </p>
                </article>
              ))}
            </div>
          </section>
        )}

        {data.projects.length > 0 && (
          <section>
            <h2
              className="text-sm font-bold uppercase tracking-widest mb-6"
              style={{ color: accentColor }}
            >
              Projects
              <div
                className="h-[1.5px] w-12 mt-2"
                style={{ backgroundColor: accentColor }}
              />
            </h2>
            <div className="space-y-8">
              {data.projects.map((project) => (
                <article key={project._id}>
                  <h3 className="text-lg font-semibold mb-2">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                    {project.description}
                  </p>
                  {project.technologies?.length > 0 && (
                    <div className="flex flex-wrap justify-start gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-3 py-1 border border-gray-200 rounded-full bg-gray-50 text-gray-700 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {data.skills.length > 0 && (
          <section>
            <h2
              className="text-sm font-bold uppercase tracking-widest mb-5"
              style={{ color: accentColor }}
            >
              Skills
              <div
                className="h-[1.5px] w-12 mt-2"
                style={{ backgroundColor: accentColor }}
              />
            </h2>
            <div className="flex flex-wrap justify-start gap-3">
              {data.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-sm px-4 py-1.5 border border-gray-300 rounded-md text-gray-800 bg-white transition-colors hover:bg-gray-50"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default MinimalTemplate;
