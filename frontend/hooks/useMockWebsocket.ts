"use client"
import { useEffect, useRef, useState } from 'react'
import type { Token } from '../lib/mockData'

// Optimized mock websocket: only updates random subset of tokens to simulate real trading
export default function useMockWebsocket(initial: Token[]) {
  const [tokens, setTokens] = useState<Token[] | null>(initial.length ? initial : null)
  const ref = useRef(initial)
  const initialPricesRef = useRef(new Map<string, number>())

  useEffect(() => {
    if (!initial || initial.length === 0) return
    ref.current = initial
    setTokens(initial)
    
    // Store initial prices for accurate change calculation
    initial.forEach(t => {
      if (!initialPricesRef.current.has(t.id)) {
        initialPricesRef.current.set(t.id, t.price)
      }
    })

    const id = setInterval(() => {
      // Only update 30-50% of tokens each interval (more realistic)
      const updateCount = Math.floor(ref.current.length * (0.3 + Math.random() * 0.2))
      const indicesToUpdate = new Set<number>()
      
      while (indicesToUpdate.size < Math.min(updateCount, ref.current.length)) {
        indicesToUpdate.add(Math.floor(Math.random() * ref.current.length))
      }

      const updated = ref.current.map((t, idx) => {
        if (!indicesToUpdate.has(idx)) return t
        
        // More volatile price movements (0.5% to 2% per tick)
        const volatility = 0.005 + Math.random() * 0.015
        const direction = Math.random() > 0.5 ? 1 : -1
        const vol = direction * volatility * t.price
        const newPrice = Math.max(0.0001, +(t.price + vol).toFixed(6))
        
        // Calculate change from original price
        const initialPrice = initialPricesRef.current.get(t.id) || t.price
        const change = +((newPrice - initialPrice) / initialPrice * 100).toFixed(2)
        
        return { ...t, prevPrice: t.price, price: newPrice, change }
      })
      
      ref.current = updated
      setTokens(updated)
    }, 1500)

    return () => clearInterval(id)
  }, [initial])

  return tokens
}
