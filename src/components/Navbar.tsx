"use client"

import { useState } from "react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import najDevBrand from "@/assets/naj-dev-text.png"
import { FaBars, FaGithub, FaLinkedin } from "react-icons/fa";
import { cn } from "@/lib/utils";
import React from "react";
import { ModeToggle } from "./ModeToggle";

const projects: { title: string; href: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/primitives/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/primitives/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/primitives/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/primitives/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/primitives/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/primitives/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
]

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="p-4 border-b">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Image src={najDevBrand} alt="Brand logo" height={40} width={100} />
                </div>

                {/* Hamburger Menu Icon for Mobile */}
                <div className="md:hidden">
                    <Button variant="ghost" onClick={() => { setMenuOpen(!menuOpen); }}>
                        <FaBars size={24} />
                    </Button>
                </div>

                {/* Navigation Menu for Desktop */}
                <NavigationMenu className="hidden md:block">
                    <NavigationMenuList className="flex space-x-4">

                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                                <Link href="/">Home</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                                <Link href="/about">About</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                                <Link href="/contact">Contact</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                    {projects.map((project) => (
                                        <ListItem
                                            key={project.title}
                                            title={project.title}
                                            href={project.href}
                                        >
                                            {project.description}
                                        </ListItem>
                                    ))}
                                </ul>
                            </NavigationMenuContent>
                        </NavigationMenuItem>

                    </NavigationMenuList>
                </NavigationMenu>

                {/* Social Icons and Mode Toggle */}
                <div className="flex items-center space-x-2">
                    <div className="h-6 border-l border-green-600" /> {/* let's find a way to make this match the theme color*/}
                    <ModeToggle />
                    <Button variant="outline" size="icon">
                        <Link href="https://github.com/najchris11" target="_blank" rel="noopener noreferrer">
                            <FaGithub size={20} />
                        </Link>
                    </Button>
                    <Button variant="outline" size="icon">
                        <Link href="https://linkedin.com/in/christiancoulibaly" target="_blank" rel="noopener noreferrrer">
                            <FaLinkedin size={20} />
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen &&
            <div className="md:hidden mt-2">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-col space-y-2">
                {/* Mobile Navigation Items */}
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                    <Link href="/" onClick={() => setMenuOpen(false)}>
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
  
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                    <Link href="/about" onClick={() => setMenuOpen(false)}>
                      About
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
  
                <NavigationMenuItem>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                    <Link href="/contact" onClick={() => setMenuOpen(false)}>
                      Contact
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
  
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-4">
                      {projects.map((project) => (
                        <ListItem
                          key={project.title}
                          title={project.title}
                          href={project.href}
                        >
                          {project.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
            }
        </nav>

    );
}
