export type Partner = {
  name: string;
  affiliateUrl: string;
  logo?: string;
  description?: string;
};

export const partners: Partner[] = [
  {
    name: 'Blue Guardian',
    affiliateUrl: 'https://blueguardian.com/?afmc=KnightFx',
    logo: '/assets/partners/blue-guardian-wordmark.png',
  },
  {
    name: 'Foraxis',
    affiliateUrl: 'https://dashboard.foraxis.com/?ref=KNIGHTFX',
    logo: '/assets/partners/Foraxis-Wordmark-White.png',
  },
  {
    name: 'FundedSquad',
    affiliateUrl: 'https://fundedsquad.com/?squad=3434',
    logo: '/assets/partners/codex-clipboard-e67e45cd-05ff-4418-b128-d969bdb5fce9.png',
  },
  {
    name: 'FundedHive',
    affiliateUrl: 'https://funded.tradinghive.com/home',
    logo: '/assets/partners/fundedhive-wordmark.webp',
  },
  {
    name: 'FunderBlu',
    affiliateUrl: 'https://affiliates.funderblu.com/click?campaign_id=4&ref_id=644',
    logo: '/assets/partners/funderblu-wordmark.webp',
  },
];
