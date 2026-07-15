const RESUME_URL =
  'https://raw.githubusercontent.com/najchris11/resume/resume-builds/master-resume.pdf';

// Re-fetch from the resume-builds branch at most once an hour
export const revalidate = 3600;

export async function GET() {
  const res = await fetch(RESUME_URL);
  if (!res.ok) {
    return new Response('Resume is temporarily unavailable.', { status: 502 });
  }

  const pdf = await res.arrayBuffer();
  return new Response(pdf, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="christian-coulibaly-resume.pdf"',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
