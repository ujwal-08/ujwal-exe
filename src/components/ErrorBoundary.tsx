import { Component, type ReactNode } from 'react'

interface Props {
  fallback: ReactNode
  children: ReactNode
}

/** Catches runtime failures (e.g. WebGL context errors) and renders a fallback instead. */
export default class ErrorBoundary extends Component<Props, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: unknown) {
    console.warn('[UJWAL.EXE] A visual component failed and was replaced by a fallback.', error)
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}
