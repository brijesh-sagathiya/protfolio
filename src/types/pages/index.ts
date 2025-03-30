import { BlogPost } from '@/types';
import { Project } from '@/types/components';

/**
 * Home page props
 */
export interface HomePageProps {
  projects: Project[];
  posts: BlogPost[];
}

/**
 * Not found page props
 */
export interface NotFoundPageProps {
  className?: string;
}

/**
 * Section props for home page
 */
export interface HomeSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Hero section props
 */
export interface HeroSectionProps {
  className?: string;
}

/**
 * About section props
 */
export interface AboutSectionProps {
  className?: string;
}

/**
 * Projects section props
 */
export interface ProjectsSectionProps {
  projects: Project[];
  className?: string;
}

/**
 * Blog section props
 */
export interface BlogSectionProps {
  posts: BlogPost[];
  className?: string;
}

/**
 * Contact section props
 */
export interface ContactSectionProps {
  className?: string;
}
