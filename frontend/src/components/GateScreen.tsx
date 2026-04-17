import { useCallback, useState } from 'react'
import { isGateVerifyFail, verifyGateCode } from '../lib/gateApi'

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
    <div className="relative min-h-svh overflow-hidden bg-[#050508] text-white">
      {/* Mesh + gradient (modern dev-portfolio style) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background:
            'linear-gradient(125deg, #0c0220 0%, #050508 38%, #06122a 70%, #0a0528 100%)',
          backgroundSize: '200% 200%',
          animation: 'subtle-pan 22s ease-in-out infinite',
        }}
      />
      <div
        className="pointer-events-none absolute -left-32 top-0 h-[520px] w-[520px] rounded-full bg-violet-600/35 blur-[120px]"
        style={{ animation: 'blob-float 19s ease-in-out infinite' }}
      />
      <div
        className="pointer-events-none absolute -right-40 top-1/4 h-[480px] w-[480px] rounded-full bg-cyan-500/25 blur-[110px]"
        style={{ animation: 'blob-float 23s ease-in-out infinite reverse' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/3 h-[420px] w-[420px] rounded-full bg-fuchsia-600/20 blur-[100px]"
        style={{ animation: 'blob-float 21s ease-in-out infinite 2s' }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 40%, black, transparent)',
        }}
      />

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

            <div className="mt-8 flex justify-center gap-2 sm:gap-3">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="flex h-14 w-11 items-center justify-center rounded-xl border border-white/15 bg-black/30 text-xl font-semibold tabular-nums text-white shadow-inner sm:h-16 sm:w-12 sm:text-2xl"
                >
                  {code[i] ?? '·'}
                </span>
              ))}
            </div>

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
                pesova13@gmail.com
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
