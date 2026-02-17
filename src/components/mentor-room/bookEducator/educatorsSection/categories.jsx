import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

function Category({
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
  selectedCategories,
  handleToggleSelectedCategories,
}) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://shekhai-server.onrender.com/api/v1/categories');
        
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        
        const data = await response.json();
        
        if (data.success && data.categories) {
          // Extract just the category names from the response
          const categoryNames = data.categories.map(cat => cat.name);
          setCategories(categoryNames);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="col-span-full mb-8 flex max-h-36 flex-wrap gap-x-3.5 gap-y-2 overflow-hidden md:mb-16 md:max-h-32">
        <div className="rounded-full border border-base px-3 py-2 text-sm md:px-7 md:py-4">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-full mb-8 text-red-500 md:mb-16">
        Error loading categories: {error}
      </div>
    );
  }

  return (
    <div className="col-span-full mb-8 flex max-h-36 flex-wrap gap-x-3.5 gap-y-2 overflow-hidden md:mb-16 md:max-h-32">
      <Category
        category="all courses"
        selectedCategories={selectedCategories}
        handleToggleSelectedCategories={handleToggleSelectedCategories}
      />
      {categories.map((categoryName) => (
        <Category
          key={categoryName}
          category={categoryName}
          selectedCategories={selectedCategories}
          handleToggleSelectedCategories={handleToggleSelectedCategories}
        />
      ))}
    </div>
  );
}