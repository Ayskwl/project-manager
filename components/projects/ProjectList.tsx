import { Project } from '@/lib/types';
import ProjectCard from './ProjectCard';

export default function ProjectList({ projects }: { projects: Project[] }) {
    if (projects.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                Ничего не найдено. Попробуйте изменить фильтры.
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
}