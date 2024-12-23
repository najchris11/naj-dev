export interface Project {
  title: string;
  description: string;
  techStack: string[];
  achievements: string[];
  githubRepo?: string | null;
  role: string;
  status: string;
  date: string;
  additionalNotes: string;
  image?: string;
  imageDescription?: string;
  youtubeUrl?: string;
}