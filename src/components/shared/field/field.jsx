export default function Field({ children, className, error }) {
  return (
    <div className={className}>
      {children}

      {error && <p className="mt-1 text-xs text-red-500">{error?.message}</p>}
    </div>
  );
}
