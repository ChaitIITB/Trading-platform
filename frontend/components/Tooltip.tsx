"use client"
import * as RadixTooltip from '@radix-ui/react-tooltip'
import React, { ReactNode } from 'react'

export default function Tooltip({ children, content }: { children: ReactNode; content: ReactNode }) {
  return (
    <RadixTooltip.Provider delayDuration={200}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content side="top" className="px-2 py-1 rounded bg-axiom-dark text-axiom-text text-xs border border-axiom-border shadow-lg z-50">
            {content}
            <RadixTooltip.Arrow className="fill-axiom-dark" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}
