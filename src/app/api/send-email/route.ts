import { NextResponse } from "next/server";

import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, message } = body;

    // Validate inputs
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "pavanhutagi@gmail.com",
      subject: `New contact form submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Contact Form Submission</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .container {
              border: 1px solid #dddddd;
              border-radius: 5px;
              padding: 20px;
              background-color: #f9f9f9;
            }
            .header {
              background-color: #4a5568;
              color: white;
              padding: 15px;
              border-radius: 5px;
              margin: -20px -20px 20px -20px;
            }
            .content {
              padding: 0 10px;
            }
            .field {
              margin-bottom: 15px;
            }
            .label {
              font-weight: bold;
              margin-bottom: 5px;
            }
            .message-box {
              background-color: white;
              border: 1px solid #dddddd;
              border-radius: 3px;
              padding: 15px;
              margin-top: 5px;
            }
            .footer {
              margin-top: 20px;
              font-size: 12px;
              color: #666666;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0; text-align: center;">New Contact Form Submission</h2>
            </div>
            <br/>
            <div class="content">
              <div class="field">
                <div class="label">Name: ${name}</div>
              </div>
              <div class="field">
                <div class="label">Email: ${email}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="message-box">${message.replace(/\n/g, "<br>")}</div>
              </div>
            </div>
            <br/>
            <div class="footer">
              <p>This email was sent from your website contact form.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
