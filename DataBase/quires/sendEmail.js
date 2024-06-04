export async function sendEmail(email, htmlBody, subject, message) {
  try {
    await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        htmlBody: htmlBody,
        subject: subject,
        message: message,
      }),
    });
  } catch (error) {
    console.error("Error sendEmail:", error);
  }
}
