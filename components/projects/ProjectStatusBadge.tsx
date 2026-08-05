import { ProjectStatus } from '@/lib/types';

const statusConfig: Record<ProjectStatus, { label: string; className: string }> = {
    planned: { label: 'Запланирован', className: 'bg-gray-100 text-gray-700' },
    in_progress: { label: 'В работе', className: 'bg-blue-100 text-blue-700' },
    completed: { label: 'Завершён', className: 'bg-green-100 text-green-700' },
};

export default function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
    const config = statusConfig[status];
    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.className}`}>
            {config.label}
        </span>
    );
}