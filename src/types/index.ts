export interface BaseContent {
  id: string;
  title: string;
  publishDate: string;
  tags?: string[];
  summary?: string;
}

export interface Education {
  school: string;
  degree: string;
  major?: string;
  period: string;
  gpa?: string;
  achievements?: string[];
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location?: string;
  responsibilities: string[];
  achievements?: string[];
}

export interface Project {
  name: string;
  role: string;
  period: string;
  techStack: string[];
  description: string;
  highlights: string[];
  url?: string;
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
}

export interface ResumeData {
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: Record<string, string[]>;
  certifications: Certification[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  showInHomePage?: boolean;
  ariaLabel?: string;
  openInNewTab?: boolean;
}

export interface Achievement {
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface Tool {
  name: string;
  description: string;
  techStack: string[];
  githubUrl: string;
}

export interface BookNote extends BaseContent {
  author: string;
  rating: number;
}

export interface ProfileConfig {
  name: string;
  title: string;
  subtitle: string;
  avatar: {
    enabled: boolean;
    path: string;
    alt: string;
  };
}
