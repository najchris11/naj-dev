import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn more about Christian Coulibaly — software engineering student, JP Morgan Chase intern, and full-stack developer.',
};

const skills = [
  { category: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'C', 'x86 Assembly', 'C#'] },
  { category: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS', 'shadcn/ui', 'Redux'] },
  { category: 'Backend & Infra', items: ['Node.js', 'Docker', 'Unraid', 'Umbraco CMS', 'Nextcloud'] },
  { category: 'Tools', items: ['Git', 'Jest', 'Figma', 'VS Code', 'Linux'] },
];

const AboutPage = () => {
  return (
    <div className='mx-auto max-w-5xl space-y-8 p-8'>
      {/* Top grid */}
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        {/* Introduction */}
        <Card className='shadow-md'>
          <CardHeader>
            <CardTitle className='text-3xl font-bold'>
              Hi, I&apos;m Christian
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4 text-muted-foreground'>
            <p>
              I&apos;m a Software Engineering student at{' '}
              <strong className='text-foreground'>The Ohio State University</strong>,
              actively involved in{' '}
              <strong className='text-foreground'>NSBE</strong> and{' '}
              <strong className='text-foreground'>ColorStack</strong>. I care
              deeply about building things that are both functional and
              accessible.
            </p>
            <p>
              I&apos;ve interned at{' '}
              <strong className='text-foreground'>JP Morgan Chase</strong>, where
              I built a React frontend for an internal tool used by thousands of
              legal entities — collaborating with international teams and UX
              designers. Before that, at{' '}
              <strong className='text-foreground'>OSU&apos;s Wexner Medical Center</strong>,
              I modernized content management workflows using Umbraco and focused
              on accessible design.
            </p>
            <p>
              Outside of work, I run personal projects ranging from AI-powered
              music tools to self-hosted home servers — anything that blends
              creativity with engineering.
            </p>
          </CardContent>
        </Card>

        {/* Hobbies */}
        <Card className='shadow-md'>
          <CardHeader>
            <CardTitle className='text-2xl font-bold'>
              When I&apos;m Not Coding
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4 text-muted-foreground'>
            <ul className='ml-6 list-disc space-y-2'>
              <li>
                Curating playlists and exploring music through{' '}
                <strong className='text-foreground'>Plexamp</strong> — I built
                an AI-powered playlist generator to scratch that itch.
              </li>
              <li>
                Gaming with friends or going deep into strategy and indie titles.
              </li>
              <li>
                Tinkering with my home network — OpenWRT, Unifi, and self-hosted
                services are a hobby in themselves.
              </li>
              <li>
                Building and configuring custom PCs, including a Hackintosh on my
                XPS 9570.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Notable projects */}
        <Card className='shadow-md'>
          <CardHeader>
            <CardTitle className='text-2xl font-bold'>
              Notable Projects
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-3 text-muted-foreground'>
            <ul className='ml-6 list-disc space-y-2'>
              <li>
                <strong className='text-foreground'>M.C. Jeter&apos;s Portfolio</strong>{' '}
                — Fast, responsive site with an estimated 25% uplift in sales and
                social engagement.
              </li>
              <li>
                <strong className='text-foreground'>AI Playlist Generator</strong>{' '}
                — Python + Last.fm API + ML to surface music patterns and build
                smarter playlists.
              </li>
              <li>
                <strong className='text-foreground'>JP Morgan Chase Internship</strong>{' '}
                — Modernized a legal entity tool serving thousands of users,
                targeting 99% uptime.
              </li>
              <li>
                <strong className='text-foreground'>HDNCHQ Server</strong>{' '}
                — Self-hosted Plex, Nextcloud, and Vaultwarden with Docker,
                achieving 95% uptime.
              </li>
            </ul>
            <Button asChild variant='outline' className='mt-2 text-primary'>
              <Link href='/projects'>View All Projects</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Goals */}
        <Card className='shadow-md'>
          <CardHeader>
            <CardTitle className='text-2xl font-bold'>What&apos;s Next</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4 text-muted-foreground'>
            <p>
              I&apos;m focused on deepening my expertise in modern full-stack
              patterns — federated modules, server components, and AI-augmented
              developer tooling. I&apos;m especially drawn to projects where
              thoughtful engineering directly improves someone&apos;s experience.
            </p>
            <p>
              Long term, I want to work on products that are genuinely useful
              and reach people who don&apos;t usually get cutting-edge software.
            </p>
            <Button asChild>
              <Link href='/contact'>Let&apos;s Connect</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Skills section */}
      <Card className='shadow-md'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>Skills &amp; Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
            {skills.map(({ category, items }) => (
              <div key={category}>
                <p className='mb-2 text-sm font-semibold uppercase tracking-wider text-primary'>
                  {category}
                </p>
                <div className='flex flex-wrap gap-1.5'>
                  {items.map((item) => (
                    <span
                      key={item}
                      className='rounded-md border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground'
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;
