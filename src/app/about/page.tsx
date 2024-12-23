'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <div className="p-8 space-y-8">
      {/* Introduction Section */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Hi, I’m Christian 👋</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            I’m a passionate software developer with experience working on innovative web
            projects, from designing accessible websites to building modern applications.
            Currently, I’m pursuing my education at <strong>Ohio State University</strong>, where I’m
            actively involved in the <strong>National Society of Black Engineers (NSBE)</strong>.
          </p>
          <p>
            My recent work includes a <strong>Next.js CMS project</strong> designed to simplify content
            management, a portfolio site for <strong>M.C. Jeter</strong>, and a revamp of the
            <strong>mcjeterbooks</strong> website. During my internship at <strong>JP Morgan Chase</strong>, I
            developed a new React frontend for an internal tool used by thousands of
            legal entities, collaborating with international teams and UX designers.
          </p>
          <p>
            My commitment to accessible and user-friendly designs is evident in the work
            I’ve done modernizing outdated systems and supporting organizations to better
            manage their content through tools like <strong>Umbraco</strong>.
          </p>
        </CardContent>
      </Card>

      {/* Hobbies Section */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">When I’m Not Coding...</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            You’ll probably find me enjoying some of my favorite hobbies:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Exploring music with <strong>Plexamp</strong> and creating personalized playlists.</li>
            <li>Gaming on my <strong>2DS XL</strong> or diving into strategy and indie titles.</li>
            <li>Experimenting with tech setups, like improving my home network with
              OpenWRT and Unifi.</li>
          </ul>
          <p>
            These hobbies inspire me to approach challenges with creativity and provide
            balance in my life. Whether it’s curating music playlists or tweaking network
            configurations, I love blending tech with fun.
          </p>
        </CardContent>
      </Card>

      {/* Projects Section */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Some Projects I’ve Worked On</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>M.C. Jeter’s Portfolio Website</strong>: Built a fast, responsive site with an
              estimated 25% uplift in sales and social media interactions.
            </li>
            <li>
              <strong>Next.js CMS Project</strong>: Developed a lightweight CMS for handling aesthetics
              and adding dynamic content effortlessly.
            </li>
            <li>
              <strong>JP Morgan Chase Internship</strong>: Modernized an internal legal entity tool,
              increasing maintainability and aligning with 99% uptime goals.
            </li>
            <li>
              <strong>HDNCHQ Server Management</strong>: Improved server uptime to 95% with optimized
              Docker configurations for tools like Plex, Nextcloud, and Vaultwarden.
            </li>
          </ul>
          <p>
            Each project reflects my dedication to building solutions that are practical,
            impactful, and user-focused.
          </p>
        </CardContent>
      </Card>

      {/* Goals Section */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">What’s Next?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            My current focus is on advancing my knowledge of federated modules, modern
            frameworks like Next.js, and exploring AI-powered solutions. I’m especially
            interested in enhancing user experiences and building scalable systems.
          </p>
          <Button asChild>
            <Link href="/contact">Let’s Connect</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;