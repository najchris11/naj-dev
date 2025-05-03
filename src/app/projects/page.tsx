'use client';
import React from 'react';
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

const ProjectsPage = () => {
  return (
    <div className='p-6'>
      <h2 className='mb-4 text-2xl font-bold'>My Projects</h2>
      <div className='columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3'>
        {projects.map((project: Project, index: number) => (
          <div key={index} className='break-inside-avoid'>
            <Card>
              {project.image && project.imageDescription && (
                <CardContent className='pt-6'>
                  <Image
                    src={`/images/${project.image}`}
                    width={300}
                    height={200}
                    alt={project.imageDescription}
                    className='w-full object-cover rounded-t-lg'
                  />
                </CardContent>
              )}
              <CardHeader>
                <div className='flex flex-col space-y-1'>
                  <CardTitle>{project.title}</CardTitle>
                  <p className='text-sm text-muted-foreground'>{project.date}</p>
                </div>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant='outline'>View Project</Button>
                  </DialogTrigger>
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
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
