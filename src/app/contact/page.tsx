import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Christian Coulibaly.',
};

const contacts = [
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'najchris11@yahoo.com',
    href: 'mailto:najchris11@yahoo.com',
    description: 'Best for direct, longer-form inquiries.',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    value: 'christiancoulibaly',
    href: 'https://linkedin.com/in/christiancoulibaly',
    description: 'Professional networking and opportunities.',
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    value: 'najchris11',
    href: 'https://github.com/najchris11',
    description: 'See what I\'m building.',
  },
];

export default function ContactPage() {
  return (
    <section className='mx-auto max-w-3xl space-y-10 p-8'>
      <div>
        <h1 className='text-4xl font-extrabold tracking-tight'>Get in Touch</h1>
        <p className='mt-3 text-lg text-muted-foreground'>
          Whether you have a project in mind, a question, or just want to say
          hello — I&apos;m always happy to hear from you.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-3'>
        {contacts.map(({ icon: Icon, label, value, href, description }) => (
          <Card
            key={label}
            className='shadow-md transition-shadow hover:shadow-lg'
          >
            <CardHeader className='pb-2'>
              <CardTitle className='flex items-center gap-2 text-lg'>
                <Icon className='text-primary' size={18} />
                {label}
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-3'>
              <p className='text-sm text-muted-foreground'>{description}</p>
              <Button asChild variant='outline' className='w-full text-primary'>
                <Link href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel='noopener noreferrer'>
                  {value}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className='text-sm text-muted-foreground'>
        I typically respond within a day or two. Looking forward to connecting!
      </p>
    </section>
  );
}
