import React, { ReactNode } from 'react'
import { Button } from './button';
// import { Button } from './ui/button'

type Variant = 'sm' | 'md' | 'lg'

export default function ThemeBtn({ text, className, variant = 'md' }: { text: ReactNode; className?: string; variant?: Variant }) {
    const variantValues: Record<Variant, string> = {
        lg: 'text-xl p-6',
        md: 'text-base p-5',
        sm: 'text-sm p-5',
    };
    return (
        <Button className={`text-xl p-6 bg-gradient-to-r from-orange-400 to-orange-600 text-white ${variantValues[variant]} ${className}`}>
            {text}
        </Button>
    )
}
