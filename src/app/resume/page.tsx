import { Button } from '@/components/ui/button';
import { FaDownload } from 'react-icons/fa';
import Link from 'next/link'

export default function Resume() {
    return(
        <div className="py-12">
            <div className='max-w-5xl mx-auto'>
                <h1 className="text-center mb-6">
                    Resume
                </h1>

                {/* PDF Embed */}
                <div className="w-full h-[800px] mb-8">
                    <iframe
                    src='/resume.pdf'
                    width="100%"
                    height="100%"
                    style={{border: 'none'}}
                    title='Resume'
                    />
                </div>

                {/* Download Button */}
                <div className='text-center'>
                    <Button
                    asChild
                    variant="outline"
                    className='flex items-center justify-center gap-2 mx-auto'
                    >
                        <Link href="/resume.pdf" download>
                        <FaDownload /> Download Resume
                        </Link>
                    </Button>
                </div>
            </div>
        </div>

    );
}