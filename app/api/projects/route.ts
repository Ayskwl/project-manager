import { NextRequest, NextResponse } from 'next/server';
import { projects } from '@/lib/data';
import { projectFormSchema } from '@/lib/schemas';
import { randomUUID } from 'crypto';

export async function GET() {
    return NextResponse.json({ data: projects, error: null });
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    const parsed = projectFormSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json(
            { data: null, error: 'Ошибка валидации данных' },
            { status: 400 }
        );
    }

    const newProject = {
        id: randomUUID(),
        name: parsed.data.name,
        description: parsed.data.description,
        status: parsed.data.status,
        author: parsed.data.author,
        technologies: parsed.data.technologies.split(',').map((t) => t.trim()),
        createdAt: new Date().toISOString(),
    };

    projects.unshift(newProject);

    return NextResponse.json({ data: newProject, error: null }, { status: 201 });
}