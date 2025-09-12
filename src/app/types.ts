export interface Project {
  title: string;
  description: string;
  image?: string | null;
  imageDescription?: string | null;
  githubRepo?: string | null;
  youtubeUrl?: string | null;
  techStack?: string[];
  role?: string;
  achievements?: string[];
  status?: string;
  date: string;
  additionalNotes?: string;
}
