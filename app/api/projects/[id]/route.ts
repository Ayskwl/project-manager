import { NextRequest, NextResponse } from 'next/server';
import { projects } from '@/lib/data';

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const project = projects.find((p) => p.id === params.id);

    if (!project) {
        return NextResponse.json(
            { data: null, error: 'Проект не найден' },
            { status: 404 }
        );
    }

    return NextResponse.json({ data: project, error: null });
}