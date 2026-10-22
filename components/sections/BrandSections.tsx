import Image from 'next/image';
import { ArrowUpRight, Send, MessagesSquare } from 'lucide-react';
import { Reveal, RevealDetails } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArrowLink } from '@/components/ui/ArrowLink';
import { partners } from '@/data/partners';
import { site } from '@/data/site';
import { CopyCode } from '@/components/ui/CopyCode';
import { Parallax } from '@/components/ui/Parallax';

export function Mindset() { return <section id="mindset" className="mindset section-pad"><Reveal><span className="eyebrow"><i/>THE KNIGHTFX MINDSET</span><h2><span className="accent-text">DISCIPLINE</span><br/>OVER<br/><em>EMOTION.</em></h2></Reveal><Reveal delay={.12}><div className="mindset-aside"><span className="vertical-rule"/><p className="statement">Markets are uncertain.<br/>Your process doesn’t have to be.</p><p>KNIGHTFX focuses on education, structured analysis, risk awareness and disciplined execution.</p><a href="#about" className="text-link">THE PRINCIPLES <ArrowUpRight size={15}/></a></div></Reveal><span className="mindset-ghost">01</span></section>; }

export function About() { const items = [{ n:'01',t:'DISCIPLINE',d:'Develop a structured process and approach the markets with consistency.'},{n:'02',t:'STRATEGY',d:'Understand market concepts, structure, price action and trade planning.'},{n:'03',t:'GROWTH',d:'Keep improving your knowledge, execution and decision-making.'}]; return <section id="about" className="about section-pad"><SectionHeading label="ABOUT KNIGHTFX">MORE THAN<br/><em>A TRADING COMMUNITY.</em></SectionHeading><Reveal delay={0.12}><div className="about-intro"><p>KNIGHTFX TRADING LABS is a trading-focused brand built around education and a community-driven approach to learning.</p><span>BUILT ON PROCESS. GROUNDED IN RISK.</span></div></Reveal><div className="principle-list">{items.map((x,i)=><Reveal key={x.n} delay={0.08+i*0.09}><article className="principle-row"><span className="accent-text principle-num">{x.n}</span><h3>{x.t}</h3><p>{x.d}</p><ArrowUpRight size={18}/></article></Reveal>)}</div></section>; }

export function Offers() { const items=[['01','EDUCATION','Structured learning in Forex, Futures and XAUUSD, with focus on market structure, risk management and trading psychology.'],['02','COMMUNITY','A place to learn, discuss markets and connect with fellow traders.']]; return <section className="offers section-pad"><SectionHeading label="WHAT WE OFFER">BUILT FOR<br/><em>SERIOUS TRADERS.</em></SectionHeading><div className="offer-list">{items.map(([n,t,d],i)=><Reveal key={n} delay={i*0.09}><article className="offer-row"><span className="offer-num">{n}</span><div><h3>{t}</h3><p>{d}</p></div><ArrowUpRight size={19}/></article></Reveal>)}</div></section>; }

export function InnerCircle() { return <section id="inner-circle" className="inner-circle section-pad"><Reveal><div className="inner-circle-content"><span className="eyebrow"><i/>THE NEXT CHAPTER</span><h2><span>KNIGHTFX</span><em>INNER CIRCLE</em></h2><span className="inner-circle-status">LAUNCHING SOON</span><p>A new chapter in the KNIGHTFX trading community. Stay tuned.</p></div></Reveal></section>; }

export function Partners() { return <section id="partners" className="partners section-pad"><SectionHeading label="KNIGHTFX ECOSYSTEM">PARTNERED<br/><em>WITH</em></SectionHeading><Reveal delay={0.12}><div className="partner-promo-banner"><div><span>USE CODE</span><strong>{site.promoCode}</strong><small>BLUE GUARDIAN · FORAXIS · FUNDEDSQUAD</small></div><CopyCode code={site.promoCode}/></div></Reveal><Reveal delay={0.18}><div className="partner-intro"><p>Trusted platforms and firms within the KNIGHTFX ecosystem.</p></div></Reveal><div className="partner-grid">{partners.map((p,i)=><Reveal key={p.name} className="partner-card-reveal" delay={i*0.09}><article className="partner-card"><div className="partner-card-top"><span className="partner-index">0{i+1} / 05</span><ArrowUpRight size={17}/></div><div className={`partner-logo-wrap${p.logo ? ' has-logo' : ' text-logo'}`}>{p.logo ? <img className="partner-logo" src={p.logo} alt={`${p.name} logo`} /> : <span className="partner-logo-fallback">{p.name}</span>}</div><h3 className="partner-card-name">{p.name}</h3>{p.description && <p className="partner-description">{p.description}</p>}<a className="partner-visit" href={p.affiliateUrl} target="_blank" rel="noopener noreferrer">VISIT PARTNER <ArrowUpRight size={16}/></a></article></Reveal>)}</div><Reveal delay={0.18}><p className="disclaimer-small">Partner links and program terms may change. Please verify current terms directly with each provider before purchasing.</p></Reveal></section>; }

const communityPlatforms = [
  {
    number: '01',
    name: site.community.telegram.name,
    username: site.community.telegram.username,
    url: site.community.telegram.url,
    description: 'Join the official KNIGHTFX Telegram community for updates, announcements and trading discussions.',
    cta: 'JOIN TELEGRAM',
    Icon: Send,
  },
  {
    number: '02',
    name: site.community.discord.name,
    username: 'KNIGHTFX TRADING LABS',
    url: site.community.discord.url,
    description: 'Join the KNIGHTFX Discord community for trader discussions, community interaction and updates.',
    cta: 'JOIN DISCORD',
    Icon: MessagesSquare,
  },
];

export function Community() {
  return <section id="community" className="community section-pad">
    <Parallax className="community-orb"/>
    <Reveal>
      <div className="community-header">
        <span className="eyebrow"><i/>OFFICIAL KNIGHTFX PLATFORMS</span>
        <h2 className="community-heading">JOIN THE KNIGHTFX<br/><em>COMMUNITY</em></h2>
        <p className="community-description">Connect with fellow traders, access community discussions and stay updated across our official platforms.</p>
      </div>
    </Reveal>
    <div className="community-cards">
      {communityPlatforms.map(({ number, name, username, url, description, cta, Icon }, index) => (
        <Reveal key={name} delay={index * 0.12}>
          <a className="community-card" href={url} target="_blank" rel="noopener noreferrer" aria-label={`${cta} — opens in a new tab`}>
            <div className="community-card-top"><span>{number} — {name.toUpperCase()}</span><ArrowUpRight size={17}/></div>
            <div className="community-card-icon"><Icon size={27} strokeWidth={1.6} aria-hidden="true"/></div>
            <span className="community-card-title">{name.toUpperCase()} COMMUNITY</span>
            <strong className="community-card-handle">{username}</strong>
            <p>{description}</p>
            <span className="community-card-cta">{cta} <ArrowUpRight size={16}/></span>
          </a>
        </Reveal>
      ))}
    </div>
  </section>;
}

const questions=[['What is KNIGHTFX?','A trading-focused brand built around education and a community-driven approach to learning.'],['How can I connect with the KNIGHTFX community?','Use the official Telegram and Discord links in the Community section.'],['How do partner links work?','Each partner card links directly to that provider. Review the provider’s terms before purchasing.']];
export function FAQ() { return <section className="faq section-pad"><SectionHeading label="QUESTIONS, ANSWERED">CLARITY BEFORE<br/><em>COMMITMENT.</em></SectionHeading><div className="faq-list">{questions.map(([q,a],i)=><RevealDetails key={q} className="faq-item" delay={i*0.08}><summary><span className="faq-num">0{i+1}</span>{q}<span className="faq-plus"/></summary><p>{a}</p></RevealDetails>)}</div></section>; }

export function FinalCTA() { return <section className="final-cta section-pad" id="contact"><div className="final-mark">KNIGHT</div><Reveal><span className="eyebrow"><i/>YOUR NEXT MOVE STARTS WITH A PROCESS</span></Reveal><Reveal delay={0.08}><h2>MASTER<br/><em>THE PROCESS.</em></h2></Reveal><Reveal delay={0.16}><p>Discipline. Strategy. Growth.<br/>Build your process. Improve your execution. Keep learning.</p></Reveal><Reveal delay={0.24}><div className="final-actions"><ArrowLink href="#community">Join the Community</ArrowLink></div></Reveal></section>; }

export function Footer() { const year=2026; return <footer className="footer"><Reveal><div className="footer-main"><a className="footer-brand" href="#home" aria-label="KNIGHTFX Trading Labs home"><Image src={site.logoSmall} alt="KNIGHTFX Trading Labs official logo" width={512} height={512} className="footer-brand-logo"/><i>{site.tagline}</i></a><nav aria-label="Footer navigation">{['HOME','ABOUT','PARTNERS','COMMUNITY','CONTACT'].map((x,i)=><a key={x} href={['#home','#about','#partners','#community','#contact'][i]}>{x}</a>)}</nav><div className="footer-social">{Object.values(site.community).map(platform=><a href={platform.url} key={platform.name} target="_blank" rel="noopener noreferrer">{platform.name}<ArrowUpRight size={13}/></a>)}</div></div></Reveal><Reveal delay={0.1}><div className="risk-copy"><span>RISK DISCLOSURE</span><p>Trading financial markets involves substantial risk and may not be suitable for every trader. Content, market commentary and educational material provided by KNIGHTFX are for informational and educational purposes only and should not be considered financial advice or a guarantee of future results. Past performance does not guarantee future results. Always conduct your own research and consider your individual risk tolerance.</p></div></Reveal><Reveal delay={0.18}><div className="footer-bottom"><span>© {year} KNIGHTFX TRADING LABS</span><span>DISCIPLINE • STRATEGY • GROWTH</span><div>{site.legal.termsUrl ? <a href={site.legal.termsUrl}>TERMS</a> : <span>TERMS</span>}{site.legal.privacyUrl ? <a href={site.legal.privacyUrl}>PRIVACY</a> : <span>PRIVACY</span>}{site.legal.riskUrl ? <a href={site.legal.riskUrl}>RISK DISCLOSURE</a> : <span>RISK DISCLOSURE</span>}</div></div></Reveal></footer>; }
