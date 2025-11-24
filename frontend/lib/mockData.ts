export type Token = {
  id: string
  pair: string
  meta: string
  price: number
  prevPrice?: number
  change: number
  volume?: number
  liquidity?: number
  finalStretch?: boolean
  migrated?: boolean
  favorite?: boolean
}

const random = (min = 0, max = 1) => Math.random() * (max - min) + min

// Generate unique ID
let tokenCounter = 0
export function generateTokenId(): string {
  return `token-${Date.now()}-${tokenCounter++}-${Math.random().toString(36).substr(2, 9)}`
}

const tokenNames = [
  'BONK', 'PEPE', 'WIF', 'DOGE', 'SHIB', 'FLOKI', 'SAMO', 'MEME', 'WOJAK', 'CHAD',
  'APE', 'MOON', 'ROCKET', 'LAMBO', 'HODL', 'WAGMI', 'GEM', 'ALPHA', 'SIGMA', 'BASED'
]

export function generateMockTokens(n = 10, startIndex = 0): Token[] {
  const cats = ['New Pair', 'Final Stretch', 'Migrated']
  return Array.from({ length: n }).map((_, i) => {
    const base = +(random(0.1, 5)).toFixed(4)
    const finalStretch = Math.random() > 0.8
    const migrated = !finalStretch && Math.random() > 0.92
    const tokenName = tokenNames[(startIndex + i) % tokenNames.length]
    return {
      id: generateTokenId(),
      pair: `${tokenName}/USDC`,
      meta: cats[Math.floor(Math.random() * cats.length)],
      price: base,
      prevPrice: base,
      change: +(random(-15, 15)).toFixed(2),
      volume: +(random(10000, 5000000)).toFixed(0),
      liquidity: +(random(50000, 10000000)).toFixed(0),
      finalStretch,
      migrated,
      favorite: false,
    }
  })
}