export interface PersonalInfo {
  fullname: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  profession: string;
  image?: string | File;
  _id: string;
  userId: string;
  title: string;
}

export interface Education {
  _id?: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  location: string;
  description?: string;
}

export interface Experience {
  _id?: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  current?: boolean;
}

export interface Skill {
  _id?: string;
  name: string;
  level?: string;
  category?: string;
}

export interface Language {
  _id: string;
  name: string;
  level: string;
}

export interface Project {
  _id?: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate?: string;
  endDate?: string;
}

export interface Certificate {
  _id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
}

export interface Resume {
  _id: string;
  title: string;
  personal_info: PersonalInfo;
  summary?: string;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  languages?: Language[];
  projects: Project[];
  template?: string;
  accent_color?: string;
  public?: boolean;
  image?: string | File;
  certificates?: Certificate[];
  createdAt?: string;
  updatedAt?: string;
}

// export const dummyResumeData: Resume[] = [
//   {
//     _id: "resume_001",
//     title: "resume",
//     personal_info: {
//       fullname: "Ahmet Yılmaz",
//       email: "ahmet.yilmaz@email.com",
//       phone: "+90 555 123 4567",
//       location: "İstanbul, Türkiye",
//       linkedin: "linkedin.com/in/ahmetyilmaz",
//       website: "ahmetyilmaz.com",
//       profession: "Full Stack Developer",
//       image: "https://i.pravatar.cc/150?img=12",
//       _id: "personal_001",
//       userId: "user_123",
//       title: "Senior Software Engineer",
//     },
//     summary:
//       "5+ yıllık deneyime sahip Full Stack Developer. React, Node.js ve cloud teknolojilerinde uzman. Agile metodolojiler ile çalışma deneyimi.",
//     education: [
//       {
//         _id: "edu_001",
//         school: "Boğaziçi Üniversitesi",
//         degree: "Lisans",
//         field: "Bilgisayar Mühendisliği",
//         startDate: "2015-09",
//         endDate: "2019-06",
//         location: "İstanbul, Türkiye",
//         description: "GPA: 3.5/4.0",
//       },
//       {
//         _id: "edu_002",
//         school: "İstanbul Teknik Üniversitesi",
//         degree: "Yüksek Lisans",
//         field: "Yazılım Mühendisliği",
//         startDate: "2019-09",
//         endDate: "2021-06",
//         location: "İstanbul, Türkiye",
//       },
//     ],
//     experience: [
//       {
//         _id: "exp_001",
//         company: "Tech Startup A.Ş.",
//         position: "Senior Full Stack Developer",
//         startDate: "2021-07",
//         endDate: "Present",
//         location: "İstanbul, Türkiye",
//         description:
//           "React ve Node.js kullanarak e-ticaret platformu geliştirdim. Mikroservis mimarisi ile REST API tasarımı yaptım. 10+ kişilik geliştirici ekibine teknik liderlik ettim.",
//         current: true,
//       },
//       {
//         _id: "exp_002",
//         company: "Digital Agency Ltd.",
//         position: "Frontend Developer",
//         startDate: "2019-07",
//         endDate: "2021-06",
//         location: "İstanbul, Türkiye",
//         description:
//           "React ve Vue.js kullanarak kurumsal web uygulamaları geliştirdim. Responsive ve SEO-friendly frontend çözümleri ürettim.",
//       },
//     ],
//     skills: [
//       {
//         _id: "skill_001",
//         name: "React",
//         level: "Expert",
//         category: "Frontend",
//       },
//       {
//         _id: "skill_002",
//         name: "Node.js",
//         level: "Advanced",
//         category: "Backend",
//       },
//       {
//         _id: "skill_003",
//         name: "TypeScript",
//         level: "Advanced",
//         category: "Programming Language",
//       },
//       {
//         _id: "skill_004",
//         name: "MongoDB",
//         level: "Intermediate",
//         category: "Database",
//       },
//       {
//         _id: "skill_005",
//         name: "AWS",
//         level: "Intermediate",
//         category: "Cloud",
//       },
//     ],
//     languages: [
//       {
//         _id: "lang_001",
//         name: "Türkçe",
//         level: "Native",
//       },
//       {
//         _id: "lang_002",
//         name: "İngilizce",
//         level: "Advanced",
//       },
//     ],
//     projects: [
//       {
//         _id: "proj_001",
//         name: "E-Commerce Platform",
//         description:
//           "Tam özellikli e-ticaret platformu. Ödeme entegrasyonu, envanter yönetimi ve analytics dashboard içeriyor.",
//         technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
//         link: "https://github.com/ahmetyilmaz/ecommerce",
//         startDate: "2022-01",
//         endDate: "2023-06",
//       },
//       {
//         _id: "proj_002",
//         name: "Real-time Chat Application",
//         description:
//           "WebSocket tabanlı gerçek zamanlı sohbet uygulaması. Grup sohbetleri ve dosya paylaşımı özellikleri.",
//         technologies: ["React", "Socket.io", "Node.js", "Redis"],
//         link: "https://github.com/ahmetyilmaz/chat-app",
//       },
//     ],
//     certificates: [
//       {
//         _id: "cert_001",
//         name: "AWS Certified Solutions Architect",
//         issuer: "Amazon Web Services",
//         date: "2022-08",
//         credentialId: "AWS-123456",
//         link: "https://aws.amazon.com/verification",
//       },
//       {
//         _id: "cert_002",
//         name: "MongoDB Certified Developer",
//         issuer: "MongoDB University",
//         date: "2021-05",
//         credentialId: "MONGO-789012",
//       },
//     ],
//     createdAt: "2023-01-15T10:30:00Z",
//     updatedAt: "2024-10-20T14:45:00Z",
//   },
//   {
//     _id: "resume_002",
//     title: "resume",
//     personal_info: {
//       fullname: "Ayşe Demir",
//       email: "ayse.demir@email.com",
//       phone: "+90 555 987 6543",
//       location: "Ankara, Türkiye",
//       linkedin: "linkedin.com/in/aysedemir",
//       profession: "UI/UX Designer",
//       image: "https://i.pravatar.cc/150?img=5",
//       _id: "personal_002",
//       userId: "user_456",
//       title: "Senior Product Designer",
//     },
//     summary:
//       "Kullanıcı deneyimi odaklı tasarımlar yapan, 4 yıllık deneyime sahip UI/UX Designer. Figma ve Adobe XD uzmanı.",
//     education: [
//       {
//         _id: "edu_003",
//         school: "Hacettepe Üniversitesi",
//         degree: "Lisans",
//         field: "Grafik Tasarım",
//         startDate: "2016-09",
//         endDate: "2020-06",
//         location: "Ankara, Türkiye",
//       },
//     ],
//     experience: [
//       {
//         _id: "exp_003",
//         company: "Design Studio",
//         position: "Senior UI/UX Designer",
//         startDate: "2022-03",
//         endDate: "Present",
//         location: "Ankara, Türkiye",
//         description:
//           "Mobil ve web uygulamaları için kullanıcı arayüzü tasarımları oluşturdum. User research ve usability testing yürüttüm.",
//         current: true,
//       },
//       {
//         _id: "exp_004",
//         company: "Creative Agency",
//         position: "UI Designer",
//         startDate: "2020-07",
//         endDate: "2022-02",
//         location: "Ankara, Türkiye",
//         description:
//           "Kurumsal projeler için modern ve kullanıcı dostu arayüzler tasarladım.",
//       },
//     ],
//     skills: [
//       {
//         _id: "skill_006",
//         name: "Figma",
//         level: "Expert",
//         category: "Design Tools",
//       },
//       {
//         _id: "skill_007",
//         name: "Adobe XD",
//         level: "Advanced",
//         category: "Design Tools",
//       },
//       {
//         _id: "skill_008",
//         name: "User Research",
//         level: "Advanced",
//         category: "UX",
//       },
//       {
//         _id: "skill_009",
//         name: "Prototyping",
//         level: "Expert",
//         category: "UX",
//       },
//     ],
//     languages: [
//       {
//         _id: "lang_003",
//         name: "Türkçe",
//         level: "Native",
//       },
//       {
//         _id: "lang_004",
//         name: "İngilizce",
//         level: "Intermediate",
//       },
//     ],
//     projects: [
//       {
//         _id: "proj_003",
//         name: "Banking Mobile App Redesign",
//         description:
//           "Mobil bankacılık uygulaması için UX araştırması ve yeniden tasarım projesi.",
//         technologies: ["Figma", "Adobe XD", "Principle"],
//         link: "https://behance.net/aysedemir/banking-app",
//       },
//     ],
//     certificates: [
//       {
//         _id: "cert_003",
//         name: "Google UX Design Certificate",
//         issuer: "Google",
//         date: "2021-11",
//         link: "https://coursera.org/verify/certificate",
//       },
//     ],
//     createdAt: "2023-05-20T09:15:00Z",
//     updatedAt: "2024-10-18T11:20:00Z",
//   },
// ];
