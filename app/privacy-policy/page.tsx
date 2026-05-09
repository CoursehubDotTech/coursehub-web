import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Coursehub',
  description: 'Coursehub Privacy Policy with GDPR-aligned commitments, data-sharing terms, and Clerk account management details.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold">Privacy Policy</h1>

      <section className="mt-6 space-y-3 text-sm text-gray-700 dark:text-gray-300">
        <p>
          Coursehub is committed to GDPR-aligned privacy practices. We collect only the data
          needed to provide the service, such as your name, email address, authentication
          identifiers, and learning-related progress data.
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
          For details on how Clerk processes personal data, please see the{' '}
          <Link
            href="https://clerk.com/legal/privacy"
            className="text-purple-700 hover:text-purple-800 dark:text-purple-400 dark:hover:text-purple-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Clerk Privacy Policy
          </Link>
          .
        </p>
        <p>
          You may request access, correction, or deletion of your personal data, and you may
          contact us at privacy@coursehub.tech to exercise your GDPR rights. We aim to respond
          to GDPR data requests within 30 days.
        </p>
      </section>
    </main>
  );
}
