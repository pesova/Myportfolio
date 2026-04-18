import { useEffect, useState } from 'react'
import { GalaxyBg } from './components/GalaxyBg'
import { GateScreen } from './components/GateScreen'
import { PortfolioApp } from './components/PortfolioApp'
import { fetchGateStatus } from './lib/gateApi'

export default function App() {
  const [ready, setReady] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const ok = await fetchGateStatus()
        if (!cancelled) {
          setAuthenticated(ok)
          setReady(true)
        }
      } catch {
        if (!cancelled) {
          setAuthenticated(false)
          setReady(true)
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  if (!ready) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-[#050508] text-slate-500">
        Loading…
      </div>
    )
  }

  if (!authenticated) {
    return <GateScreen onUnlocked={() => setAuthenticated(true)} />
  }

  return (
    <div className="h-dvh overflow-hidden">
      <GalaxyBg />
      <PortfolioApp />
    </div>
  )
}
