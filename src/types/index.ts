export interface Logo {
  name: string;
  icon: string;
  color: string;
}

export interface SkillCategory {
  logos: Logo[];
}

export interface Project {
  title: string;
  description: string;
  link: string;
  technologies: string[];
  role: string;
  achievements: string[];
  delay?: number;
}

export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  websiteUrl?: string;
  technologies: string[];
  projects: Project[];
  delay?: number;
}

export interface BlogPost {
  title: string;
  date: string;
  image: string;
  delay?: number;
  content: {
    description: string;
    points: string[];
    references: {
      title: string;
      url: string;
    }[];
  };
  projectDetails?: {
    timeSpent?: string;
    rating?: number;
    efficiency?: number;
    progress?: number;
  };
}

export interface FAQ {
  question: string;
  answer: string;
  delay: number;
}
