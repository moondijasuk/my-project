import React from 'react';
import { Button } from '@/components/ui/button';

interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

export default function PrimaryButton({
  children,
  loading,
  disabled,
  className,
  ...props
}: PrimaryButtonProps) {
  return (
    <Button
      {...props}
      disabled={loading || disabled}
      className={`inline-flex w-full items-center justify-center gap-2 ${
        className ?? ''
      }`}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-50 border-t-transparent dark:border-slate-900 dark:border-t-transparent" />
      )}
      <span>{children}</span>
    </Button>
  );
}
