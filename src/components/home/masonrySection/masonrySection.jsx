import NormalCard from "./normalCard";
import SeparatedCard from "./separatedCard";

export default function MasonrySection({ data }) {
  
  // Extract categories from data
  const categories = data?.categories || data;
  
  if (!categories || !Array.isArray(categories) || categories.length === 0) {
    return (
      <section className="container-width mt-16 px-5 md:mt-[6.25rem] md:px-0">
        <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500">No categories available</p>
        </div>
      </section>
    );
  }

  // Split categories for two columns
  const leftColumnCategories = [];
  const rightColumnCategories = [];
  
  categories.forEach((category, index) => {
    if (index % 2 === 0) {
      leftColumnCategories.push(category);
    } else {
      rightColumnCategories.push(category);
    }
  });

  return (
    <section className="container-width mt-16 px-5 md:mt-[6.25rem] md:px-0">
      {/* Grid container */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          {leftColumnCategories.map((category, index) => (
            <SeparatedCard 
              key={category._id || `left-${index}`} 
              data={category}
              isReversed={index % 2 === 0} // Alternate direction in left column
            />
          ))}
        </div>
        
        {/* Right Column */}
        <div className="space-y-6">
          {rightColumnCategories.map((category, index) => (
            <SeparatedCard 
              key={category._id || `right-${index}`} 
              data={category}
              isReversed={index % 2 !== 0} // Alternate direction in right column
            />
          ))}
        </div>
      </div>
    </section>
  );
}