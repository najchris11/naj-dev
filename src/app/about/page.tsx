import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Christian Coulibaly - Mobile Software Engineer at JPMorgan Chase.',
};

const skills = [
  {
    category: 'Languages',
    items: ['TypeScript', 'Kotlin', 'Swift', 'Python', 'C', 'Java'],
  },
  {
    category: 'Mobile',
    items: [
      'Jetpack Compose',
      'MVVM',
      'Android',
      'SwiftUI',
      'Kotlin Multiplatform',
    ],
  },
  {
    category: 'Web & Backend',
    items: ['React', 'Next.js', 'Tailwind CSS', 'shadcn/ui'],
  },
  {
    category: 'Infra & Tools',
    items: ['AWS', 'Docker', 'Unraid', 'Git', 'Webpack', 'Linux', 'Cloudflare'],
  },
  {
    category: 'Certifications',
    items: [
      'AWS Cloud Practitioner',
      'CodePath Advanced Technical Interview Prep',
      'CodePath Intro to iOS Dev',
    ],
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
              I&apos;m a Computer Science &amp; Engineering graduate from{' '}
              <strong className='text-foreground'>
                The Ohio State University
              </strong>{' '}
              where I served as the Recording Secretary of OSU&apos;s{' '}
              <strong className='text-foreground'>NSBE</strong> chapter and an
              active member of{' '}
              <strong className='text-foreground'>ColorStack</strong>.
            </p>
            <p>
              I&apos;m an Android Development Engineer at{' '}
              <strong className='text-foreground'>JPMorgan Chase</strong> using
              Jetpack Compose and MVVM, working on the Chase Android app.
            </p>
            <p>
              Previously I interned on Chase&apos;s web team, modernizing an
              internal financial tool for 1000+ global legal entities, and at{' '}
              <strong className='text-foreground'>
                OSU&apos;s Wexner Medical Center
              </strong>
              , where I achieved 100% accessibility compliance across the
              Comprehensive Cancer Center&apos;s site.
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
                Automating processes in my homelab or relating to music
                discovery! I recently built a tool that works with{' '}
                <strong className='text-foreground'>
                  <a
                    href='https://beets.io'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Beets
                  </a>
                </strong>{' '}
                and serves as a frontend for quick library filtering and
                deletion.
              </li>
              <li>
                Traveling and eating with my friends, ask me about my favorite
                spots in Columbus!
              </li>
              <li>
                Tinkering with my smart home. I&apos;d say that I&apos;m
                building on this front, but honestly I&apos;m usually just
                chasing a carrot on a stick.
              </li>
              <li>
                Building, configuring and repairing PCs and Laptops. Admittedly
                this has become hard recently, but I&apos;ll gladly help anyone
                out!
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
                <strong className='text-foreground'>
                  Internal Mobility - JPMC Global Hackathon 2025
                </strong>{' '}
                — 1st place out of 64 Columbus teams building an internal
                mobility assistant with NLP + OpenAI.
              </li>
              <li>
                <strong className='text-foreground'>
                  CTRL-R - JPMC Code for Good 2023
                </strong>{' '}
                — 1st place project to make a digital literacy platform in 24
                hours.
              </li>
              <li>
                <strong className='text-foreground'>SnapVault</strong> — App
                that houses a pipeline to archive a user&apos;s Snapchat
                Memories for media ownership and portability.
              </li>
              <li>
                <strong className='text-foreground'>HDNCHQ Server</strong> —
                Self-hosted Plex, Nextcloud, and Vaultwarden with Docker,
                improving uptime from 40% to 95%.
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
            <CardTitle className='text-2xl font-bold'>
              What&apos;s Next
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4 text-muted-foreground'>
            <p>
              I&apos;m excited to go deeper on Android development with Jetpack
              Compose and to keep pushing on the kinds of products that reach
              people at scale.
            </p>
            <p>
              On the side, I&apos;m continuing to build out personal projects —
              AI tooling, self-hosted infrastructure, and wherever curiosity
              takes me next.
            </p>
            <p>
              I&apos;m currently working on my project SnapVault and looking
              forward to feedback and scaling it! Data ownership is something I
              believe a lot in, and I hope to appeal to other likeminded people.
              Check it out!
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
          <CardTitle className='text-2xl font-bold'>
            Skills &amp; Tools
          </CardTitle>
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
