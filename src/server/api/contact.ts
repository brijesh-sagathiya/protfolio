import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

import {
  ContactFormData,
  ContactSuccessResponse,
  ContactErrorResponse,
  EmailConfig,
} from '@/types/api';

import { supabase } from '../db';

// Load environment variables
const emailConfig: EmailConfig = {
  host: process.env.EMAIL_HOST || '',
  port: Number(process.env.EMAIL_PORT) || 587,
  user: process.env.EMAIL_USER || '',
  pass: process.env.EMAIL_PASS || '',
};

/**
 * Handles the contact form submission:
 * - Saves data to Supabase
 * - Sends an email notification using Nodemailer
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @author Brijesh Sagathiya
 */
export async function handleContact(
  req: Request<Record<string, never>, Record<string, never>, ContactFormData>,
  res: Response<ContactSuccessResponse | ContactErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Save contact data to Supabase
    const { error: dbError } = await supabase.from('contacts').insert([{ name, email, message }]);

    if (dbError) {
      console.error('Supabase Error:', dbError);
      throw new Error('Failed to save contact data');
    }

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: emailConfig.host,
      port: emailConfig.port,
      secure: emailConfig.port === 465, // true for 465, false for other ports
      auth: {
        user: emailConfig.user,
        pass: emailConfig.pass,
      },
    });

    // Send email notification
    await transporter.sendMail({
      from: `"No Reply" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'New Contact Form Submission',
      html: `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Portfolio Contact Form Submission</title>
            <style>
              :root {
                --primary-color: #3498db;
                --secondary-color: #2ecc71;
                --text-color: #2c3e50;
                --background-color: #f4f6f7;
                --white: #ffffff;
              }
              
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                line-height: 1.6;
                color: var(--text-color);
                margin: 0;
                padding: 0;
                background-color: var(--background-color);
              }
              
              .container {
                max-width: 600px;
                margin: 25px auto;
                border-radius: 12px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                overflow: hidden;
                background-color: var(--white);
              }
              
              .header {
                background: linear-gradient(90deg, var(--background-color), var(--text-color), var(--background-color));
                color: var(--white);
                text-align: center;
                padding: 25px 20px;
                position: relative;
              }
              
              .header::after {
                content: '';
                position: absolute;
                bottom: -10px;
                left: 0;
                width: 100%;
                height: 10px;
                background: linear-gradient(to right, var(--background-color), var(--text-color), var(--background-color));
                opacity: 0.7;
              }
              
              .header h2 {
                margin: 0;
                font-size: 24px;
                font-weight: 600;
                letter-spacing: 0.5px;
              }
              
              .content {
                padding: 30px 25px;
              }
              
              .field {
                margin-bottom: 20px;
                border-bottom: 1px solid #ecf0f1;
                padding-bottom: 15px;
              }
              
              .field:last-child {
                border-bottom: none;
              }
              
              .field-label {
                font-weight: 600;
                color: var(--primary-color);
                margin-bottom: 8px;
                display: block;
                text-transform: uppercase;
                font-size: 14px;
                letter-spacing: 0.5px;
              }
              
              .field-value {
                background-color: #f8f9fa;
                padding: 12px 15px;
                border-radius: 6px;
                border: 1px solid #e9ecef;
                word-break: break-word;
                font-size: 16px;
              }
              
              .message-box {
                background-color: #f1f3f5;
                padding: 15px;
                border-radius: 6px;
                border: 1px solid #dee2e6;
                white-space: pre-wrap;
                word-break: break-word;
                max-height: 200px;
                overflow-y: auto;
              }
              
              .footer {
                text-align: center;
                padding: 15px;
                background-color: #f8f9fa;
                color: #6c757d;
                font-size: 12px;
                border-top: 1px solid #e9ecef;
              }
              
              a {
                color: var(--primary-color);
                text-decoration: none;
                transition: color 0.3s ease;
              }
              
              a:hover {
                color: var(--secondary-color);
                text-decoration: underline;
              }
              
              @media only screen and (max-width: 600px) {
                .container {
                  margin: 0;
                  width: 100%;
                  border-radius: 0;
                  box-shadow: none;
                }
                
                .content {
                  padding: 20px 15px;
                }
                
                .field-value, .message-box {
                  font-size: 14px;
                }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>New Portfolio Contact Form - ${name}</h2>
              </div>
              <div class="content">
                <div class="field">
                  <span class="field-label">Name</span>
                  <div class="field-value">${escapeHtml(name)}</div>
                </div>
                <div class="field">
                  <span class="field-label">Email</span>
                  <div class="field-value">
                    <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>
                  </div>
                </div>
                <div class="field">
                  <span class="field-label">Message</span>
                  <div class="message-box">${escapeHtml(message)}</div>
                </div>
                  <div class="field">
                    <span class="field-label">Date & Time</span>
                    <div class="field-value">
                      ${new Date()
                        .toLocaleString('en-IN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false,
                        })
                        .replace(',', '')}
                    </div>
                  </div>
              </div>
              <div class="footer">
                © ${new Date().getFullYear()} Portfolio Contact Form | Powered by Brijesh Sagathiya
              </div>
            </div>
          </body>
        </html>
      `,
    });

    // Utility function to escape HTML to prevent XSS
    function escapeHtml(unsafe: string) {
      return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    return res.status(200).json({ message: 'Message saved and email sent!' });
  } catch (error) {
    console.error('Error handling contact:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}
