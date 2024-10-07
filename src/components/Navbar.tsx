"use client"

import { useState } from "react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import najDevBrand from "@/assets/naj-dev-text.png"
import { FaBars, FaGithub, FaLinkedin } from "react-icons/fa";
import React from "react";
import { ModeToggle } from "./ModeToggle";

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
                                <Link href="/projects">Projects</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                                <Link href="/resume">Resume</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                                <Link href="/contact">Contact</Link>
                            </NavigationMenuLink>
                        </NavigationMenuItem>

                    </NavigationMenuList>
                </NavigationMenu>

                {/* Social Icons and Mode Toggle */}
                <div className="flex items-center space-x-2">
                    <div className="h-6 border-l border-primary" />
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
                                    <Link href="/projects">Projects</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                                    <Link href="/resume">Resume</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
                                    <Link href="/contact" onClick={() => setMenuOpen(false)}>
                                        Contact
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            }
        </nav>

    );
}
