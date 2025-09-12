'use client';
import React, { useState, useEffect, useRef } from 'react';
import styles from './projects.module.css';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import projects from '@/data/projects.json';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Project } from '@/app/types';
import Link from 'next/link';

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className={styles.item}>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer border-0 shadow-md">
        <Dialog>
          <DialogTrigger asChild>
            <div className="w-full">
              {/* Image Section */}
              {project.image && !imageError && (
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className={`transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}>
                    <Image
                      src={`/images/${project.image}`}
                      width={400}
                      height={300}
                      alt={project.imageDescription || project.title}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      onLoad={() => setImageLoaded(true)}
                      onError={() => setImageError(true)}
                      priority={index < 6}
                    />
                  </div>
                  {!imageLoaded && (
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-t-lg" />
                  )}
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}

              {/* Content Section */}
              <CardHeader className="pb-3">
                <div className="space-y-2">
                  <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </CardTitle>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground font-medium">
                      {project.date}
                    </p>
                    {project.status && (
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        project.status === 'Completed' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : project.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                      }`}>
                        {project.status}
                      </span>
                    )}
                  </div>
                </div>
                <CardDescription className="text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </CardDescription>
              </CardHeader>

              {/* Tech Stack Pills */}
              {project.techStack && project.techStack.length > 0 && (
                <CardContent className="pt-0 pb-3">
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.slice(0, 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-md">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </CardContent>
              )}

              {/* Footer with minimal action indicator */}
              <CardFooter className="pt-0 pb-4">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-2">
                    {project.githubRepo && (
                      <div className="w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600" />
                    )}
                    {project.youtubeUrl && (
                      <div className="w-4 h-4 rounded-full bg-red-500" />
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                    Click to view
                  </div>
                </div>
              </CardFooter>
            </div>
          </DialogTrigger>

          {/* Dialog Content - Keep the existing modal */}
          <DialogContent className='max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg p-4'>
            <DialogHeader>
              <DialogTitle>{project.title}</DialogTitle>
              <DialogDescription>{project.description}</DialogDescription>
            </DialogHeader>
            <div className='mt-4 space-y-4'>
              {/* Render YouTube Video */}
              {project.youtubeUrl ? (
                <div className='aspect-w-16 aspect-h-9'>
                  <iframe
                    src={project.youtubeUrl.replace('watch?v=', 'embed/')}
                    title={project.title}
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                  />
                </div>
              ) : project.image ? (
                <Image
                  src={`/images/${project.image}`}
                  alt={project.imageDescription || 'Project image'}
                  width={800}
                  height={450}
                />
              ) : null}

              {/* Display tech stack */}
              {project.techStack && (
                <div>
                  <h3 className='font-semibold'>Tech Stack:</h3>
                  <ul className='list-disc pl-5'>
                    {project.techStack.map((tech, index) => (
                      <li key={index}>{tech}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Display role */}
              {project.role && (
                <div>
                  <h3 className='font-semibold'>Role:</h3>
                  <p>{project.role}</p>
                </div>
              )}

              {/* Display achievements */}
              {project.achievements && (
                <div>
                  <h3 className='font-semibold'>Achievements:</h3>
                  <ul className='list-disc pl-5'>
                    {project.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Display additional details */}
              <div>
                <p>
                  <strong>Date:</strong> {project.date}
                </p>
                <p>
                  <strong>Status:</strong> {project.status}
                </p>
                {project.additionalNotes && (
                  <p>
                    <strong>Notes:</strong> {project.additionalNotes}
                  </p>
                )}
              </div>

              {/* Display GitHub Repo link */}
              <div className='mt-4'>
                {project.githubRepo ? (
                  <Link
                    href={project.githubRepo}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    View on GitHub
                  </Link>
                ) : (
                  <span>Repository Not Available</span>
                )}
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Card>
    </div>
  );
};

const ProjectsPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [supportsNativeMasonry, setSupportsNativeMasonry] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check for native masonry support
  useEffect(() => {
    setIsMounted(true);
    const testElement = document.createElement('div');
    testElement.style.display = 'grid';
    testElement.style.gridTemplateRows = 'masonry';
    const supportsmasonry = testElement.style.gridTemplateRows === 'masonry';
    setSupportsNativeMasonry(supportsmasonry);
  }, []);

  // Effect to handle custom masonry layout for non-supporting browsers
  useEffect(() => {
    if (!isMounted || supportsNativeMasonry || !containerRef.current) return;
    
    const arrangeItems = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const items = Array.from(container.children) as HTMLElement[];
      if (items.length === 0) return;

      // Get the number of columns based on screen size
      const getColumnCount = () => {
        const width = window.innerWidth;
        if (width >= 1280) return 5;
        if (width >= 1024) return 4;
        if (width >= 768) return 3;
        if (width >= 640) return 2;
        return 1;
      };

      const columns = getColumnCount();
      const gap = 24; // 1.5rem = 24px
      
      // Initialize column heights array
      const columnHeights = new Array(columns).fill(0);
      
      // Clear any existing grid positioning
      items.forEach((item) => {
        item.style.gridColumn = '';
        item.style.gridRow = '';
      });

      // Wait for natural layout to settle, then position items
      requestAnimationFrame(() => {
        items.forEach((item, index) => {
          // Get natural height of the item
          const itemHeight = item.offsetHeight;
          
          let targetColumn;
          
          // For the first row, place items left to right chronologically
          if (index < columns) {
            targetColumn = index;
          } else {
            // For subsequent items, find the column with minimum height (highest available position)
            targetColumn = columnHeights.indexOf(Math.min(...columnHeights));
          }
          
          // Calculate grid row position
          const rowStart = Math.floor(columnHeights[targetColumn] / 10) + 1;
          const rowSpan = Math.ceil((itemHeight + gap) / 10);
          
          // Apply grid positioning
          item.style.gridColumn = `${targetColumn + 1}`;
          item.style.gridRow = `${rowStart} / span ${rowSpan}`;
          
          // Update column height
          columnHeights[targetColumn] += itemHeight + gap;
        });
      });
    };

    // Initial arrangement with delay to ensure items are rendered
    const timeoutId = setTimeout(arrangeItems, 150);

    // Rearrange on window resize
    const handleResize = () => {
      clearTimeout(timeoutId);
      setTimeout(arrangeItems, 150);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMounted, supportsNativeMasonry]);

  // Show fallback layout until we determine masonry support
  if (!isMounted) {
    return (
      <div className='min-h-screen bg-background'>
        <div className='p-6 pb-4'>
          <div className='max-w-7xl mx-auto'>
            <h1 className='text-3xl font-bold mb-2'>My Projects</h1>
            <p className='text-muted-foreground'>
              A collection of my work across different technologies and domains
            </p>
          </div>
        </div>
        <div className='px-6 pb-6'>
          <div className='max-w-7xl mx-auto'>
            <div className={styles['container-fallback']}>
              {projects.map((project: Project, index: number) => (
                <ProjectCard key={index} project={project} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background'>
      {/* Header */}
      <div className='p-6 pb-4'>
        <div className='max-w-7xl mx-auto'>
          <h1 className='text-3xl font-bold mb-2'>My Projects</h1>
          <p className='text-muted-foreground'>
            A collection of my work across different technologies and domains
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className='px-6 pb-6'>
        <div className='max-w-7xl mx-auto'>
          <div 
            ref={containerRef}
            className={styles.container}
          >
            {projects.map((project: Project, index: number) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;