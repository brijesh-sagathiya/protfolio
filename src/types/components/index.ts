import { ReactNode } from 'react';

import { BlogPost } from '../index';

/**
 * Navbar Component Props
 */
export interface NavbarProps {
  /** Determines if the navbar should be transparent */
  transparent?: boolean;
}

/**
 * Section Header Props
 */
export interface SectionHeaderProps {
  title: string;
  subtitle: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

/**
 * Blog Card Props
 */
export interface BlogCardProps {
  /** Blog post data */
  post: BlogPost;
  /** Animation delay (in milliseconds) */
  delay?: number;
}

/**
 * Generic Section Component Props
 */
export interface SectionProps {
  /** Unique identifier for the section */
  id: string;
  /** Section content */
  children: ReactNode;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Full Width Section Props
 */
export interface FullWidthSectionProps {
  /** Unique identifier for the section */
  id: string;
  /** Section content */
  children: ReactNode;
}

/**
 * FAQ Item Props
 */
export interface FAQItemProps {
  /** Question text */
  question: string;
  /** Answer text */
  answer: string;
  /** Animation delay (in milliseconds) */
  delay?: number;
}

/**
 * Blog Portal Props
 */
export interface BlogPortalProps {
  /** Indicates if the portal is open */
  isOpen: boolean;
  /** Function to close the portal */
  onClose: () => void;
  /** Blog post title */
  title: string;
  /** Publication date */
  date: string;
  /** Featured image URL */
  image: string;
  /** Blog content */
  content: BlogPost['content'];
}

/**
 * Project Data Structure
 */
export interface Project {
  title: string;
  description: string;
  technologies: string[];
  role: string;
  achievements: string[];
  link?: string | null;
  image?: string;
}

/**
 * Project Card Component Props
 */
export interface ProjectCardProps {
  /** Project data */
  project: Project;
  /** Animation delay (in milliseconds) */
  delay?: number;
  /** Determines if the card is expanded */
  isExpanded?: boolean;
  /** Function to toggle card expansion */
  onToggle?: () => void;
}

/**
 * Logo Data Structure
 */
export interface Logo {
  name: string;
  icon: string;
  color: string;
}

/**
 * Skill Category Props
 */
export interface SkillCategoryProps {
  /** List of logos representing skills */
  logos: Logo[];
}

/**
 * Experience Item Props
 */
export interface ExperienceItemProps {
  role: string;
  company: string;
  period: string;
  description: string;
  websiteUrl?: string;
  technologies: string[];
  projects: {
    title: string;
    description: string;
    technologies: string[];
    role: string;
    achievements: string[];
  }[];
  delay?: number;
}

/**
 * Toast Notification Action Element
 */
export interface ToastActionElement {
  altText: string;
  element: React.ReactNode;
}

/**
 * Toast Notification Props
 */
export interface ToastProps {
  variant?: 'default' | 'destructive';
  title?: string;
  description?: string;
  action?: ToastActionElement;
}

/**
 * Form Submission Event Type
 */
export interface FormEvent extends React.FormEvent<HTMLFormElement> {
  target: HTMLFormElement & {
    name: { value: string };
    email: { value: string };
    message: { value: string };
  };
}

// Animated Background Types
export interface AnimatedLine {
  top: string;
  delay: string;
  width: string;
  speed: string;
  angle?: string;
}

export interface AnimatedBackgroundProps {
  className?: string;
}
