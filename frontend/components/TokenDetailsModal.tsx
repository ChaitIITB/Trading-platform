"use client"
import * as Dialog from '@radix-ui/react-dialog'
import React, { useState } from 'react'
import type { Token } from '../lib/mockData'

interface TokenDetailsModalProps {
  token: Token | null
  open: boolean
  onOpenChange: (v: boolean) => void
  onEdit?: (tokenId: string, updates: Partial<Token>) => void
}

export default function TokenDetailsModal({ token, open, onOpenChange, onEdit }: TokenDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedPrice, setEditedPrice] = useState('')
  const [editedPair, setEditedPair] = useState('')

  if (!token) return null

  const handleEdit = () => {
    if (!onEdit) return
    const updates: Partial<Token> = {}
    if (editedPrice && !isNaN(parseFloat(editedPrice))) {
      updates.price = parseFloat(editedPrice)
    }
    if (editedPair) {
      updates.pair = editedPair
    }
    if (Object.keys(updates).length > 0) {
      onEdit(token.id, updates)
      setIsEditing(false)
      setEditedPrice('')
      setEditedPair('')
    }
  }

  const formatNumber = (num?: number) => {
    if (!num) return '-'
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`
    if (num >= 1000) return `$${(num / 1000).toFixed(1)}K`
    return `$${num.toFixed(0)}`
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <Dialog.Content className="bg-axiom-card rounded-lg shadow-2xl w-full max-w-2xl p-4 sm:p-6 border border-axiom-border max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {isEditing ? (
                  <input
                    type="text"
                    value={editedPair || token.pair}
                    onChange={(e) => setEditedPair(e.target.value)}
                    className="w-full px-2 py-1 bg-axiom-dark border border-axiom-border rounded text-axiom-text text-base sm:text-lg font-semibold"
                    placeholder="Token pair"
                  />
                ) : (
                  <h3 className="text-base sm:text-lg font-semibold text-axiom-text">{token.pair}</h3>
                )}
                <p className="text-xs sm:text-sm text-axiom-muted mt-1">{token.meta}</p>
              </div>
              <Dialog.Close className="text-axiom-muted hover:text-axiom-text transition-colors text-xl">✕</Dialog.Close>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-axiom-muted">Price</div>
                {isEditing ? (
                  <input
                    type="number"
                    step="0.0001"
                    value={editedPrice || token.price}
                    onChange={(e) => setEditedPrice(e.target.value)}
                    className="w-full mt-1 px-2 py-1 bg-axiom-dark border border-axiom-border rounded text-axiom-text text-lg sm:text-xl font-semibold"
                    placeholder="Price"
                  />
                ) : (
                  <div className="text-lg sm:text-xl font-semibold text-axiom-text">${token.price.toFixed(6)}</div>
                )}
                <div className={`text-sm mt-1 ${token.change >= 0 ? 'text-green-axiom' : 'text-red-axiom'}`}>
                  {token.change >= 0 ? '+' : ''}{token.change.toFixed(2)}%
                </div>
              </div>

              <div>
                <div className="text-xs text-axiom-muted">Category</div>
                <div className="text-sm text-axiom-text mt-1">
                  {token.migrated ? 'Migrated' : token.finalStretch ? 'Final Stretch' : 'New Pair'}
                </div>
                {token.favorite && (
                  <div className="mt-2 text-xs text-yellow-500 flex items-center gap-1">
                    ⭐ Favorited
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-axiom-muted">24h Volume</div>
                <div className="text-base font-semibold text-axiom-text mt-1">{formatNumber(token.volume)}</div>
              </div>
              <div>
                <div className="text-xs text-axiom-muted">Liquidity</div>
                <div className="text-base font-semibold text-axiom-text mt-1">{formatNumber(token.liquidity)}</div>
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm text-axiom-muted mb-2">About</div>
              <p className="text-xs sm:text-sm text-axiom-text/80">
                Mock token details for demo. In a real app this area would contain a short description, 
                liquidity info, links to contracts, and actions like Add to Watchlist or Open on Explorer.
              </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row justify-end gap-2">
              {isEditing ? (
                <>
                  <button 
                    onClick={() => {
                      setIsEditing(false)
                      setEditedPrice('')
                      setEditedPair('')
                    }}
                    className="px-4 py-2 bg-axiom-dark hover:bg-axiom-dark/80 rounded text-sm transition-colors border border-axiom-border text-axiom-text"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleEdit}
                    className="px-4 py-2 bg-green-axiom hover:bg-green-axiom/90 text-white rounded text-sm transition-colors"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <>
                  {onEdit && (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-axiom-dark hover:bg-axiom-dark/80 rounded text-sm transition-colors border border-axiom-border text-axiom-text"
                    >
                      Edit Token
                    </button>
                  )}
                  <button className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded text-sm transition-colors">
                    Trade
                  </button>
                </>
              )}
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
