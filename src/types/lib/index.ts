import { Variants } from 'framer-motion';

/**
 * Navigation variants for animations
 */
export interface NavigationVariants {
  hidden: Variants;
  visible: Variants;
}

/**
 * Sidebar variants for animations
 */
export interface SidebarVariants {
  hidden: Variants;
  visible: Variants;
}

/**
 * Form variants for animations
 */
export interface FormVariants {
  hidden: Variants;
  visible: Variants;
}

/**
 * Utility function types
 */
export interface Utils {
  cn: (...inputs: unknown[]) => string;
}

/**
 * Constants type
 */
export interface Constants {
  siteConfig: {
    name: string;
    description: string;
    url: string;
    ogImage: string;
    links: {
      github: string;
      linkedin: string;
      twitter: string;
    };
  };
  navigation: {
    name: string;
    href: string;
  }[];
  footerLinks: {
    title: string;
    links: {
      name: string;
      href: string;
    }[];
  }[];
}

export * from './utils';
export * from './variants';
export * from './supabase';
