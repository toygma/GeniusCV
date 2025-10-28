import type { Resume } from "@/assets/assts";
import {  Mail, Phone, MapPin } from "lucide-react";

interface MinimalImageTemplateProps {
  data: Resume;
  accentColor?: string;
  getImageUrl:any;
}

const MinimalImageTemplate = ({
  data,
  accentColor,
  getImageUrl
}: MinimalImageTemplateProps) => (
  <div className="w-full h-full p-10 bg-white text-gray-800 font-sans leading-relaxed">
    {/* Header */}
    <div
      className="flex items-center space-x-8 pb-8 border-b-4"
      style={{ borderColor: accentColor }}
    >
      {data.personal_info.image ? (
        <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden shadow-inner">
          <img
            src={getImageUrl(data.personal_info.image)}
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
      ) : null}

      <div>
        <h1 className="text-5xl font-bold tracking-tight text-gray-900">
          {data.personal_info.fullname || "Full Name"}
        </h1>
        <p className="text-2xl font-medium mt-2" style={{ color: accentColor }}>
          {data.personal_info.profession || "Professional Title"}
        </p>
      </div>
    </div>

    {/* Body */}
    <div className="mt-10 grid grid-cols-3 gap-10">
      {/* Left Column */}
      <div className="col-span-2 space-y-10">
        {/* Profile */}
        <section>
          <h2
            className="text-lg font-semibold uppercase tracking-wider border-b-2 pb-2"
            style={{ borderColor: accentColor }}
          >
            Profile
          </h2>
          <p className="mt-3 text-gray-700 text-sm">
            {data.summary ||
              "Motivated and detail-oriented professional with a passion for innovation, collaboration, and continuous learning."}
          </p>
        </section>

        {/* Experience */}
        <section>
          <h2
            className="text-lg font-semibold uppercase tracking-wider border-b-2 pb-2"
            style={{ borderColor: accentColor }}
          >
            Experience
          </h2>
          <div className="mt-4 space-y-6">
            {data.experience?.length > 0 ? (
              data.experience.map((exp,index) => (
                <div key={index} className="text-sm">
                  <h3 className="text-base font-semibold text-gray-900">
                    {exp.position || "Job Title"}
                  </h3>
                  <p className="text-gray-600 font-medium">
                    {exp.company} —{" "}
                    <span className="text-gray-500">{exp.location}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
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
            className="text-lg font-semibold uppercase tracking-wider border-b-2 pb-2"
            style={{ borderColor: accentColor }}
          >
            Projects
          </h2>
          <div className="mt-4 space-y-5">
            {data.projects?.length > 0 ? (
              data.projects.map((proj) => (
                <div key={proj._id} className="text-sm">
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

      {/* Right Column */}
      <div className="col-span-1 space-y-8">
        {/* Contact */}
        <section>
          <h3
            className="text-lg font-semibold uppercase tracking-wider border-b-2 pb-2"
            style={{ borderColor: accentColor }}
          >
            Contact
          </h3>
          <div className="mt-3 space-y-2 text-sm">
            {data.personal_info.email && (
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />{" "}
                {data.personal_info.email}
              </p>
            )}
            {data.personal_info.phone && (
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />{" "}
                {data.personal_info.phone}
              </p>
            )}
            {data.personal_info.location && (
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />{" "}
                {data.personal_info.location}
              </p>
            )}
          </div>
        </section>

        {/* Education */}
        <section>
          <h3
            className="text-lg font-semibold uppercase tracking-wider border-b-2 pb-2"
            style={{ borderColor: accentColor }}
          >
            Education
          </h3>
          <div className="mt-3 space-y-4 text-sm">
            {data.education?.length > 0 ? (
              data.education.map((edu) => (
                <div key={edu._id}>
                  <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                  <p className="text-gray-600">{edu.school}</p>
                  <p className="text-xs text-gray-500">
                    {edu.startDate} - {edu.endDate || "Present"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No education added yet.</p>
            )}
          </div>
        </section>

        {/* Skills */}
        <section>
          <h3
            className="text-lg font-semibold uppercase tracking-wider border-b-2 pb-2"
            style={{ borderColor: accentColor }}
          >
            Skills
          </h3>
          <ul className="mt-3 space-y-1 list-disc list-inside text-sm">
            {data.skills?.length > 0 ? (
              data.skills.map((skill) => (
                <li key={skill._id}>
                  {skill.name}
                  {skill.level ? ` — ${skill.level}` : ""}
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-500">No skills added yet.</p>
            )}
          </ul>
        </section>
      </div>
    </div>
  </div>
);

export default MinimalImageTemplate;
