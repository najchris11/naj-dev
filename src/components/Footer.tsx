import { FaLinkedin, FaGithub, FaTiktok, FaYoutube } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className='bg-muted py-4 text-muted-foreground'>
      <div className='container mx-auto flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0'>
        {/* Copyright */}
        <p className='text-sm'>
          &copy; {new Date().getFullYear()} Christian Coulibaly. All rights
          reserved.
        </p>

        {/* Social Links */}
        <div className='flex space-x-4'>
          <a
            href='https://www.linkedin.com/in/christiancoulibaly'
            target='_blank'
            rel='noopener noreferrer'
            className='text-muted-foreground transition hover:text-primary'
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href='https://github.com/najchris11'
            target='_blank'
            rel='noopener noreferrer'
            className='text-muted-foreground transition hover:text-primary'
          >
            <FaGithub size={24} />
          </a>
          <a
            href='https://www.tiktok.com/@naj_dev'
            target='_blank'
            rel='noopener noreferrer'
            className='text-muted-foreground transition hover:text-primary'
          >
            <FaTiktok size={24} />
          </a>
          <a
            href='https://www.youtube.com/@naj-dev'
            target='_blank'
            rel='noopener noreferrer'
            className='text-muted-foreground transition hover:text-primary'
          >
            <FaYoutube size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};
