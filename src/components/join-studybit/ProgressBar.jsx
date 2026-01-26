export default function ProgressBar({ percentage }) {
  return (
    <div className="mb-12 w-full">
      <div className="flex items-center justify-between">
        <div className="mr-4 h-[14px] flex-1 bg-muted">
          <div
            className="h-[14px] bg-base transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm font-medium text-foreground">
          {percentage}%
        </span>
      </div>
    </div>
  );
}
