export interface StrapiErrorsProps {
  message: string | null;
  name: string;
  status: string | null;
}

interface StrapiErrorsComponentProps {
  readonly error: string | null;
}

export function StrapiErrors({ error }: StrapiErrorsComponentProps) {
  if (!error) return null;
  return (
    <div className="text-red-500 text-sm flex w-full h-full justify-center italic py-2">
      {error}
    </div>
  );
}
