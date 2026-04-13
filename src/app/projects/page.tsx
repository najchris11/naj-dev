'use client';
import React, { useState, useMemo } from 'react';
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
import { FaGithub, FaYoutube } from 'react-icons/fa';
import { FiCheckCircle, FiChevronRight } from 'react-icons/fi';
import projectsData from '@/data/projects.json';

const STATUS_FILTERS = ['All', 'In Progress', 'Completed', 'Ongoing'] as const;

function statusBadgeClass(status: string) {
  if (status === 'Completed')
    return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
  if (status === 'In Progress')
    return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
  if (status === 'Ongoing')
    return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
  return 'bg-muted text-muted-foreground';
}

const ProjectModal = ({ project }: { project: Project }) => (
  <DialogContent className='max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg p-0'>
    {project.youtubeUrl ? (
      <div className='aspect-video w-full overflow-hidden rounded-t-lg bg-black'>
        <iframe
          src={project.youtubeUrl.replace('watch?v=', 'embed/')}
          title={project.title}
          className='h-full w-full'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      </div>
    ) : project.image ? (
      <div className='relative h-52 w-full overflow-hidden rounded-t-lg'>
        <Image
          src={`/images/${project.image}`}
          alt={project.imageDescription || project.title}
          fill
          className='object-cover'
        />
      </div>
    ) : null}

    <div className='space-y-5 p-6'>
      <DialogHeader>
        <div className='flex flex-wrap items-start justify-between gap-2'>
          <DialogTitle className='text-xl'>{project.title}</DialogTitle>
          {project.status && (
            <span
              className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadgeClass(project.status)}`}
            >
              {project.status}
            </span>
          )}
        </div>
        <DialogDescription className='text-sm leading-relaxed'>
          {project.description}
        </DialogDescription>
      </DialogHeader>

      <div className='flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground'>
        {project.role && (
          <span>
            <strong className='text-foreground'>Role</strong> — {project.role}
          </span>
        )}
        <span>
          <strong className='text-foreground'>Date</strong> — {project.date}
        </span>
      </div>

      {project.techStack && project.techStack.length > 0 && (
        <div>
          <p className='mb-2 text-sm font-semibold uppercase tracking-wider text-primary'>
            Tech Stack
          </p>
          <div className='flex flex-wrap gap-1.5'>
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className='rounded-md border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground'
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}

      {project.achievements && project.achievements.length > 0 && (
        <div>
          <p className='mb-2 text-sm font-semibold uppercase tracking-wider text-primary'>
            Highlights
          </p>
          <ul className='space-y-1.5'>
            {project.achievements.map((a, i) => (
              <li key={i} className='flex items-start gap-2 text-sm'>
                <FiCheckCircle className='mt-0.5 shrink-0 text-primary' size={14} />
                <span className='text-muted-foreground'>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {project.additionalNotes && (
        <p className='rounded-md border border-border bg-muted/50 p-3 text-xs leading-relaxed text-muted-foreground'>
          {project.additionalNotes}
        </p>
      )}
    </div>

    <DialogFooter className='flex-row items-center gap-2 border-t border-border px-6 py-4'>
      {project.githubRepo ? (
        <Button asChild variant='outline' size='sm' className='gap-1.5 text-primary'>
          <Link href={project.githubRepo} target='_blank' rel='noopener noreferrer'>
            <FaGithub size={14} />
            View on GitHub
          </Link>
        </Button>
      ) : (
        <span className='text-xs text-muted-foreground'>Repository not public</span>
      )}
      <DialogClose asChild>
        <Button variant='ghost' size='sm' className='ml-auto'>
          Close
        </Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
);

const ProjectRow = ({ project, index }: { project: Project; index: number }) => (
  <Dialog>
    <DialogTrigger asChild>
      <div className='group flex cursor-pointer items-start gap-4 rounded-lg border border-transparent px-3 py-4 transition-colors hover:border-border hover:bg-muted/40'>
        {/* Thumbnail */}
        <div className='relative h-16 w-16 shrink-0 overflow-hidden rounded-md border border-border bg-muted sm:h-20 sm:w-20'>
          {project.image ? (
            <Image
              src={`/images/${project.image}`}
              alt={project.imageDescription || project.title}
              fill
              className='object-cover'
              priority={index < 6}
            />
          ) : (
            <span className='flex h-full w-full items-center justify-center text-xl font-bold text-muted-foreground'>
              {project.title.charAt(0)}
            </span>
          )}
        </div>

        {/* Content */}
        <div className='min-w-0 flex-1 space-y-1.5'>
          {/* Title row */}
          <div className='flex flex-wrap items-center gap-2'>
            <span className='font-semibold leading-tight transition-colors group-hover:text-primary'>
              {project.title}
            </span>
            {project.status && (
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusBadgeClass(project.status)}`}
              >
                {project.status}
              </span>
            )}
            {project.youtubeUrl && (
              <FaYoutube size={12} className='text-red-500' title='Video available' />
            )}
            {project.githubRepo && (
              <FaGithub size={12} className='text-muted-foreground' title='GitHub available' />
            )}
          </div>

          {/* Date + role */}
          <p className='text-xs text-muted-foreground'>
            {project.date}
            {project.role && <> &middot; {project.role}</>}
          </p>

          {/* Description */}
          <p className='line-clamp-2 text-sm text-muted-foreground'>
            {project.description}
          </p>

          {/* Tech tags */}
          {project.techStack && project.techStack.length > 0 && (
            <div className='flex flex-wrap gap-1 pt-0.5'>
              {project.techStack.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className='rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary'
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 5 && (
                <span className='rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground'>
                  +{project.techStack.length - 5}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Chevron */}
        <FiChevronRight
          size={16}
          className='mt-1 shrink-0 text-muted-foreground transition-colors group-hover:text-primary'
        />
      </div>
    </DialogTrigger>
    <ProjectModal project={project} />
  </Dialog>
);

const ProjectsPage = () => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return (projectsData as Project[]).filter((p) => {
      const matchesFilter = activeFilter === 'All' || p.status === activeFilter;
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.techStack?.some((t) => t.toLowerCase().includes(q));
      return matchesFilter && matchesSearch;
    });
  }, [search, activeFilter]);

  return (
    <div className='min-h-screen'>
      <div className='mx-auto max-w-3xl px-6 pb-4 pt-8'>
        <h1 className='text-4xl font-extrabold tracking-tight'>Projects</h1>
        <p className='mt-2 text-muted-foreground'>
          {filtered.length} project{filtered.length !== 1 ? 's' : ''} across web
          dev, systems, hardware, and more.
        </p>

        {/* Filters & search */}
        <div className='mt-5 flex flex-wrap items-center gap-3'>
          <div className='flex flex-wrap gap-1.5'>
            {STATUS_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`rounded-full border px-3 py-1 text-sm font-medium transition-colors ${
                  activeFilter === f
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background text-muted-foreground hover:border-primary/50 hover:text-foreground'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <input
            type='search'
            placeholder='Search by name or tech…'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className='ml-auto h-8 w-full max-w-xs rounded-md border border-border bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 sm:w-56'
          />
        </div>
      </div>

      {/* List */}
      <div className='mx-auto max-w-3xl px-6 pb-8'>
        {filtered.length > 0 ? (
          <div className='divide-y divide-border'>
            {filtered.map((project, index) => (
              <ProjectRow key={project.title} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className='py-20 text-center text-muted-foreground'>
            No projects match your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
