import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/lib/data';
import ProjectStatusBadge from '@/components/projects/ProjectStatusBadge';

export default async function ProjectPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;
    const project = projects.find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    return (
        <div className="max-w-3xl mx-auto p-4 sm:p-8">
            <Link href="/projects" className="text-blue-600 hover:underline text-sm mb-6 inline-block">
                ← Назад к списку
            </Link>

            <div className="border rounded-lg p-6 bg-white">
                <div className="flex justify-between items-start mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
                    <ProjectStatusBadge status={project.status} />
                </div>

                <p className="text-gray-700 mb-6">{project.description}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm">
                    <div>
                        <span className="text-gray-500">Автор:</span>{' '}
                        <span className="text-gray-900 font-medium">{project.author}</span>
                    </div>
                    <div>
                        <span className="text-gray-500">Дата создания:</span>{' '}
                        <span className="text-gray-900 font-medium">
                            {new Date(project.createdAt).toLocaleDateString('ru-RU')}
                        </span>
                    </div>
                </div>

                <div>
                    <span className="text-gray-500 text-sm block mb-2">Технологии:</span>
                    <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                            <span key={tech} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}