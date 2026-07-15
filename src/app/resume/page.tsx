import { Button } from '@/components/ui/button';
import { FaDownload } from 'react-icons/fa';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume',
  description: 'View and download Christian Coulibaly\'s resume.',
};

export default function Resume() {
  return (
    <div className='mx-auto max-w-5xl space-y-6 p-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-4xl font-extrabold tracking-tight'>Resume</h1>
        <Button
          asChild
          variant='outline'
          className='flex items-center gap-2 text-primary'
        >
          <Link href='/resume.pdf' download>
            <FaDownload />
            Download PDF
          </Link>
        </Button>
      </div>

      <div className='h-[800px] w-full overflow-hidden rounded-lg border border-border shadow-md'>
        <iframe
          src='/resume.pdf'
          width='100%'
          height='100%'
          style={{ border: 'none' }}
          title='Christian Coulibaly Resume'
        />
      </div>
    </div>
  );
}
