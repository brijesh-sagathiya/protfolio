import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import { supabase } from '../db';

// Load environment variables
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_PORT = Number(process.env.EMAIL_PORT);
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

/**
 * Handles the contact form submission:
 * - Saves data to Supabase
 * - Sends an email notification using Nodemailer
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @author Brijesh Sagathiya
 */
export async function handleContact(req: Request, res: Response) {
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
      host: EMAIL_HOST,
      port: EMAIL_PORT,
      secure: EMAIL_PORT === 465, // true for 465, false for other ports
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    // Send email notification
    await transporter.sendMail({
      from: `"No Reply" <${EMAIL_USER}>`,
      to: email,
      subject: 'New Contact Form Submission',
      html: `
    <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
      <h2 style="color: #333; text-align: center;">New Contact Message</h2>
      <div style="background: #fff; padding: 15px; border-radius: 5px;">
        <p style="margin: 0; font-size: 16px;"><strong>Name:</strong> ${name}</p>
        <p style="margin: 5px 0; font-size: 16px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #007BFF; text-decoration: none;">${email}</a></p>
        <p style="margin-top: 15px; font-size: 16px;"><strong>Message:</strong></p>
        <p style="background: #f4f4f4; padding: 10px; border-radius: 5px; font-size: 14px; line-height: 1.5;">${message}</p>
      </div>
      <footer style="margin-top: 20px; text-align: center; font-size: 12px; color: #777;">
        <p>&copy; ${new Date().getFullYear()} Your Company. All rights reserved.</p>
      </footer>
    </div>
  `,
    });

    return res.status(200).json({ message: 'Message saved and email sent!' });
  } catch (error) {
    console.error('Error handling contact:', error);
    return res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal server error',
    });
  }
}
