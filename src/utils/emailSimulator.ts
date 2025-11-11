export function simulateSendEmail(to, subject, body) {
  console.info("SIMULATED EMAIL ->", { to, subject, body });
  return { ok: true, previewLink: (body || '').match(/https?:\/\/[^\s]+/)?.[0] ?? null };
}
