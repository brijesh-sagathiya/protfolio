import fs from 'fs';
import path from 'path';

import { Request, Response } from 'express';
import formidable from 'formidable';

import { ResumeConfig, ResumeUploadResponse, ResumeErrorResponse } from '@/types/api';

/**
 * Resume upload configuration
 */
const config: ResumeConfig = {
  API_KEY: 'dev-resume-brij',
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  UPLOAD_DIR: path.join(process.cwd(), 'public', 'resume'),
  TEMP_DIR: path.join(process.cwd(), 'tmp'),
  FINAL_FILENAME: 'resume_dev_latest.pdf',
};

/**
 * Handles resume file upload:
 * - Validates API key
 * - Ensures file is PDF
 * - Renames and stores file as resume_dev_latest.pdf in public/resume directory
 * @param {Request} req - The Express request object
 * @param {Response} res - The Express response object
 * @author Brijesh Sagathiya
 */
export default async function handleResume(
  req: Request,
  res: Response<ResumeUploadResponse | ResumeErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Check API key
  const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== config.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized - Invalid API key' });
  }

  try {
    // Ensure upload directory exists
    if (!fs.existsSync(config.UPLOAD_DIR)) {
      fs.mkdirSync(config.UPLOAD_DIR, { recursive: true });
    }

    // Create temporary upload directory
    if (!fs.existsSync(config.TEMP_DIR)) {
      fs.mkdirSync(config.TEMP_DIR, { recursive: true });
    }

    // Configure formidable
    const form = formidable({
      maxFileSize: config.MAX_FILE_SIZE,
      uploadDir: config.TEMP_DIR,
      keepExtensions: true,
      filter: ({ mimetype }) => {
        // Only accept PDF files
        return mimetype === 'application/pdf';
      },
    });

    // Parse the form data
    const [_fields, files] = await form.parse(req);
    const uploadedFile = files.file?.[0];

    if (!uploadedFile) {
      return res.status(400).json({ error: 'No file uploaded or invalid file type' });
    }

    // Define final path
    const finalPath = path.join(config.UPLOAD_DIR, config.FINAL_FILENAME);

    try {
      // If a file already exists, delete it
      if (fs.existsSync(finalPath)) {
        fs.unlinkSync(finalPath);
      }

      // Copy file to final destination
      fs.copyFileSync(uploadedFile.filepath, finalPath);

      // Clean up temporary file
      fs.unlinkSync(uploadedFile.filepath);

      res.status(200).json({
        success: true,
        message: 'Resume uploaded successfully',
        url: `/resume/${config.FINAL_FILENAME}`,
      });
    } catch (fsError) {
      console.error('File system error:', fsError);
      // Clean up temporary file if it exists
      if (fs.existsSync(uploadedFile.filepath)) {
        fs.unlinkSync(uploadedFile.filepath);
      }
      throw new Error('Failed to process uploaded file');
    }
  } catch (error) {
    console.error('Upload error:', error);

    if (error.message.includes('maxFileSize exceeded')) {
      return res.status(400).json({ error: 'File size exceeds 5MB limit' });
    }

    if (error.message.includes('Invalid file type')) {
      return res.status(400).json({ error: 'Only PDF files are allowed' });
    }

    return res.status(500).json({ error: 'Error uploading file' });
  }
}
