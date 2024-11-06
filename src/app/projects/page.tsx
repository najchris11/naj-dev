import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const projects = [
  { title: 'Project 1', description: 'Description for project 1' },
  { title: 'Project 2', description: 'Description for project 2' },
  { title: 'Project 3', description: 'Description for project 3' },
  { title: 'Project 4', description: 'Description for project 4' },
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
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">
                {project.title}
              </h3>
              <p className="text-base text-gray-700">
                {project.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;