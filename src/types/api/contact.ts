/**
 * Contact form data
 */
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

/**
 * Contact form success response
 */
export interface ContactSuccessResponse {
  message: string;
}

/**
 * Contact form error response
 */
export interface ContactErrorResponse {
  error: string;
}

/**
 * Email configuration
 */
export interface EmailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
}
