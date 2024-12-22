"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Project } from '@/app/types';
import Link from 'next/link';

const projects: Project[] = [
  { title: 'Project 1', description: 'Description for project 1', image: '/images/project.jpg', imageDescription: 'Project 1', githubLink: 'https://github.com/user/project1' },
  { title: 'Project 2', description: 'Description for project 2', image: '/images/project.jpg', imageDescription: 'Project 2', githubLink: 'https://github.com/user/project2' },
  { title: 'Project 3', description: 'Description for project 3', image: '/images/project.jpg', imageDescription: 'Project 3', githubLink: 'https://github.com/user/project3' },
  { title: 'Project 4', description: 'Description for project 4', image: '/images/project.jpg', imageDescription: 'Project 4', githubLink: 'https://github.com/user/project4' },
];

const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openDialog = (project: Project) => {
    setSelectedProject(project);
  };

  const closeDialog = () => {
    setSelectedProject(null);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        My Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Image src={project.image} width={300} height={200} alt={project.imageDescription} />
            </CardContent>
            <CardFooter>
              <DialogTrigger asChild>
                <Button variant="outline" onClick={() => openDialog(project)}>View Project</Button>
              </DialogTrigger>
            </CardFooter>
          </Card>
        ))}
      </div>
      {selectedProject && (
        <Dialog open={!!selectedProject} onOpenChange={closeDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedProject.title}</DialogTitle>
              <DialogDescription>{selectedProject.description}</DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <Image src={selectedProject.image} width={300} height={200} alt={selectedProject.imageDescription} />
            </div>
            <div className="mt-4">
              <Button><Link href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer">
                View on GitHub
              </Link>
              </Button>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ProjectsPage;