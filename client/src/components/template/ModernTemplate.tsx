import type { Resume } from "@/assets/assts";

interface ModernTemplateProps {
  data: Resume;
  accentColor?: string;
}

const ModernTemplate = ({ data, accentColor }: ModernTemplateProps) => (
  <div className="w-full h-full flex bg-white font-sans leading-relaxed">
    {/* Left Sidebar */}
    <div
      className="w-1/3 p-8 text-white flex flex-col justify-between"
      style={{ backgroundColor: accentColor || "#4F46E5" }}
    >
      <div>
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold tracking-tight">
            {data.personal_info.fullname || "Full Name"}
          </h1>
          <p className="text-xl mt-2 opacity-90 font-medium">
            {data.personal_info.profession || "Professional Title"}
          </p>
        </div>

        <hr className="my-6 opacity-50" />

        {/* Contact */}
        <section className="mb-8">
          <h3 className="text-lg font-bold uppercase tracking-wider">Contact</h3>
          <div className="mt-3 space-y-2 text-sm opacity-90">
            {data.personal_info.email && <p>{data.personal_info.email}</p>}
            {data.personal_info.phone && <p>{data.personal_info.phone}</p>}
            {data.personal_info.location && <p>{data.personal_info.location}</p>}
          </div>
        </section>

        {/* Skills */}
        <section className="mb-8">
          <h3 className="text-lg font-bold uppercase tracking-wider">Skills</h3>
          <ul className="mt-3 space-y-1 list-disc list-inside text-sm opacity-90">
            {data.skills?.length > 0 ? (
              data.skills.map((skill) => (
                <li key={skill._id}>
                  {skill.name}
                  {skill.level ? ` — ${skill.level}` : ""}
                </li>
              ))
            ) : (
              <p className="text-sm opacity-80">No skills added yet.</p>
            )}
          </ul>
        </section>

        {/* Education */}
        <section>
          <h3 className="text-lg font-bold uppercase tracking-wider">Education</h3>
          <div className="mt-3 space-y-4 text-sm opacity-90">
            {data.education?.length > 0 ? (
              data.education.map((edu) => (
                <div key={edu._id}>
                  <h4 className="font-semibold">{edu.degree}</h4>
                  <p>{edu.school}</p>
                  <p className="text-xs opacity-80">
                    {edu.startDate} - {edu.endDate || "Present"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm opacity-80">No education added yet.</p>
            )}
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="mt-10 text-xs opacity-70">
        <p>© {new Date().getFullYear()} {data.personal_info.fullname || "Your Name"}</p>
      </div>
    </div>

    {/* Right Content */}
    <div className="w-2/3 p-10 text-gray-800 space-y-10">
      {/* Profile */}
      <section>
        <h2
          className="text-2xl font-bold uppercase tracking-wider"
          style={{ color: accentColor }}
        >
          Profile
        </h2>
        <p className="mt-4 text-gray-700 text-sm leading-relaxed">
          {data.summary ||
            "Highly motivated and detail-oriented professional with a passion for innovation, problem-solving, and teamwork."}
        </p>
      </section>

      {/* Experience */}
      <section>
        <h2
          className="text-2xl font-bold uppercase tracking-wider"
          style={{ color: accentColor }}
        >
          Experience
        </h2>
        <div className="mt-6 space-y-8">
          {data.experience?.length > 0 ? (
            data.experience.map((exp) => (
              <div key={exp._id} className="text-sm">
                <h3 className="text-lg font-semibold text-gray-900">
                  {exp.position || "Job Title"}
                </h3>
                <p className="font-medium text-gray-600">
                  {exp.company} —{" "}
                  <span className="text-gray-500">{exp.location}</span>
                </p>
                <p className="text-xs text-gray-500 uppercase mt-1">
                  {exp.startDate} - {exp.endDate || "Present"}
                </p>
                <p className="mt-2 text-gray-700 whitespace-pre-line">
                  {exp.description}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No experience added yet.</p>
          )}
        </div>
      </section>

      {/* Projects */}
      <section>
        <h2
          className="text-2xl font-bold uppercase tracking-wider"
          style={{ color: accentColor }}
        >
          Projects
        </h2>
        <div className="mt-6 space-y-6 text-sm">
          {data.projects?.length > 0 ? (
            data.projects.map((proj) => (
              <div key={proj._id}>
                <h3 className="text-base font-semibold text-gray-900">
                  {proj.name}
                </h3>
                {proj.technologies && (
                  <p className="text-xs text-gray-500 italic">
                    {proj.technologies.join(", ")}
                  </p>
                )}
                <p className="mt-1 text-gray-700">{proj.description}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No projects listed.</p>
          )}
        </div>
      </section>
    </div>
  </div>
);

export default ModernTemplate;
