import { Button } from '@/components/ui/button';
import { FaDownload } from 'react-icons/fa';
import Link from 'next/link';

export default function Resume() {
  return (
    <div className='py-12'>
      <div className='mx-auto max-w-5xl'>
        <h1 className='mb-6 text-center'>Resume</h1>

        {/* PDF Embed */}
        <div className='mb-8 h-[800px] w-full'>
          <iframe
            src='/resume.pdf'
            width='100%'
            height='100%'
            style={{ border: 'none' }}
            title='Resume'
          />
        </div>

        {/* Download Button */}
        <div className='text-center'>
          <Button
            asChild
            variant='outline'
            className='mx-auto flex items-center justify-center gap-2'
          >
            <Link href='/resume.pdf' download>
              <FaDownload /> Download Resume
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
