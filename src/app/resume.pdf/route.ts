const DEFAULT_RESUME_URL =
  'https://raw.githubusercontent.com/najchris11/resume/resume-builds/master-resume.pdf';

// Anything smaller than this is not a real resume (the real one is ~80 KB)
const MIN_PDF_BYTES = 10 * 1024;

// Rendered per request so a failed upstream fetch is never baked into the
// build or a route cache. Freshness for visitors comes only from the explicit
// Cache-Control headers below (success: s-maxage=3600 + stale-while-revalidate,
// failure: no-store), which the CDN honours.
export const dynamic = 'force-dynamic';

function unavailable() {
  return new Response('Resume is temporarily unavailable.', {
    status: 502,
    headers: { 'Cache-Control': 'no-store' },
  });
}

export async function GET() {
  // Server-only override (no NEXT_PUBLIC_ prefix) to repoint without a code change
  const resumeUrl = process.env.RESUME_PDF_URL || DEFAULT_RESUME_URL;

  try {
    const res = await fetch(resumeUrl, {
      redirect: 'follow',
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) {
      // Release the connection instead of leaving the error body unread
      await res.body?.cancel();
      return unavailable();
    }

    const pdf = await res.arrayBuffer();
    const magic = new TextDecoder().decode(pdf.slice(0, 4));
    if (magic !== '%PDF' || pdf.byteLength < MIN_PDF_BYTES) {
      return unavailable();
    }

    return new Response(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="christian-coulibaly-resume.pdf"',
        'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch {
    // Timeout, DNS failure, connection reset, etc.
    return unavailable();
  }
}
