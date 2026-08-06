'use client';

import { ProjectStatus } from '@/lib/types';

interface ProjectFiltersProps {
    search: string;
    onSearchChange: (value: string) => void;
    status: ProjectStatus | 'all';
    onStatusChange: (value: ProjectStatus | 'all') => void;
    sortOrder: 'newest' | 'oldest';
    onSortOrderChange: (value: 'newest' | 'oldest') => void;
}

export default function ProjectFilters({
    search,
    onSearchChange,
    status,
    onStatusChange,
    sortOrder,
    onSortOrderChange,
}: ProjectFiltersProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
                type="text"
                placeholder="Поиск по названию..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                className="border rounded-md px-3 py-2 text-sm flex-1 bg-white text-gray-900"
            />

            <select
                value={status}
                onChange={(e) => onStatusChange(e.target.value as ProjectStatus | 'all')}
                className="border rounded-md px-3 py-2 text-sm bg-white text-gray-900"
            >
                <option value="all">Все статусы</option>
                <option value="planned">Запланирован</option>
                <option value="in_progress">В работе</option>
                <option value="completed">Завершён</option>
            </select>

            <select
                value={sortOrder}
                onChange={(e) => onSortOrderChange(e.target.value as 'newest' | 'oldest')}
                className="border rounded-md px-3 py-2 text-sm bg-white text-gray-900"
            >
                <option value="newest">Сначала новые</option>
                <option value="oldest">Сначала старые</option>
            </select>
        </div>
    );
}