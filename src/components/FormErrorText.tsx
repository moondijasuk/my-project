interface FormErrorTextProps {
  message?: string;
}

export default function FormErrorText({ message }: FormErrorTextProps) {
  if (!message) return null;
  return (
    <div className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-600 ring-1 ring-red-100 dark:bg-red-900/30 dark:text-red-300 dark:ring-red-900/50">
      {message}
    </div>
  );
}
