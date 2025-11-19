import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

interface AuthCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export default function AuthCard({
  title,
  subtitle,
  icon,
  children,
}: AuthCardProps) {
  return (
    <section className="w-full max-w-md">
      <Card className="border border-slate-200/80 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center pb-1">
            {icon && (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                {icon}
              </div>
            )}
          </div>
          <CardTitle className="text-2xl font-semibold tracking-tight">
            {title}
          </CardTitle>
          {subtitle && (
            <CardDescription className="text-sm text-slate-500 dark:text-slate-400">
              {subtitle}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </section>
  );
}
