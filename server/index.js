import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const resend = new Resend(process.env.RESEND_API_KEY);

const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : ['http://localhost:5173'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['POST', 'GET'],
  credentials: true,
  optionsSuccessStatus: 200
};

const emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.path !== '/api/send-email'
});

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json({ limit: '10kb' }));
app.use(emailLimiter);

app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, or message'
      });
    }

    if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Invalid data types'
      });
    }

    if (name.length > 100 || email.length > 100 || message.length > 1000) {
      return res.status(400).json({
        success: false,
        error: 'Input exceeds maximum allowed length'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address'
      });
    }

    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL || 'onboarding@resend.dev',
      to: process.env.TO_EMAIL || email,
      replyTo: email,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="color-scheme" content="light">
          <meta name="supported-color-schemes" content="light">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f5f5f5;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5;">
            <tr>
              <td align="center" style="padding: 20px 0;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="background-color: #ffffff; max-width: 600px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
                  <tr>
                    <td style="padding: 40px 40px 30px 40px; text-align: center; border-bottom: 3px solid #10b981;">
                      <h1 style="color: #1a1a2e; margin: 0; font-size: 28px; font-weight: 700; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                        📬 New Contact Message
                      </h1>
                    </td>
                  </tr>
                  
                  <tr>
                    <td style="padding: 40px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f8f9fa; border-radius: 12px; border: 1px solid #e0e0e0;">
                        <tr>
                          <td style="padding: 30px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                              <tr>
                                <td style="padding-bottom: 20px;">
                                  <p style="margin: 0 0 8px 0; color: #10b981; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                                    Name:
                                  </p>
                                  <p style="margin: 0; color: #1a1a2e; font-size: 16px; font-weight: 500; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                                    ${name}
                                  </p>
                                </td>
                              </tr>
                              
                              <tr>
                                <td style="padding-bottom: 20px;">
                                  <p style="margin: 0 0 8px 0; color: #10b981; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                                    Email:
                                  </p>
                                  <p style="margin: 0; font-size: 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                                    <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
                                  </p>
                                </td>
                              </tr>
                              
                              <tr>
                                <td>
                                  <p style="margin: 0 0 12px 0; color: #10b981; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                                    Message:
                                  </p>
                                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 8px; border-left: 4px solid #10b981;">
                                    <tr>
                                      <td style="padding: 20px; color: #1a1a2e; font-size: 15px; line-height: 1.6; white-space: pre-wrap; word-wrap: break-word; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                                        ${message}
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  
                  <tr>
                    <td style="padding: 30px 40px 40px 40px; text-align: center; border-top: 1px solid #e0e0e0;">
                      <p style="color: #718096; font-size: 13px; margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                        This message was sent from your portfolio contact form
                      </p>
                      <p style="color: #718096; font-size: 13px; margin: 8px 0 0 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                        Reply directly to <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a> to respond
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Resend API Error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to send email'
      });
    }

    return res.status(200).json({
      success: true,
      emailId: data.id
    });

  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

