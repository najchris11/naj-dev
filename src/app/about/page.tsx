'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className='grid grid-cols-1 gap-8 p-8 md:grid-cols-2'>
      {' '}
      {/* Introduction Section */}
      <Card className='shadow-md'>
        <CardHeader>
          <CardTitle className='text-3xl font-bold'>
            Hi, I&apos;m Christian 👋
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p>
            I&apos;m a passionate software developer with experience working on
            innovative web projects, from designing accessible websites to
            building modern applications. I&apos;m currently studying at{' '}
            <strong>The Ohio State University</strong>, where I&apos;m actively
            involved in our chapter of{' '}
            <strong>National Society of Black Engineers (NSBE)</strong> and{' '}
            <strong>ColorStack</strong>.
          </p>
          <p>
            My recent work includes a <strong>Next.js CMS project</strong>{' '}
            designed to simplify content management, a portfolio site for{' '}
            <strong>M.C. Jeter</strong>, and a music recommendation and pattern
            analysis platform using Last.fm&apos;s API.
          </p>
          <p>
            I&apos;m currently interning at <strong>JP Morgan Chase</strong>,
            where I&apos;ve developed a new React frontend for an internal tool
            used by thousands of legal entities, collaborating with
            international teams and UX designers. Additionally for{' '}
            <strong>OSU&apos;s Wexner Medical Center</strong>, I&apos;ve gained
            valuable insight on accessible and user-friendly designs while I
            modernized an outdated system and supported organizations to better
            manage their content through content management systems like
            Umbraco.
          </p>
        </CardContent>
      </Card>
      {/* Hobbies Section */}
      <Card className='shadow-md'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>
            When I’m Not Coding...
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p>You’ll probably find me enjoying some of my favorite hobbies:</p>
          <ul className='ml-6 list-disc space-y-2'>
            <li>
              Exploring music with Plexamp and creating personalized playlists.
            </li>
            <li>
              Gaming with my friends or diving into strategy and indie titles.
            </li>
            <li>
              Experimenting with tech setups, like improving my home network
              with OpenWRT and Unifi.
            </li>
          </ul>
          <p>
            These hobbies inspire me to approach challenges with creativity and
            provide balance in my life. Whether it&apos;s curating music
            playlists or tweaking network configurations, I love blending tech
            with fun.
          </p>
        </CardContent>
      </Card>
      {/* Projects Section */}
      <Card className='shadow-md'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>
            Some Projects I&apos;ve Worked On
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <ul className='ml-6 list-disc space-y-2'>
            <li>
              <strong>M.C. Jeter&apos;s Portfolio Website</strong>: Built a
              fast, responsive site with an estimated 25% uplift in sales and
              social media interactions.
            </li>
            <li>
              <strong>Next.js CMS Project</strong>: Developed a lightweight CMS
              for handling aesthetics and adding dynamic content effortlessly.
            </li>
            <li>
              <strong>JP Morgan Chase Internship</strong>: Modernized an
              internal legal entity tool, increasing maintainability and
              aligning with 99% uptime goals.
            </li>
            <li>
              <strong>HDNCHQ Server Management</strong>: Improved server uptime
              to 95% with optimized Docker configurations for tools like Plex,
              Nextcloud, and Vaultwarden.
            </li>
          </ul>
          <p>
            Each project reflects my dedication to building solutions that are
            practical, impactful, and user-focused.
          </p>
        </CardContent>
      </Card>
      {/* Goals Section */}
      <Card className='shadow-md'>
        <CardHeader>
          <CardTitle className='text-2xl font-bold'>What’s Next?</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <p>
            My current focus is on advancing my knowledge of federated modules,
            modern frameworks like Next.js, and exploring AI-powered solutions.
            I’m especially interested in enhancing user experiences and building
            scalable systems.
          </p>
          <Button asChild>
            <Link href='/contact'>Let’s Connect</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;
