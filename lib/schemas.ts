import { z } from 'zod';

export const projectFormSchema = z.object({
    name: z.string().min(1, 'Название обязательно').max(100, 'Слишком длинное название'),
    description: z.string().min(1, 'Описание обязательно').max(500, 'Слишком длинное описание'),
    status: z.enum(['planned', 'in_progress', 'completed'], {
        message: 'Выберите статус',
    }),
    author: z.string().min(1, 'Укажите автора'),
    technologies: z.string().min(1, 'Укажите хотя бы одну технологию'),
});

export type ProjectFormData = z.infer<typeof projectFormSchema>;