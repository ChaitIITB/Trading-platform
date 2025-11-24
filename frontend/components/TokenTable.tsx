"use client"
import React, { useMemo, useState, useCallback } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { generateMockTokens, Token } from '../lib/mockData'
import useMockWebsocket from '../hooks/useMockWebsocket'
import TokenRow from './TokenRow'

type SortKey = 'pair' | 'price' | 'change' | 'volume' | 'liquidity'
type FilterType = 'all' | 'favorites' | 'new' | 'finalStretch' | 'migrated'

function fetchInitial(count = 20) {
  return new Promise<Token[]>((res) => {
    setTimeout(() => res(generateMockTokens(count, 0)), 600)
  })
}

export default function TokenTable() {
  const [sortKey, setSortKey] = useState<SortKey>('pair')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<FilterType>('all')
  const [loadCount, setLoadCount] = useState(0)
  const queryClient = useQueryClient()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['tokens'],
    queryFn: () => fetchInitial(20),
    staleTime: 1000 * 60,
  })

  // hook to simulate price updates
  const tokensLive = useMockWebsocket(data ?? [])

  // Delete token handler
  const handleDelete = useCallback((tokenId: string) => {
    queryClient.setQueryData(['tokens'], (old: Token[] | undefined) => {
      if (!old) return []
      return old.filter(t => t.id !== tokenId)
    })
  }, [queryClient])

  // Toggle favorite handler
  const handleToggleFavorite = useCallback((tokenId: string) => {
    queryClient.setQueryData(['tokens'], (old: Token[] | undefined) => {
      if (!old) return []
      return old.map(t => 
        t.id === tokenId ? { ...t, favorite: !t.favorite } : t
      )
    })
  }, [queryClient])

  // Edit token handler
  const handleEdit = useCallback((tokenId: string, updates: Partial<Token>) => {
    queryClient.setQueryData(['tokens'], (old: Token[] | undefined) => {
      if (!old) return []
      return old.map(t => 
        t.id === tokenId ? { ...t, ...updates } : t
      )
    })
  }, [queryClient])

  const filtered = useMemo(() => {
    if (!tokensLive) return []
    let result = [...tokensLive]
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(t => 
        t.pair.toLowerCase().includes(query) ||
        t.meta.toLowerCase().includes(query)
      )
    }
    
    // Apply category filter
    if (filterType !== 'all') {
      result = result.filter(t => {
        if (filterType === 'favorites') return t.favorite
        if (filterType === 'new') return !t.finalStretch && !t.migrated
        if (filterType === 'finalStretch') return t.finalStretch
        if (filterType === 'migrated') return t.migrated
        return true
      })
    }
    
    return result
  }, [tokensLive, searchQuery, filterType])

  const sorted = useMemo(() => {
    const copy = [...filtered]
    copy.sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1
      if (sortKey === 'pair') return a.pair.localeCompare(b.pair) * dir
      if (sortKey === 'price') return (a.price - b.price) * dir
      if (sortKey === 'volume') return ((a.volume || 0) - (b.volume || 0)) * dir
      if (sortKey === 'liquidity') return ((a.liquidity || 0) - (b.liquidity || 0)) * dir
      return (a.change - b.change) * dir
    })
    return copy
  }, [filtered, sortKey, sortDir])

  const loadMore = useCallback(() => {
    const newLoadCount = loadCount + 1
    setLoadCount(newLoadCount)
    const more = generateMockTokens(10, 20 + newLoadCount * 10)
    queryClient.setQueryData(['tokens'], (old: Token[] | undefined) => {
      if (!old) return more
      return [...old, ...more]
    })
  }, [queryClient, loadCount])

  if (isLoading) {
    return (
      <div className="w-full bg-axiom-card rounded-lg shadow-xl p-4 border border-axiom-border">
        <div className="space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-14 skeleton" />
          ))}
        </div>
      </div>
    )
  }

  if (isError || !data) {
    return (
      <div className="bg-axiom-card rounded-lg shadow-xl p-6 border border-axiom-border">
        <p className="text-red-axiom">Failed to load tokens. Try refreshing.</p>
      </div>
    )
  }

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  return (
    <div className="space-y-4">
      {/* Search and Filter Bar */}
      <div className="bg-axiom-card rounded-lg shadow-xl p-4 border border-axiom-border">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search tokens..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 bg-axiom-dark border border-axiom-border rounded text-axiom-text placeholder-axiom-muted focus:outline-none focus:border-accent transition-colors"
          />
          <div className="flex gap-2 overflow-x-auto">
            {(['all', 'favorites', 'new', 'finalStretch', 'migrated'] as FilterType[]).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3 py-2 rounded text-xs sm:text-sm whitespace-nowrap transition-colors ${
                  filterType === type
                    ? 'bg-accent text-white'
                    : 'bg-axiom-dark text-axiom-muted hover:text-axiom-text border border-axiom-border'
                }`}
              >
                {type === 'all' ? 'All' : type === 'favorites' ? '⭐ Favorites' : type === 'new' ? 'New Pairs' : type === 'finalStretch' ? 'Final Stretch' : 'Migrated'}
              </button>
            ))}
          </div>
        </div>
        {filtered.length !== (tokensLive?.length || 0) && (
          <p className="text-xs text-axiom-muted mt-2">
            Showing {filtered.length} of {tokensLive?.length || 0} tokens
          </p>
        )}
      </div>

      {/* Token Table */}
      <div className="bg-axiom-card rounded-lg shadow-xl overflow-hidden border border-axiom-border">
        <div className="hidden sm:grid grid-cols-12 gap-2 sm:gap-4 items-center px-3 sm:px-4 py-3 border-b border-axiom-border bg-axiom-dark/50">
          <div className="col-span-4 flex items-center gap-2">
            <button aria-label="Sort by token" onClick={() => handleSort('pair')} className="text-xs sm:text-sm font-medium text-axiom-muted hover:text-axiom-text transition-colors">
              Token {sortKey === 'pair' && (sortDir === 'asc' ? '↑' : '↓')}
            </button>
          </div>
          <div className="col-span-2 text-right text-xs sm:text-sm font-medium text-axiom-muted">
            <button aria-label="Sort by price" onClick={() => handleSort('price')} className="hover:text-axiom-text transition-colors">
              Price {sortKey === 'price' && (sortDir === 'asc' ? '↑' : '↓')}
            </button>
          </div>
          <div className="col-span-2 text-right text-xs sm:text-sm font-medium text-axiom-muted">
            <button aria-label="Sort by 24h change" onClick={() => handleSort('change')} className="hover:text-axiom-text transition-colors">
              24h {sortKey === 'change' && (sortDir === 'asc' ? '↑' : '↓')}
            </button>
          </div>
          <div className="col-span-2 text-right text-xs sm:text-sm font-medium text-axiom-muted">
            <button aria-label="Sort by volume" onClick={() => handleSort('volume')} className="hover:text-axiom-text transition-colors">
              Volume {sortKey === 'volume' && (sortDir === 'asc' ? '↑' : '↓')}
            </button>
          </div>
          <div className="col-span-2 text-right text-xs sm:text-sm font-medium text-axiom-muted">Actions</div>
        </div>

        {sorted.length === 0 ? (
          <div className="p-8 text-center text-axiom-muted">
            <p>No tokens found</p>
            {searchQuery && <p className="text-xs mt-2">Try adjusting your search</p>}
          </div>
        ) : (
          <div>
            {sorted.map((t) => (
              <TokenRow 
                key={t.id} 
                token={t}
                onDelete={handleDelete}
                onToggleFavorite={handleToggleFavorite}
                onEdit={handleEdit}
              />
            ))}
          </div>
        )}

        <div className="p-3 sm:p-4 border-t border-axiom-border flex justify-center gap-2">
          <button onClick={loadMore} className="px-4 py-2 bg-axiom-dark/50 hover:bg-axiom-dark rounded text-sm text-axiom-text transition-colors border border-axiom-border">
            Load more
          </button>
          {sorted.length > 0 && (
            <button 
              onClick={() => queryClient.setQueryData(['tokens'], [])}
              className="px-4 py-2 bg-red-axiom/10 hover:bg-red-axiom/20 rounded text-sm text-red-axiom transition-colors border border-red-axiom/30"
            >
              Clear all
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
