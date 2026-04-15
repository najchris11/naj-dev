import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const techTags = [
  'Kotlin',
  'Jetpack Compose',
  'React',
  'Next.js',
  'TypeScript',
  'Python',
];

export default function Hero() {
  return (
    <section className='pb-24 pt-12 lg:pb-32 lg:pt-16'>
      <div className='container mx-auto px-4'>
        <div className='grid items-center gap-12 md:grid-cols-2'>
          {/* Left Column */}
          <div>
            <span className='mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary'>
              Incoming Android Engineer @ Chase
            </span>
            <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl'>
              Christian Coulibaly
            </h1>
            <p className='mt-4 text-xl text-muted-foreground'>
              Mobile engineer in the making. I build things for Android, the
              web, and whatever else in between — from 70M-user apps to
              side projects born from genuine curiosity.
            </p>
            <div className='mt-6 flex flex-wrap gap-4'>
              <Link href='/projects'>
                <Button size='lg'>See My Work</Button>
              </Link>
              <Link href='/about'>
                <Button variant='outline' size='lg' className='text-primary'>
                  About Me
                </Button>
              </Link>
            </div>
            <div className='mt-8 flex flex-wrap gap-2'>
              {techTags.map((tag) => (
                <span
                  key={tag}
                  className='rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground'
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          {/* Right Column */}
          <div className='relative'>
            <div className='absolute -inset-1 rounded-lg bg-gradient-to-br from-primary/30 to-primary/5 blur-sm' />
            <Image
              className='relative w-full rounded-lg border border-border object-cover shadow-md'
              src='/images/main photo.jpg'
              alt='Profile picture of Christian Coulibaly'
              width={800}
              height={700}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
