'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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

const projects: Project[] = [
  { title: 'Project 1', description: 'Description for project 1', image: '/images/project.jpg', imageDescription: 'Project 1', githubLink: 'https://github.com/user/project1' },
  { title: 'Project 2', description: 'Description for project 2', image: '/images/project.jpg', imageDescription: 'Project 2', githubLink: 'https://github.com/user/project2' },
  { title: 'Project 3', description: 'Description for project 3', image: '/images/project.jpg', imageDescription: 'Project 3', githubLink: 'https://github.com/user/project3' },
  { title: 'Project 4', description: 'Description for project 4', image: '/images/project.jpg', imageDescription: 'Project 4', githubLink: 'https://github.com/user/project4' },
];

const ProjectsPage = () => {
  return (
    <div className='p-6'>
      <h2 className='mb-4 text-2xl font-bold'>My Projects</h2>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3'>
        {projects.map((project, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image
                src={project.image}
                width={300}
                height={200}
                alt={project.imageDescription}
              />
            </CardContent>
            <CardFooter>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant='outline'>View Project</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{project.title}</DialogTitle>
                    <DialogDescription>{project.description}</DialogDescription>
                  </DialogHeader>
                  <div className='mt-4'>
                    <Image
                      src={project.image}
                      width={300}
                      height={200}
                      alt={project.imageDescription}
                    />
                  </div>
                  <div className='mt-4'>
                    <Button>
                      <Link
                        href={project.githubLink}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        View on GitHub
                      </Link>
                    </Button>
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
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
