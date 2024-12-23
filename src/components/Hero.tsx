import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className='pb-24 pt-12 lg:pb-32 lg:pt-16'>
      <div className='container mx-auto px-4'>
        <div className='grid items-center gap-8 md:grid-cols-2'>
          {/* Left Column */}
          <div>
            <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl'>
              Christian Coulibaly
            </h1>
            <p className='mt-4 text-xl text-muted-foreground'>
              Software Engineering student with a passion for computing and
              developing fun and exciting solutions to new problems.
            </p>
            <div className='mt-6 flex flex-wrap gap-4'>
              <Link href='/about'>
                <Button variant='outline' size='lg' className='text-primary'>
                  Learn More About Me
                </Button>
              </Link>

              <Link href='/projects'>
                <Button size='lg'>See Projects</Button>
              </Link>
            </div>
          </div>
          {/* Right Column */}
          <div className='relative'>
            <Image
              className='w-full rounded-md border border-border'
              src={`/images/main photo.jpg`}
              alt='Profile picture of Christian Coulibaly'
              width={800}
              height={700}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
