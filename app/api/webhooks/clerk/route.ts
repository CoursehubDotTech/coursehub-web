import { Webhook } from "svix";
import { sendWelcomeEmail } from "@/app/lib/brevo";

/**
 * Clerk sends a POST to this route for every subscribed event.
 * The `user.created` event fires once a user completes verified sign-up.
 *
 * Required environment variables:
 *   CLERK_WEBHOOK_SECRET — signing secret from the Clerk dashboard
 *   BREVO_KEY            — Brevo API key used by the email utility
 */
export async function POST(request: Request) {
  const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("CLERK_WEBHOOK_SECRET is not set");
    return Response.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  // Collect the raw body and svix signature headers needed for verification.
  const payload = await request.text();
  const svixId = request.headers.get("svix-id");
  const svixTimestamp = request.headers.get("svix-timestamp");
  const svixSignature = request.headers.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return Response.json({ error: "Missing svix headers" }, { status: 400 });
  }

  // Verify the webhook payload to ensure it originated from Clerk.
  let event: { type: string; data: Record<string, unknown> };
  try {
    const wh = new Webhook(webhookSecret);
    event = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as typeof event;
  } catch {
    return Response.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  if (event.type === "user.created") {
    const emailAddresses = event.data.email_addresses as
      | Array<{ email_address: string }>
      | undefined;
    const firstName = (event.data.first_name as string | null) ?? "";
    const lastName = (event.data.last_name as string | null) ?? "";
    const name = [firstName, lastName].filter(Boolean).join(" ") || "there";
    const email = emailAddresses?.[0]?.email_address;

    if (email) {
      try {
        await sendWelcomeEmail(email, name);
      } catch (error) {
        // Log but do not surface the error to the caller — email delivery
        // failures should not block user creation acknowledgment.
        console.error("Failed to send welcome email:", error);
      }
    }
  }

  return Response.json({ received: true });
}
