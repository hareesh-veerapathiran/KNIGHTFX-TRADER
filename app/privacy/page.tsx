import Link from 'next/link';
import { site } from '@/data/site';

export const metadata = {
  title: 'Privacy Policy | KNIGHTFX TRADERS',
  description: 'How KNIGHTFX handles information submitted for Futures + CFD Workshop registration and communication.',
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <Link className="privacy-back" href="/">← BACK TO KNIGHTFX</Link>
      <header>
        <span className="eyebrow"><i/>KNIGHTFX TRADERS · PRIVACY</span>
        <h1>YOUR INFORMATION.<br/><em>RESPECTED.</em></h1>
        <p>Privacy Policy · Last updated October 4, 2026</p>
      </header>
      <div className="privacy-content">
        <section><h2>Information collected</h2><p>When you request the Futures + CFD Workshop offer or contact KNIGHTFX about registration, the form may collect your full name, email address, mobile number, Telegram username or ID, and your consent to be contacted.</p></section>
        <section><h2>Why we use it</h2><p>We use submitted details to handle workshop registration, communicate about the workshop, respond to enquiries, and process the KNIGHTFX workshop offer. We do not use these details to publish a profile or display your information publicly.</p></section>
        <section><h2>Storage and protection</h2><p>Workshop submissions are sent to the server for validation and, when the registration database is configured, stored by the service provider selected for this website. Server credentials are kept in deployment environment variables and are not sent to your browser. Access should be limited to authorized site operators. No internet transmission or storage method can be guaranteed completely secure.</p><p>Registration submissions are unavailable until a database and its credentials have been configured. If the form reports that registration is unavailable, your details have not been accepted as a successful submission.</p></section>
        <section><h2>Service providers</h2><p>To store and process a registration, information is transmitted to the hosting and database providers configured for this website. Those providers process information to operate the site and registration service. The specific database provider is configurable by the site operator; provider details should be updated here when deployment configuration is finalized. KNIGHTFX does not sell submitted personal information.</p></section>
        <section><h2>Retention</h2><p>Information should be retained only as long as needed to manage workshop enquiries and registration, meet applicable recordkeeping needs, and resolve follow-up requests. The site operator should delete or anonymize records when they are no longer needed. A fixed retention period has not been configured for this website.</p></section>
        <section><h2>Your choices and requests</h2><p>You may request access to, correction of, or deletion of information you submitted. To help us locate a submission, contact KNIGHTFX using the Telegram contact below and identify the email address used for registration. Do not send sensitive identity documents through Telegram. We may need to verify a request before acting on it.</p></section>
        <section><h2>Privacy contact</h2><p>No privacy email address or business mailing address is configured for this website. For privacy questions or correction/deletion requests, contact the workshop team through <a href="https://t.me/Knightfx16" target="_blank" rel="noopener noreferrer">@Knightfx16 on Telegram</a>.</p></section>
        <p className="privacy-config-note">This policy describes the current website form and intended registration handling. The site operator must keep it accurate when configuring providers, retention practices, or contact channels.</p>
        <p><a href={site.legal.privacyUrl}>Privacy Policy URL: {site.legal.privacyUrl}</a></p>
      </div>
    </main>
  );
}
