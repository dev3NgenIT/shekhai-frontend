export default function Quality({ children, className }) {
  return (
    <div className={`flex flex-col items-center ${className}`}>{children}</div>
  );
}
