// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

// Resume Upload Types
export interface ResumeUploadResponse {
  success: boolean;
  message: string;
  url?: string;
}

// API Error Types
export interface ApiError {
  error: string;
  message: string;
  status: number;
}

/**
 * API response type
 */
export interface ApiResponse<T> {
  data?: T;
  error?: string;
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

export * from './contact';
export * from './resume';
