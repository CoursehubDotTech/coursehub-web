import { BrevoClient } from "@getbrevo/brevo";

function getBrevoClient(): BrevoClient {
  const apiKey = process.env.BREVO_KEY;
  if (!apiKey) {
    throw new Error("BREVO_KEY environment variable is not set");
  }
  return new BrevoClient({ apiKey });
}

/** Escapes a string for safe insertion into HTML content. */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Sends a welcome email to a newly verified user.
 * This function must only ever be called from server-side code.
 */
export async function sendWelcomeEmail(
  email: string,
  name: string,
): Promise<void> {
  const brevo = getBrevoClient();
  const safeName = escapeHtml(name);

  await brevo.transactionalEmails.sendTransacEmail({
    sender: { email: "hello@coursehub.tech", name: "CourseHub" },
    to: [{ email, name }],
    subject: "Welcome to CourseHub!",
    htmlContent: `
      <html>
        <body>
          <h1>Welcome to CourseHub, ${safeName}!</h1>
          <p>
            We're thrilled to have you on board. CourseHub is a free platform
            where you can learn tech through clean, text-based lessons and earn
            shareable certificates — no paywalls, no friction.
          </p>
          <p>
            <a href="https://coursehub.tech/courses">Browse courses</a> and
            start learning today!
          </p>
          <p>Happy learning,<br/>The CourseHub Team</p>
        </body>
      </html>
    `,
  });
}
