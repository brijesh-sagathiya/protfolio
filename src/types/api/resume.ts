/**
 * Resume upload configuration
 */
export interface ResumeConfig {
  API_KEY: string;
  MAX_FILE_SIZE: number;
  UPLOAD_DIR: string;
  TEMP_DIR: string;
  FINAL_FILENAME: string;
}

/**
 * Resume upload success response
 */
export interface ResumeUploadResponse {
  message: string;
  filename: string;
  originalName: string;
}

/**
 * Resume upload error response
 */
export interface ResumeErrorResponse {
  error: string;
}
