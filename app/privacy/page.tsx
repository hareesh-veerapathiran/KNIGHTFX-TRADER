import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | KNIGHTFX TRADERS',
  description: 'Privacy information for visitors to the KNIGHTFX TRADERS website.',
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <Link className="privacy-back" href="/">← BACK TO KNIGHTFX</Link>
      <header>
        <span className="eyebrow"><i/>KNIGHTFX TRADERS · PRIVACY</span>
        <h1>YOUR PRIVACY.<br/><em>RESPECTED.</em></h1>
        <p>Privacy Policy · Last updated October 4, 2026</p>
      </header>
      <div className="privacy-content">
        <section><h2>Information collected on this website</h2><p>This website does not provide a workshop registration form and does not ask visitors to submit personal details through a form.</p></section>
        <section><h2>External links and messages</h2><p>This website links to Telegram, social platforms, and partner websites. If you choose to open an external service or message KNIGHTFX, information you provide there is handled by that service and the recipient under their respective terms and privacy practices. Please review those policies before sharing personal information.</p></section>
        <section><h2>Use and sharing</h2><p>KNIGHTFX does not receive personal details through a website registration form or display visitor details publicly. This website does not sell information collected through a form. External services you choose to use may process information according to their own policies.</p></section>
        <section><h2>Your choices</h2><p>You can browse this website without submitting personal information. You may choose not to follow external links or send messages. For a request relating to information you voluntarily sent directly to KNIGHTFX, contact <a href="https://t.me/Knightfx16" target="_blank" rel="noopener noreferrer">@Knightfx16 on Telegram</a>. Information retained by an external service must be managed under that service’s privacy controls.</p></section>
        <section><h2>Privacy questions</h2><p>No privacy email address, legal entity, or mailing address is configured for this website. For privacy questions, contact <a href="https://t.me/Knightfx16" target="_blank" rel="noopener noreferrer">@Knightfx16 on Telegram</a>.</p></section>
      </div>
    </main>
  );
}
