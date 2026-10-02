export type Partner = {
  name: string;
  logo: string;
  url: string;
  code: string;
  description: string;
  offerText: string;
  discount?: string;
  isPartner: boolean;
  showDiscount: boolean;
};

export const partners: Partner[] = [
  {
    name: 'BLUE GUARDIAN',
    logo: '/assets/partners/blue-guardian-wordmark.png',
    url: 'https://www.blueguardian.com/',
    code: 'KNIGHTFX',
    description: 'Prop trading and simulated funding programs.',
    offerText: '',
    isPartner: true,
    showDiscount: false,
  },
  {
    name: 'SURE LEVERAGE FUNDING',
    logo: '/assets/partners/codex-clipboard-6587edcb-b7fe-4f68-a07d-19cdce45be5a.png',
    url: 'https://sureleveragefunding.com/',
    code: 'KNIGHTFX',
    description: 'Funding programs and trading challenges.',
    offerText: '',
    isPartner: true,
    showDiscount: false,
  },
  {
    name: 'FORAXIS',
    logo: '/assets/partners/Foraxis-Wordmark-White.png',
    url: 'https://foraxis.com/',
    code: 'KNIGHTFX',
    description: 'Simulated trading programs and funding options.',
    offerText: '',
    isPartner: true,
    showDiscount: false,
  },
  {
    name: 'FUNDEDSQUAD',
    logo: '/assets/partners/codex-clipboard-e67e45cd-05ff-4418-b128-d969bdb5fce9.png',
    url: 'https://fundedsquad.com/',
    code: 'KNIGHTFX',
    description: 'Simulated funding and evaluation programs.',
    offerText: '',
    isPartner: true,
    showDiscount: false,
  },
];

export default partners;
