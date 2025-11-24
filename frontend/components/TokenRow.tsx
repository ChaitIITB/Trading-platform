"use client"
import React, { useMemo, useState, useCallback } from 'react'
import type { Token } from '../lib/mockData'
import PricePill from './PricePill'
import cn from 'clsx'
import Tooltip from './Tooltip'
import TokenDetailsModal from './TokenDetailsModal'

interface TokenRowProps {
  token: Token
  onDelete: (tokenId: string) => void
  onToggleFavorite: (tokenId: string) => void
  onEdit: (tokenId: string, updates: Partial<Token>) => void
}

function TokenRow({ token, onDelete, onToggleFavorite, onEdit }: TokenRowProps) {
  const [open, setOpen] = useState(false)
  const [showActions, setShowActions] = useState(false)

  const category = useMemo(() => {
    if (token.migrated) return 'Migrated'
    if (token.finalStretch) return 'Final Stretch'
    return 'New Pair'
  }, [token])

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpen(true)
    }
  }, [])

  const handleFavoriteClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleFavorite(token.id)
  }, [onToggleFavorite, token.id])

  const handleDeleteClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm(`Delete ${token.pair}?`)) {
      onDelete(token.id)
    }
  }, [onDelete, token.id, token.pair])

  const formatVolume = (vol?: number) => {
    if (!vol) return '-'
    if (vol >= 1000000) return `$${(vol / 1000000).toFixed(2)}M`
    if (vol >= 1000) return `$${(vol / 1000).toFixed(1)}K`
    return `$${vol.toFixed(0)}`
  }

  return (
    <>
      <div 
        role="button" 
        tabIndex={0} 
        onKeyDown={onKeyDown} 
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        onClick={() => setOpen(true)} 
        className="grid grid-cols-2 sm:grid-cols-12 items-center gap-2 sm:gap-4 px-3 sm:px-4 py-3 hover:bg-axiom-dark/50 transition-colors cursor-pointer border-b border-axiom-border/50 last:border-b-0"
      >
        <div className="col-span-2 sm:col-span-4 flex items-center gap-2 sm:gap-3">
          <button
            onClick={handleFavoriteClick}
            className="text-lg hover:scale-110 transition-transform"
            aria-label={token.favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {token.favorite ? '⭐' : '☆'}
          </button>
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-xs sm:text-sm">{token.pair.split('/')[0].slice(0,2)}</div>
          <div className="min-w-0 flex-1">
            <div className="text-xs sm:text-sm font-medium flex items-center gap-2">
              <Tooltip content={<span>{token.meta}</span>}>
                <span className="underline decoration-dotted underline-offset-2 text-axiom-text truncate">{token.pair}</span>
              </Tooltip>
            </div>
            <div className="text-[10px] sm:text-xs text-axiom-muted truncate">{token.meta}</div>
          </div>
        </div>

        <div className="col-span-1 sm:col-span-2 text-right justify-self-end sm:justify-self-auto">
          <PricePill price={token.price} prevPrice={token.prevPrice} />
        </div>

        <div className={cn('hidden sm:block sm:col-span-2 text-right font-medium', token.change >= 0 ? 'text-green-axiom' : 'text-red-axiom')}>
          {token.change >= 0 ? '+' : ''}{token.change.toFixed(2)}%
        </div>

        <div className="hidden sm:block sm:col-span-2 text-right text-xs text-axiom-muted">
          {formatVolume(token.volume)}
        </div>

        <div className="hidden sm:flex sm:col-span-2 justify-end gap-1">
          {showActions ? (
            <>
              <Tooltip content="View details">
                <button
                  onClick={(e) => { e.stopPropagation(); setOpen(true) }}
                  className="p-1.5 hover:bg-axiom-dark rounded transition-colors"
                  aria-label="View details"
                >
                  <svg className="w-4 h-4 text-axiom-muted hover:text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </Tooltip>
              <Tooltip content="Delete token">
                <button
                  onClick={handleDeleteClick}
                  className="p-1.5 hover:bg-red-axiom/20 rounded transition-colors"
                  aria-label="Delete token"
                >
                  <svg className="w-4 h-4 text-axiom-muted hover:text-red-axiom" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </Tooltip>
            </>
          ) : (
            <span className="text-xs text-axiom-muted">{category}</span>
          )}
        </div>
      </div>

      <TokenDetailsModal 
        token={token} 
        open={open} 
        onOpenChange={setOpen}
        onEdit={onEdit}
      />
    </>
  )
}

export default React.memo(TokenRow)
