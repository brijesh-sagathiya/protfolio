/**
 * Utility function types
 */
export interface Utils {
  cn: (...inputs: unknown[]) => string;
}

/**
 * Site configuration type
 */
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

/**
 * Navigation link type
 */
export interface NavigationLink {
  name: string;
  href: string;
}

/**
 * Footer link type
 */
export interface FooterLink {
  name: string;
  href: string;
}

/**
 * Footer section type
 */
export interface FooterSection {
  title: string;
  links: FooterLink[];
}

/**
 * Constants type
 */
export interface Constants {
  siteConfig: SiteConfig;
  navigation: NavigationLink[];
  footerLinks: FooterSection[];
}
