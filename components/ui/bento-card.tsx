import React from 'react';
import { cn } from '@/lib/utils';

export interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export function BentoCard({
  children,
  className,
  glow = false,
  ...props
}: BentoCardProps) {
  return (
    <div
      className={cn(
        'glass-card rounded-2xl border border-cyber-border p-6 relative overflow-hidden bg-cyber-card/90 backdrop-blur-xl',
        glow && 'hover:border-cyber-accent/40 hover:shadow-glass-card-hover transition-all duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default BentoCard;
