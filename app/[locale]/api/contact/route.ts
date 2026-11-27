// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();

//     const { firstName, lastName, email, phone, topic, role, message, agreed } = body;

//     if (!firstName || !lastName || !email || !topic || !message || !agreed) {
//       return NextResponse.json(
//         { message: "Please fill in all required fields." },
//         { status: 400 }
//       );
//     }

//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASS,
//       },
//     });

//     await transporter.sendMail({
//       from: `"Happy2Tech Contact Form" <${process.env.SMTP_USER}>`,
//       to: process.env.SMTP_USER,   // ← hardcoded, no env var needed
//       replyTo: email,              // ← visitor's email, so you can reply directly
//       subject: `New Contact Form Submission: ${topic}`,
//       html: `
//         <h2>New Contact Form Submission</h2>
//         <p><strong>First name:</strong> ${firstName}</p>
//         <p><strong>Last name:</strong> ${lastName}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Phone:</strong> ${phone || "N/A"}</p>
//         <p><strong>Topic:</strong> ${topic}</p>
//         <p><strong>Role:</strong> ${role || "N/A"}</p>
//         <p><strong>Agreed to terms:</strong> ${agreed ? "Yes" : "No"}</p>
//         <p><strong>Message:</strong></p>
//         <p>${message.replaceAll('\n', "<br/>")}</p>
//       `,
//     });

//     return NextResponse.json({ message: "Message sent successfully." });
//   } catch (error) {
//     console.error("CONTACT_API_ERROR", error);
//     return NextResponse.json(
//       { message: "Failed to send message." },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { firstName, lastName, email, phone, topic, role, message, agreed, source } = body;
    const fromChatbot = source === "chatbot";

    // The chatbot only asks for a single name field, so last name is optional there.
    if (!firstName || (!lastName && !fromChatbot) || !email || !topic || !message || !agreed) {
      return NextResponse.json(
        { message: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Log env vars to confirm they're loaded (remove after debugging)
    console.log("SMTP_HOST:", process.env.SMTP_HOST);
    console.log("SMTP_USER:", process.env.SMTP_USER);
    console.log("SMTP_PASS:", process.env.SMTP_PASS ? "SET" : "NOT SET");

    // Free Zoho plans must use smtp.zoho.eu; smtppro.* is for paid plans and returns "554 Access Restricted".
    const port = Number(process.env.SMTP_PORT) || 465;
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.zoho.eu",
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verify connection before sending
    await transporter.verify();
    console.log("SMTP connection verified ✓");

    await transporter.sendMail({
      from: `"Happy2Tech Contact Form" <${process.env.SMTP_USER}>`,
      to: "info@happy2tech.fi",
      replyTo: email,
      subject: fromChatbot
        ? `New Chatbot Message from ${firstName} ${lastName || ""}`.trim()
        : `New Contact Form Submission: ${topic}`,
      html: `
        <h2>${fromChatbot ? "New Message from the Website Chatbot" : "New Contact Form Submission"}</h2>
        <p><strong>First name:</strong> ${escapeHtml(firstName)}</p>
        <p><strong>Last name:</strong> ${escapeHtml(lastName || "N/A")}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || "N/A")}</p>
        <p><strong>Topic:</strong> ${escapeHtml(topic)}</p>
        <p><strong>Role:</strong> ${escapeHtml(role || "N/A")}</p>
        <p><strong>Agreed to terms:</strong> ${agreed ? "Yes" : "No"}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replaceAll("\n", "<br/>")}</p>
      `,
    });

    return NextResponse.json({ message: "Message sent successfully." });
  } catch (error: any) {
    // Log the full error details
    console.error("CONTACT_API_ERROR:", {
      message: error.message,
      code: error.code,
      response: error.response,
      responseCode: error.responseCode,
    });
    return NextResponse.json(
      { message: error.message || "Failed to send message." },
      { status: 500 }
    );
  }
}