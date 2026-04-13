'use client';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Button } from './ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaGithub, FaLinkedin } from 'react-icons/fa';
import React from 'react';
import { ModeToggle } from './ModeToggle';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

export const Navbar = () => {

  return (
    <nav className='sticky top-0 z-50 border-b bg-background p-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center'>
          <Link href='/'>
            <Image
              src={`/logos/naj-dev-text.png`}
              alt='Brand logo'
              height={40}
              width={100}
            />
          </Link>
        </div>

        {/* Navigation Menu for Desktop */}
        <NavigationMenu className='hidden md:block'>
          <NavigationMenuList className='flex space-x-4'>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                asChild
              >
                <Link href='/'>Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                asChild
              >
                <Link href='/about'>About</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                asChild
              >
                <Link href='/projects'>Projects</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                asChild
              >
                <Link href='/resume'>Resume</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                asChild
              >
                <Link href='/contact'>Contact</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Social Icons and Mode Toggle */}
        <div className='flex items-center space-x-2'>
          <Separator orientation='vertical' className='h-6' />
          <ModeToggle />
          <Button variant='outline' size='icon'>
            <Link
              href='https://github.com/najchris11'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaGithub size={20} />
            </Link>
          </Button>
          <Button variant='outline' size='icon'>
            <Link
              href='https://linkedin.com/in/christiancoulibaly'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaLinkedin size={20} />
            </Link>
          </Button>
          {/* Mobile Drawer Navigation (Sheet) */}
          <div className='md:hidden'>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='ghost' aria-label='Open menu'>
                  <FaBars size={20} />
                </Button>
              </SheetTrigger>
              <SheetContent side='left' className='w-[85vw] sm:w-[22rem] p-0'>
                <div className='p-4'>
                  <SheetHeader className='mb-2'>
                    <SheetTitle className='flex items-center gap-2'>
                      <Image
                        src={'/logos/naj-dev-text.png'}
                        alt='Brand logo'
                        height={32}
                        width={80}
                      />
                    </SheetTitle>
                  </SheetHeader>

                  {/* Optional: Theme toggle inside drawer */}
                  <div className='mb-3'>
                    <ModeToggle />
                  </div>

                  {/* Nav Items - full width grey with small inner margin */}
                  <nav className='flex flex-col gap-2 px-2'>
                    <SheetClose asChild>
                      <Link
                        href='/'
                        className='block w-full rounded-md bg-muted px-4 py-2 text-foreground shadow-sm hover:bg-muted/80 transition-colors'
                      >
                        Home
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href='/about'
                        className='block w-full rounded-md bg-muted px-4 py-2 text-foreground shadow-sm hover:bg-muted/80 transition-colors'
                      >
                        About
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href='/projects'
                        className='block w-full rounded-md bg-muted px-4 py-2 text-foreground shadow-sm hover:bg-muted/80 transition-colors'
                      >
                        Projects
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href='/resume'
                        className='block w-full rounded-md bg-muted px-4 py-2 text-foreground shadow-sm hover:bg-muted/80 transition-colors'
                      >
                        Resume
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href='/contact'
                        className='block w-full rounded-md bg-muted px-4 py-2 text-foreground shadow-sm hover:bg-muted/80 transition-colors'
                      >
                        Contact
                      </Link>
                    </SheetClose>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

    </nav>
  );
};
