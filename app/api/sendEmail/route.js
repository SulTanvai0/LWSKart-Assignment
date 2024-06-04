import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
});

export async function POST(request) {
  try {
    const req = await request.json();

    const { email, htmlBody, subject, message } = req;
    await transporter.sendMail({
      from: {
        name: "LWSKart",
        address: process.env.USER,
      },
      to: email,
      subject: subject,
      text: message || " ",
      html: htmlBody,
    });

    return  Response(
      JSON.stringify({ message: "email sent successfully " }),
      { status: 200 }
    );
  } catch (err) {
    return  Response(JSON.stringify({ error: err.message }), {
      status: 404,
    });
  }
}
