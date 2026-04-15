import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Christian Coulibaly — graduating from Ohio State in May 2026, incoming full-time Mobile Software Engineer at JPMorgan Chase. Full-stack developer, two-time JPMC hackathon winner, and NSBE Recording Secretary.',
};

const skills = [
  {
    category: 'Languages',
    items: ['TypeScript', 'JavaScript', 'Kotlin', 'Swift', 'Python', 'C', 'x86 Assembly', 'C#', 'Java', 'PHP'],
  },
  {
    category: 'Mobile',
    items: ['Jetpack Compose', 'MVVM', 'Android', 'SwiftUI', 'Flutter', 'Xamarin.Forms'],
  },
  {
    category: 'Web & Backend',
    items: ['React', 'Next.js', 'Tailwind CSS', 'shadcn/ui', 'Redux', 'Node.js', 'tRPC', 'Prisma', 'Express.js'],
  },
  {
    category: 'Infra & Tools',
    items: ['AWS', 'Docker', 'Unraid', 'Git', 'Jest', 'Webpack', 'Linux', 'Cloudflare', 'Umbraco CMS'],
  },
  {
    category: 'Certifications',
    items: ['AWS Cloud Practitioner', 'CodePath Advanced Technical Interview Prep', 'CodePath Intro to iOS Dev', 'AWS Certified Developer (Expected May 2026)'],
  },
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
              I&apos;m a Computer Science &amp; Engineering student at{' '}
              <strong className='text-foreground'>The Ohio State University</strong>,
              graduating May 2026 with a minor in French. I&apos;m the Recording Secretary of
              OSU&apos;s <strong className='text-foreground'>NSBE</strong> chapter 
              and an active member of{' '}
              <strong className='text-foreground'>ColorStack</strong>.
            </p>
            <p>
              I&apos;m currently a <strong className='text-foreground'>Mobile Development Intern at JPMorgan Chase</strong>,
              working on the Chase Android app used by{' '}
              <strong className='text-foreground'>70M+ customers</strong> using Jetpack Compose and MVVM.
              After graduation, I&apos;ll be joining Chase full-time on a mobile team.
            </p>
            <p>
              Previously I interned on Chase&apos;s web team, modernizing an internal
              financial tool for 1000+ global legal entities, and at{' '}
              <strong className='text-foreground'>OSU&apos;s Wexner Medical Center</strong>,
              where I achieved 100% accessibility compliance across the Comprehensive Cancer Center&apos;s site.
            </p>
            <p className='text-xs'>
              🇫🇷 Fluent in French (Native / Bilingual proficiency)
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
                <strong className='text-foreground'>JPMC Global Hackathon 2025</strong>{' '}
                — 1st place out of 64 Columbus teams building an internal mobility assistant with NLP + OpenAI.
              </li>
              <li>
                <strong className='text-foreground'>CTRL-R (Code for Good)</strong>{' '}
                — Challenge winner for Pyramid CDC, a digital literacy platform built in 24 hours.
              </li>
              <li>
                <strong className='text-foreground'>M.C. Jeter&apos;s Portfolio</strong>{' '}
                — Delivered an estimated 25% uplift in sales and social engagement.
              </li>
              <li>
                <strong className='text-foreground'>HDNCHQ Server</strong>{' '}
                — Self-hosted Plex, Nextcloud, and Vaultwarden with Docker, improving uptime from 40% to 95%.
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
              After graduating from OSU in May 2026, I&apos;ll be joining
              JPMorgan Chase full-time as a{' '}
              <strong className='text-foreground'>Software Engineer on a mobile team</strong>.
              I&apos;m excited to go deeper on Android development with Jetpack
              Compose and to keep pushing on the kinds of products that reach
              people at scale.
            </p>
            <p>
              On the side, I&apos;m continuing to build out personal projects —
              AI tooling, self-hosted infrastructure, and wherever curiosity takes
              me next.
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
          <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'>
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
