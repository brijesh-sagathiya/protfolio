import { BlogPost } from '@/types';
import { ApiResponse, ContactFormData } from '@/types/api';
import { Project } from '@/types/components';

/**
 * Database configuration
 */
export interface DbConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

/**
 * Project service interface
 */
export interface ProjectService {
  getProjects(): Promise<ApiResponse<Project[]>>;
  getProjectById(id: string): Promise<ApiResponse<Project>>;
}

/**
 * Blog service interface
 */
export interface BlogService {
  getPosts(): Promise<ApiResponse<BlogPost[]>>;
  getPostById(id: string): Promise<ApiResponse<BlogPost>>;
}

/**
 * Contact service interface
 */
export interface ContactService {
  sendMessage(data: ContactFormData): Promise<ApiResponse<void>>;
}

/**
 * API endpoints
 */
export const API_ENDPOINTS = {
  PROJECTS: '/api/projects',
  BLOG: '/api/blog',
  CONTACT: '/api/contact',
} as const;

/**
 * API endpoint type
 */
export type ApiEndpoint = (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS];
