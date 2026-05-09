import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Coursehub',
  description: 'Coursehub Terms of Service, including account handling via Clerk and GDPR-aligned commitments.',
};

export default function TermsOfServicePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold">Terms of Service</h1>

      <section className="mt-6 space-y-3 text-sm text-gray-700 dark:text-gray-300">
        <p>
          By using Coursehub, you agree to use the platform lawfully and respectfully.
          You are responsible for your account activity and for keeping your account secure.
        </p>
        <p>
          User authentication and account management are provided by Clerk. Account sign-in,
          account profile management, and related identity operations are handled through
          Clerk services.
        </p>
        <p>
          Coursehub content is provided for educational purposes. We may update or discontinue
          parts of the service at any time to improve reliability, safety, and compliance.
        </p>
        <p>
          These terms are intended to align with GDPR principles, including data minimization,
          transparency, and user rights.
        </p>
      </section>
    </main>
  );
}
