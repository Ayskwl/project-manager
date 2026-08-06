import Link from 'next/link';
import { Project } from '@/lib/types';
import ProjectStatusBadge from './ProjectStatusBadge';

export default function ProjectCard({ project }: { project: Project }) {
    return (
        <Link
            href={`/projects/${project.id}`}
            className="block border rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
        >
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg text-gray-900">{project.name}</h3>
                <ProjectStatusBadge status={project.status} />
            </div>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-1 mb-2">s
                {project.technologies.map((tech) => (
                    <span key={tech} className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                        {tech}
                    </span>
                ))}
            </div>
            <div className="text-xs text-gray-500 flex justify-between">
                <span>{project.author}</span>
                <span>{new Date(project.createdAt).toLocaleDateString('ru-RU')}</span>
            </div>
        </Link>
    );
}