/**
 * Logo type
 */
export interface Logo {
  name: string;
  icon: string;
  color: string;
}

/**
 * Skill category type
 */
export interface SkillCategory {
  logos: Logo[];
}

/**
 * Project type
 */
export interface Project {
  title: string;
  description: string;
  link: string | null;
  technologies: string[];
  role: string;
  achievements: string[];
  delay?: number;
}

/**
 * Experience item type
 */
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

/**
 * Blog post type
 */
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
}

/**
 * FAQ type
 */
export interface FAQ {
  question: string;
  answer: string;
  delay: number;
}

/**
 * Footer link type
 */
export interface FooterLink {
  title: string;
  links: {
    name: string;
    href: string;
  }[];
}
