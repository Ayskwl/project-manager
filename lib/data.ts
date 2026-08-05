import { Project } from './types';

export const projects: Project[] = [
    {
        id: '1',
        name: 'CRM для отдела продаж',
        description: 'Внутренняя система учёта клиентов и сделок',
        status: 'in_progress',
        createdAt: '2026-07-20T10:00:00.000Z',
        author: 'Анна Смирнова',
        technologies: ['React', 'Next.js', 'PostgreSQL'],
    },
    {
        id: '2',
        name: 'Лендинг для стартапа',
        description: 'Одностраничный сайт с формой обратной связи',
        status: 'completed',
        createdAt: '2026-06-15T10:00:00.000Z',
        author: 'Игорь Петров',
        technologies: ['HTML', 'Tailwind CSS'],
    },
    {
        id: '3',
        name: 'Мобильное приложение доставки',
        description: 'Приложение для заказа еды с трекингом курьера',
        status: 'planned',
        createdAt: '2026-08-01T10:00:00.000Z',
        author: 'Мария Кузнецова',
        technologies: ['React Native', 'TypeScript'],
    },
];