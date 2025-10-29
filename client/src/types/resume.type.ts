export interface IPersonalInfo {
  _id?: string;
  userId: string;
  title: string;
  fullname: string;
  email: string;
  phone: string;
  location: string;
  profession: string;
}

export interface IExperience {
  _id?: number;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface IEducation {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface IProject {
  name: string;
  description: string;
  link?: string;
  technologies?: string[];
}
export interface IResume {
  title: string;
  personal_info: IPersonalInfo;
  experience: IExperience[];
  education: IEducation[];
  projects: IProject[];
  summary: string;
  skills: string[];
  template: string;
  accent_color: string;
  public: boolean;
}
