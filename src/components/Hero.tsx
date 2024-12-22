import { Button } from '@/components/ui/button';
import Image from 'next/image';
// import { FaStar, FaStarHalfAlt } from "react-icons/fa"; // Import React Icons
import ProfilePic from '@/assets/main photo.jpg';

export default function Hero() {
  return (
    <section className='pb-24 pt-12 lg:pb-32 lg:pt-16'>
      <div className='container mx-auto px-4'>
        {/* Grid Layout */}
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
            {/* Buttons */}
            <div className='mt-6 flex flex-wrap gap-4'>
              <Button size='lg'>See Projects</Button>
              <Button variant='outline' size='lg'>
                Contact me
              </Button>
            </div>
          </div>
          {/* Right Column */}
          <div className='relative'>
            <Image
              className='w-full rounded-md'
              src={ProfilePic}
              alt='Image Description'
              width={800}
              height={700}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
