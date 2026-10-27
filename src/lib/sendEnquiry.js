import { company } from '../data/site.js'

/**
 * Delivers an enquiry straight to the company inbox (no mail app needed) through FormSubmit.
 * NOTE: the very first submission makes FormSubmit email an "Activate form" link to company.email —
 * click it once and every later enquiry arrives automatically.
 */
export async function sendEnquiry(f, subject) {
  const res = await fetch(`https://formsubmit.co/ajax/${company.email}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject: subject,
      _template: 'table',
      _captcha: 'false',
      _replyto: f.email || undefined,
      Name: f.name,
      Phone: f.phone,
      Email: f.email || '—',
      Machine: f.product || '—',
      Requirement: f.message || '—',
      Page: typeof window !== 'undefined' ? window.location.href : '',
      _honey: '',
    }),
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok || String(data.success) === 'false') throw new Error(data.message || 'Could not send')
  return data
}
