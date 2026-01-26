"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import debounce from "lodash/debounce"; // Install: npm install lodash

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectCard from "../shared/projectCard/ProjectCard";
import Header from "./Header";

export default function Component() {
  const scrollAreaRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [coursesByCategory, setCoursesByCategory] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState({});
  const [isSearching, setIsSearching] = useState(false);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://shekhai-server.onrender.com/api/v1/categories",
        );

        if (response.data.success && response.data.categories.length > 0) {
          setCategories(response.data.categories);
          const firstCategoryId = response.data.categories[0]._id;
          setSelectedCategory(firstCategoryId);

          // Fetch courses for the first category
          fetchCoursesForCategory(firstCategoryId);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch courses for a specific category
  const fetchCoursesForCategory = async (categoryId) => {
    if (coursesByCategory[categoryId]) return; // Already fetched

    try {
      const response = await axios.get(
        `https://shekhai-server.onrender.com/api/v1/categories/${categoryId}/courses`,
      );

      if (response.data.success) {
        const courses = response.data.courses || [];
        setCoursesByCategory((prev) => ({
          ...prev,
          [categoryId]: courses,
        }));
        // Initialize filtered courses with all courses
        setFilteredCourses((prev) => ({
          ...prev,
          [categoryId]: courses,
        }));
      }
    } catch (error) {
      console.error(
        `Error fetching courses for category ${categoryId}:`,
        error,
      );
      setCoursesByCategory((prev) => ({
        ...prev,
        [categoryId]: [],
      }));
      setFilteredCourses((prev) => ({
        ...prev,
        [categoryId]: [],
      }));
    }
  };

  // Fetch courses when tab changes
  useEffect(() => {
    if (selectedCategory && !coursesByCategory[selectedCategory]) {
      fetchCoursesForCategory(selectedCategory);
    }
  }, [selectedCategory]);

  // Debounced search function
  const performSearch = useCallback(
    debounce((query) => {
      setIsSearching(true);
      
      if (!query.trim()) {
        // If search query is empty, show all courses
        setFilteredCourses(coursesByCategory);
        setIsSearching(false);
        return;
      }

      const searchLower = query.toLowerCase();
      const newFilteredCourses = {};

      // Filter courses for each category
      Object.keys(coursesByCategory).forEach((categoryId) => {
        const courses = coursesByCategory[categoryId];
        if (courses && courses.length > 0) {
          newFilteredCourses[categoryId] = courses.filter((course) => {
            // Search in multiple fields
            return (
              course.title?.toLowerCase().includes(searchLower) ||
              course.description?.toLowerCase().includes(searchLower) ||
              course.instructor?.name?.toLowerCase().includes(searchLower) ||
              course.tags?.some((tag) =>
                tag.toLowerCase().includes(searchLower),
              ) ||
              course.category?.name?.toLowerCase().includes(searchLower)
            );
          });
        } else {
          newFilteredCourses[categoryId] = [];
        }
      });

      setFilteredCourses(newFilteredCourses);
      setIsSearching(false);
    }, 500), // 500ms debounce delay
    [coursesByCategory]
  );

  // Trigger search when searchQuery changes
  useEffect(() => {
    performSearch(searchQuery);
    
    // Cleanup
    return () => {
      performSearch.cancel();
    };
  }, [searchQuery, performSearch]);

  const checkScrollPosition = () => {
    const scrollArea = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]",
    );
    if (scrollArea) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollArea;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const scrollArea = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]",
    );
    if (scrollArea) {
      scrollArea.addEventListener("scroll", checkScrollPosition);
      return () =>
        scrollArea.removeEventListener("scroll", checkScrollPosition);
    }
  }, [categories]);

  const scrollLeft = () => {
    const scrollArea = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]",
    );
    if (scrollArea) {
      scrollArea.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const scrollArea = scrollAreaRef.current?.querySelector(
      "[data-radix-scroll-area-viewport]",
    );
    if (scrollArea) {
      scrollArea.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  if (isLoading && categories.length === 0) {
    return (
      <div className="flex h-64 w-full items-center justify-center px-6 md:mt-10">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (categories.length === 0 && !isLoading) {
    return (
      <div className="w-full px-6 py-20 text-center md:mt-10">
        <p className="text-muted-foreground">No categories found</p>
      </div>
    );
  }

  return (
    <>
      <Header 
        searchQuery={searchQuery} 
        onSearchChange={handleSearch} 
        isSearching={isSearching}
      />
      <Tabs
        defaultValue={categories[0]?._id}
        value={selectedCategory}
        onValueChange={(categoryId) => {
          setSelectedCategory(categoryId);
          // Fetch courses for this category if not already fetched
          if (!coursesByCategory[categoryId]) {
            fetchCoursesForCategory(categoryId);
          }
        }}
        className="w-full px-6 md:mt-10"
      >
        <div className="relative">
          <ScrollArea ref={scrollAreaRef}>
            <TabsList className="-gap-1 mb-3 h-auto rounded-none bg-transparent px-0 py-1 text-foreground md:gap-2">
              {categories.map((category) => (
                <TabsTrigger
                  value={category._id}
                  key={category._id}
                  className="relative cursor-pointer after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-accent hover:text-foreground data-[state=active]:border-b-0 data-[state=active]:bg-transparent data-[state=active]:text-base data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent md:!text-card-title"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </ScrollArea>

          {canScrollLeft && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-1/2 -left-5 size-6 -translate-y-1/2 border-0 bg-base p-0 text-white shadow-none backdrop-blur-sm md:-left-12 md:size-8"
              onClick={scrollLeft}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </Button>
          )}

          {canScrollRight && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-1/2 -right-5 size-6 -translate-y-1/2 border-0 bg-base p-0 text-white shadow-none backdrop-blur-sm md:-right-12 md:size-8"
              onClick={scrollRight}
              aria-label="Scroll right"
            >
              <ChevronRight size={16} />
            </Button>
          )}
        </div>

        {/* Tab Content for each category */}
        {categories.map((category) => (
          <TabsContent key={category._id} value={category._id} className="mt-4">
            {/* Search Results Info */}
            {searchQuery && (
              <div className="mb-6 px-3 md:px-0">
                <p className="text-lg font-medium">
                  {isSearching ? (
                    "Searching..."
                  ) : (
                    <>
                      {filteredCourses[category._id]?.length || 0} course(s) found for "{searchQuery}" in {category.name}
                    </>
                  )}
                </p>
                {!isSearching && searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery("")}
                    className="mt-2 text-blue-600 hover:text-blue-700"
                  >
                    Clear search
                  </Button>
                )}
              </div>
            )}

            <section className="grid grid-cols-1 gap-x-6 gap-y-10 px-3 md:grid-cols-2 md:px-0 lg:grid-cols-3">
              {/* Render filtered courses */}
              {filteredCourses[category._id]?.map((course) => (
                <ProjectCard
                  key={course._id}
                  course={course}
                  categoryName={category.name}
                  searchQuery={searchQuery} // Pass search query for highlighting
                />
              ))}

              {/* Loading state */}
              {(!filteredCourses[category._id] || isSearching) && (
                <div className="col-span-full flex h-64 items-center justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                </div>
              )}

              {/* Empty state - No courses */}
              {!filteredCourses[category._id]?.length && 
               !isSearching && 
               !coursesByCategory[category._id] && (
                <div className="col-span-full flex h-64 items-center justify-center">
                  <p className="text-muted-foreground">
                    No courses found in {category.name}
                  </p>
                </div>
              )}

              {/* Empty state - No search results */}
              {!filteredCourses[category._id]?.length && 
               !isSearching && 
               coursesByCategory[category._id]?.length > 0 && 
               searchQuery && (
                <div className="col-span-full flex h-64 flex-col items-center justify-center">
                  <p className="text-lg font-medium text-muted-foreground">
                    No courses found for "{searchQuery}"
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setSearchQuery("")}
                    className="mt-4"
                  >
                    View all courses in {category.name}
                  </Button>
                </div>
              )}

              {/* Empty state - No courses in category */}
              {!filteredCourses[category._id]?.length && 
               !isSearching && 
               coursesByCategory[category._id]?.length === 0 && 
               !searchQuery && (
                <div className="col-span-full flex h-64 items-center justify-center">
                  <p className="text-muted-foreground">
                    No courses found in {category.name}
                  </p>
                </div>
              )}
            </section>
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}