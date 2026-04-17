export type GateStatus = { authenticated: boolean }

export type GateVerifyOk = { ok: true; valid: true }

export type GateVerifyFail = {
  ok: false
  valid: false
  message?: string
  attempts_left?: number
}

export function isGateVerifyFail(r: GateVerifyOk | GateVerifyFail): r is GateVerifyFail {
  return r.ok === false
}

export async function fetchGateStatus(): Promise<boolean> {
  const res = await fetch('/gate.php?action=status', {
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Status request failed')
  const data = (await res.json()) as GateStatus
  return data.authenticated === true
}

export async function verifyGateCode(code: string): Promise<GateVerifyOk | GateVerifyFail> {
  const res = await fetch('/gate.php', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  })
  const data = (await res.json()) as GateVerifyOk | GateVerifyFail
  return data
}
