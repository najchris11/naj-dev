// Fetches master-resume.pdf from the resume repo's resume-builds branch.
// Works unauthenticated while the repo is public; set RESUME_GITHUB_TOKEN
// (fine-grained PAT, Contents: read-only on najchris11/resume) once the repo
// goes private.
const RESUME_URL =
  'https://api.github.com/repos/najchris11/resume/contents/master-resume.pdf?ref=resume-builds';

// Re-fetch from the resume-builds branch at most once an hour
export const revalidate = 3600;

export async function GET() {
  const token = process.env.RESUME_GITHUB_TOKEN;
  const res = await fetch(RESUME_URL, {
    headers: {
      Accept: 'application/vnd.github.raw+json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
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
