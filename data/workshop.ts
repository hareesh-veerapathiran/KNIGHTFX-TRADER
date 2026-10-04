export const workshop = {
  name: 'Futures + CFD Workshop',
  originalPrice: 300,
  currentPrice: 150,
  capacity: 10,
  coupon: {
    code: 'KNIGHTFX',
    discount: 50,
  },
  telegramUrl: 'https://t.me/Knightfx16',
  telegramUsername: '@Knightfx16',
  cta: 'Reserve Your Spot',
  description: 'An intensive workshop designed to help traders understand both CFD and Futures markets through structured education, strategy, execution and risk management.',
  modules: [
    'CFD FUNDAMENTALS',
    'FUTURES FUNDAMENTALS',
    'MARKET STRUCTURE',
    'PRICE ACTION',
    'STRATEGY & EXECUTION',
    'RISK MANAGEMENT',
    'TRADE PLANNING',
    'TRADING PSYCHOLOGY',
    'PRACTICAL EXECUTION',
    'INTERACTIVE Q&A',
  ],
} as const;

export function validateWorkshopCoupon(input: string) {
  const code = input.trim().toUpperCase();
  if (!code) return 'empty' as const;
  return code === workshop.coupon.code.toUpperCase() ? 'applied' as const : 'invalid' as const;
}
