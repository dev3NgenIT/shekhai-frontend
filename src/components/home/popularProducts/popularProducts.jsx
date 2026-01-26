import CategoryCard from "./categoryCard";
import Header from "./header";

export default function PopularProducts({ data }) {  // 

  // Extract products from data
  // First check if data is directly the products array
  let products = [];
  let headerData = {
    title: "Popular Products",
    description: "Discover our most popular learning products",
    viewAllLink: "/products"
  };

  if (Array.isArray(data)) {
    // If data is directly an array of products
    products = data;
  } else if (data && typeof data === 'object') {
    // If data is an object with products property
    products = data.products || data.items || data.popular_products || [];
    headerData = {
      title: data.title || data.header?.title || "Popular Products",
      description: data.description || data.header?.description || "Discover our most popular learning products",
      viewAllLink: data.view_all_link || data.header?.viewAllLink || "/products"
    };
  }

  // If no products available, show empty state
  if (!products || products.length === 0) {
    return (
      <section className="container-width mt-16 px-3 md:mt-[6.25rem]">
        <Header data={headerData} />
        <div className="mt-6 md:mt-[5.125rem] flex h-64 items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500">No popular products available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="container-width mt-16 px-3 md:mt-[6.25rem]">
      <Header data={headerData} />

      <div className="mt-6 md:mt-[5.125rem] grid grid-cols-2 gap-2.5 md:grid-cols-4 md:gap-6">
        {products.map((product, index) => (
          <CategoryCard
            key={product._id || product.id || `product-${index}`}
            data={product}
          />
        ))}
      </div>
    </section>
  );
}