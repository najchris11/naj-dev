export interface Project {
  title: string;
  description: string;
  image?: string | null;
  imageDescription?: string | null;
  youtubeUrl?: string | null;
  techStack: string[];
  achievements: string[];
  date: string;
  status: string;
  additionalNotes: string;
  githubRepo?: string | null;
  role?: string;
}
