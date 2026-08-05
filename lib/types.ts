export type ProjectStatus = 'planned' | 'in_progress' | 'completed';

export interface Project {
    id: string;
    name: string;
    description: string;
    status: ProjectStatus;
    createdAt: string;
    author: string;
    technologies: string[];
}

export interface ApiResponse<T> {
    data: T | null;
    error: string | null;
}