'use client';

import { useEffect, useState, useCallback, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Project, ProjectStatus } from '@/lib/types';
import ProjectList from '@/components/projects/ProjectList';
import ProjectFilters from '@/components/projects/ProjectFilters';

function ProjectsPageInner() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [projects, setProjects] = useState<Project[]>([]);
    const [loadState, setLoadState] = useState<'loading' | 'error' | 'success'>('loading');

    const search = searchParams.get('search') ?? '';
    const status = (searchParams.get('status') as ProjectStatus | 'all') ?? 'all';
    const sortOrder = (searchParams.get('sort') as 'newest' | 'oldest') ?? 'newest';

    useEffect(() => {
        fetch('/api/projects')
            .then((res) => res.json())
            .then((json) => {
                if (json.error) {
                    setLoadState('error');
                } else {
                    setProjects(json.data);
                    setLoadState('success');
                }
            })
            .catch(() => setLoadState('error'));
    }, []);

    const updateParam = useCallback(
        (key: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            if (value && value !== 'all' && value !== 'newest') {
                params.set(key, value);
            } else {
                params.delete(key);
            }
            router.push(`/projects?${params.toString()}`);
        },
        [router, searchParams]
    );

    const filteredProjects = useMemo(() => {
        let result = [...projects];

        if (search) {
            result = result.filter((p) =>
                p.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (status !== 'all') {
            result = result.filter((p) => p.status === status);
        }

        result.sort((a, b) => {
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });

        return result;
    }, [projects, search, status, sortOrder]);

    if (loadState === 'loading') {
        return <div className="p-8 text-center text-gray-400">Загрузка...</div>;
    }

    if (loadState === 'error') {
        return <div className="p-8 text-center text-red-400">Ошибка загрузки проектов</div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-4 sm:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Проекты</h1>
                <Link
                    href="/projects/new"
                    className="bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    + Добавить проект
                </Link>
            </div>

            <ProjectFilters
                search={search}
                onSearchChange={(value) => updateParam('search', value)}
                status={status}
                onStatusChange={(value) => updateParam('status', value)}
                sortOrder={sortOrder}
                onSortOrderChange={(value) => updateParam('sort', value)}
            />

            <ProjectList projects={filteredProjects} />
        </div>
    );
}

export default function ProjectsPage() {
    return (
        <Suspense fallback={<div className="p-8 text-center text-gray-400">Загрузка...</div>}>
            <ProjectsPageInner />
        </Suspense>
    );
}