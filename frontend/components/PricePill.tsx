"use client"
import React from 'react'

function PricePill({ price, prevPrice }: { price: number; prevPrice?: number }) {
  const diff = prevPrice ? price - prevPrice : 0
  const isUp = diff >= 0
  const bg = prevPrice ? (isUp ? 'bg-green-axiom/10' : 'bg-red-axiom/10') : 'bg-transparent'

  return (
    <div className={`inline-flex items-center justify-end gap-1 sm:gap-2 px-2 sm:px-3 py-1 rounded ${bg} fixed-cell transition-colors`}> 
      <span className="text-[10px] sm:text-sm font-semibold text-axiom-text">${price.toFixed(4)}</span>
      <span className={`text-[8px] sm:text-xs ${isUp ? 'text-green-axiom' : 'text-red-axiom'}`}>{isUp ? '▲' : '▼'}</span>
    </div>
  )
}

export default React.memo(PricePill)

