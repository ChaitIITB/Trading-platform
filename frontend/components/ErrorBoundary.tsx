"use client"
import React from 'react'

type Props = { children: React.ReactNode }

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: any, info: any) {
    // In real app log to monitoring
    // console.error(error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-axiom-card rounded-lg shadow-xl p-6 border border-axiom-border">
          <h3 className="text-lg font-semibold text-axiom-text">Something went wrong</h3>
          <p className="text-sm text-axiom-muted">Try refreshing the page.</p>
        </div>
      )
    }

    return this.props.children as any
  }
}

export default ErrorBoundary
