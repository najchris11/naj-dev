import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const projects = [
    { title: 'Project 1', description: 'Description for project 1', image: '/images/project.jpg', imageDescription: 'Project 1' },
    { title: 'Project 2', description: 'Description for project 2', image: '/images/project.jpg', imageDescription: 'Project 2' },
    { title: 'Project 3', description: 'Description for project 3', image: '/images/project.jpg', imageDescription: 'Project 3' },
    { title: 'Project 4', description: 'Description for project 4', image: '/images/project.jpg', imageDescription: 'Project 4' },
];

const ProjectsPage = () => {
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
                            <Image src={project.image} width={300} height={200} alt="Project" />
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline">View Project</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ProjectsPage;