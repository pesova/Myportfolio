import { useCallback, useState } from 'react'
import { isGateVerifyFail, verifyGateCode } from '../lib/gateApi'
import { GalaxyBg } from './GalaxyBg'

type Props = { onUnlocked: () => void }

export function GateScreen({ onUnlocked }: Props) {
  const [code, setCode] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = useCallback(
    async (value: string) => {
      if (value.length !== 4) return
      setBusy(true)
      setError(null)
      try {
        const res = await verifyGateCode(value)
        if (isGateVerifyFail(res)) {
          setError(res.message ?? 'Incorrect code.')
          setCode('')
          return
        }
        onUnlocked()
      } catch {
        setError('Network error. Try again.')
        setCode('')
      } finally {
        setBusy(false)
      }
    },
    [onUnlocked],
  )

  return (
    <div className="dark relative min-h-svh overflow-hidden text-white">
      <GalaxyBg />

      <div className="relative z-10 flex min-h-svh flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-2xl">
            <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-violet-200/80">
              Private portfolio
            </p>
            <h1 className="mt-3 text-center text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Enter access code
            </h1>
            <p className="mt-2 text-center text-sm text-slate-400">
              This site is gated. Use the 4-digit code you were given.
            </p>

            <input
              className="mt-5 w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3.5 text-center text-xl font-medium tracking-[0.65em] text-white outline-none placeholder:text-slate-600 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-500/30 sm:text-2xl"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="one-time-code"
              placeholder="••••"
              maxLength={4}
              value={code}
              disabled={busy}
              onChange={(e) => {
                const v = e.target.value.replace(/\D/g, '').slice(0, 4)
                setCode(v)
                setError(null)
                if (v.length === 4) void submit(v)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && code.length === 4) void submit(code)
              }}
              aria-label="Access code"
              autoFocus
            />

            <p className="mt-3 text-center text-xs text-slate-500">
              Digits only — submits automatically when complete.
            </p>

            {error ? (
              <p className="mt-4 text-center text-sm text-red-300" role="alert">
                {error}
              </p>
            ) : null}

            {busy ? (
              <p className="mt-4 text-center text-sm text-violet-200/90">Checking…</p>
            ) : null}

            <p className="mt-8 text-center text-xs text-slate-500">
              Need access?{' '}
              <a
                href="mailto:pesova13@gmail.com"
                className="font-medium text-violet-300 underline decoration-violet-500/40 underline-offset-2 hover:text-white"
              >
                dev@pesovatech.xyz
              </a>
            </p>
          </div>

          <p className="mt-8 text-center text-[11px] text-slate-600">
            Osueke Pesova · Full stack / backend
          </p>
        </div>
      </div>
    </div>
  )
}
