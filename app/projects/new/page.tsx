import Link from 'next/link';
import ProjectForm from '@/components/projects/ProjectForm';

export default function NewProjectPage() {
    return (
        <div className="max-w-2xl mx-auto p-4 sm:p-8">
            <Link href="/projects" className="text-blue-600 hover:underline text-sm mb-6 inline-block">
                ← Назад к списку
            </Link>

            <h1 className="text-2xl font-bold mb-6 text-white">Новый проект</h1>

            <ProjectForm />
        </div>
    );
}