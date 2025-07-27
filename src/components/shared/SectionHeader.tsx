import React from 'react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  emoji?: string;
  children?: React.ReactNode;
}

export const SectionHeader = ({ title, subtitle, emoji, children }: SectionHeaderProps) => (
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-border">
    <div className="space-y-2">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground flex items-center gap-2">
        {emoji && <span>{emoji}</span>}
        {title}
      </h1>
      {subtitle && (
        <p className="text-base md:text-lg text-muted-foreground font-medium">
          {subtitle}
        </p>
      )}
    </div>
    {children}
  </div>
);