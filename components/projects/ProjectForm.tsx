'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { projectFormSchema, ProjectFormData } from '@/lib/schemas';
import FormField from '@/components/ui/FormField';

export default function ProjectForm() {
    const router = useRouter();
    const [submitError, setSubmitError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ProjectFormData>({
        resolver: zodResolver(projectFormSchema),
        defaultValues: {
            status: 'planned',
        },
    });

    const onSubmit = async (data: ProjectFormData) => {
        setSubmitError(null);

        try {
            const res = await fetch('/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const json = await res.json();

            if (!res.ok || json.error) {
                setSubmitError(json.error ?? 'Не удалось сохранить проект');
                return;
            }

            router.push('/projects');
            router.refresh();
        } catch {
            setSubmitError('Ошибка сети. Попробуйте ещё раз.');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="border rounded-lg p-6 bg-white">
            <FormField label="Название" htmlFor="name" error={errors.name?.message}>
                <input
                    id="name"
                    {...register('name')}
                    className="w-full border rounded-md px-3 py-2 text-sm text-gray-900"
                />
            </FormField>

            <FormField label="Описание" htmlFor="description" error={errors.description?.message}>
                <textarea
                    id="description"
                    {...register('description')}
                    rows={4}
                    className="w-full border rounded-md px-3 py-2 text-sm text-gray-900"
                />
            </FormField>

            <FormField label="Статус" htmlFor="status" error={errors.status?.message}>
                <select
                    id="status"
                    {...register('status')}
                    className="w-full border rounded-md px-3 py-2 text-sm text-gray-900"
                >
                    <option value="planned">Запланирован</option>
                    <option value="in_progress">В работе</option>
                    <option value="completed">Завершён</option>
                </select>
            </FormField>

            <FormField label="Автор" htmlFor="author" error={errors.author?.message}>
                <input
                    id="author"
                    {...register('author')}
                    className="w-full border rounded-md px-3 py-2 text-sm text-gray-900"
                />
            </FormField>

            <FormField
                label="Технологии (через запятую)"
                htmlFor="technologies"
                error={errors.technologies?.message}
            >
                <input
                    id="technologies"
                    {...register('technologies')}
                    placeholder="React, Next.js, TypeScript"
                    className="w-full border rounded-md px-3 py-2 text-sm text-gray-900"
                />
            </FormField>

            {submitError && (
                <p className="text-red-600 text-sm mb-4">{submitError}</p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white rounded-md py-2 text-sm font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
                {isSubmitting ? 'Сохранение...' : 'Добавить проект'}
            </button>
        </form>
    );
}