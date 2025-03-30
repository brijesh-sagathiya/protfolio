/**
 * Core data types
 */
export * from './data';

/**
 * Component types
 */
export * from './components';

/**
 * API and server types
 */
export { API_ENDPOINTS } from './api';
export type { ApiResponse, ApiEndpoint } from './api';

export type { DbConfig, ProjectService, BlogService, ContactService } from './server';

/**
 * Utility types
 */
export * from './utils';

/**
 * Theme types
 */
export type { Theme, ThemeConfig, ThemeColors } from './theme';

/**
 * Provider types
 */
export * from './providers';

/**
 * Hook types
 */
export * from './hooks';

/**
 * Page types
 */
export * from './pages';

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
  link: string | null;
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
}

export interface FAQ {
  question: string;
  answer: string;
  delay: number;
}

export interface FooterLink {
  title: string;
  links: {
    name: string;
    href: string;
  }[];
}
