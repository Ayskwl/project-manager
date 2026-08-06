import Link from 'next/link';

export default function ProjectNotFound() {
    return (
        <div className="max-w-3xl mx-auto p-4 sm:p-8">
            <div className="border rounded-lg p-8 bg-white text-center">
                <h1 className="text-xl font-semibold mb-2 text-gray-900">Проект не найден</h1>
                <p className="text-gray-600 mb-6">
                    Проект с таким идентификатором не существует или был удалён.
                </p>
                <Link href="/projects" className="text-blue-600 hover:underline">
                    ← Вернуться к списку проектов
                </Link>
            </div>
        </div>
    );
}