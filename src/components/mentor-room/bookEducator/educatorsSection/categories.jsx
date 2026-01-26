import { cn } from "@/lib/utils";

export function Category({
  category,
  selectedCategories,
  handleToggleSelectedCategories,
}) {
  return (
    <button
      className={cn(
        "cursor-pointer rounded-full border border-base px-3 py-2 text-sm capitalize md:px-7 md:py-4",
        selectedCategories.includes(category)
          ? "bg-base text-white"
          : "bg-transparent text-base",
      )}
      onClick={() => handleToggleSelectedCategories(category)}
    >
      {category}
    </button>
  );
}

export default function Categories({
  categories,
  selectedCategories,
  handleToggleSelectedCategories,
}) {
  return (
    <div className="col-span-full mb-8 flex max-h-36 flex-wrap gap-x-3.5 gap-y-2 overflow-hidden md:mb-16 md:max-h-32">
      <Category
        category="all courses"
        selectedCategories={selectedCategories}
      />
      {categories.map((category) => (
        <Category
          key={category}
          category={category}
          selectedCategories={selectedCategories}
          handleToggleSelectedCategories={handleToggleSelectedCategories}
        />
      ))}
    </div>
  );
}
