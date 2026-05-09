export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold">Privacy Policy</h1>

      <section className="mt-6 space-y-3 text-sm text-gray-700 dark:text-gray-300">
        <p>
          Coursehub is committed to GDPR-aligned privacy practices. We collect only the data
          needed to provide the service, such as account and learning-related information.
        </p>
        <p>
          We do not sell or share your personal data with third parties for marketing or
          advertising purposes.
        </p>
        <p>
          Account creation, authentication, and account management are handled by Clerk as our
          identity provider.
        </p>
        <p>
          You may request access, correction, or deletion of your personal data, and you may
          contact us to exercise your GDPR rights.
        </p>
      </section>
    </main>
  );
}
