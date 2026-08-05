import { ReactNode } from 'react';

interface FormFieldProps {
    label: string;
    htmlFor: string;
    error?: string;
    children: ReactNode;
}

export default function FormField({ label, htmlFor, error, children }: FormFieldProps) {
    return (
        <div className="mb-4">
            <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            {children}
            {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
        </div>
    );
}