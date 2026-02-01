export interface BaseContent {
  id: string;
  title: string;
  publishDate: string;
  tags?: string[];
  summary?: string;
}

export interface ResumeData {
  education: Array<{ school: string; degree: string; period: string }>;
  experience: Array<{ company: string; role: string; achievements: string[]; period: string }>;
  skills: Record<string, string[]>;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
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
