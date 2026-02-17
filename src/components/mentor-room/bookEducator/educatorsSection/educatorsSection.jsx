"use client";

import { useState, useEffect } from "react";
import BookingForm from "./bookingForm/bookingForm";
import Categories from "./categories";
import Educators from "./educators/educators";

export default function EducatorsSection() {
  const [categories, setCategories] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState({
    categories: true,
    instructors: true
  });
  const [error, setError] = useState({
    categories: null,
    instructors: null
  });

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://shekhai-server.onrender.com/api/v1/categories');
        
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        
        const data = await response.json();
        
        if (data.success && data.categories) {
          // Extract category names from the response
          const categoryNames = data.categories.map(cat => cat.name);
          setCategories(categoryNames);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        setError(prev => ({ ...prev, categories: err.message }));
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(prev => ({ ...prev, categories: false }));
      }
    };

    fetchCategories();
  }, []);

  // Fetch instructors
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await fetch('https://shekhai-server.onrender.com/api/v1/users/instructors/public');
        
        if (!response.ok) {
          throw new Error('Failed to fetch instructors');
        }
        
        const data = await response.json();
        
        if (data.success && data.instructors) {
          setInstructors(data.instructors);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        setError(prev => ({ ...prev, instructors: err.message }));
        console.error('Error fetching instructors:', err);
      } finally {
        setLoading(prev => ({ ...prev, instructors: false }));
      }
    };

    fetchInstructors();
  }, []);

  const handleToggleSelectedCategories = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Show loading state
  if (loading.categories || loading.instructors) {
    return (
      <section className="grid grid-cols-12 gap-x-6">
        <h3 className="col-span-full mb-4 text-section-heading text-black md:mb-8">
          Select Category
        </h3>
        <div className="col-span-full text-center py-8">
          Loading...
        </div>
      </section>
    );
  }

  // Show error state
  if (error.categories || error.instructors) {
    return (
      <section className="grid grid-cols-12 gap-x-6">
        <h3 className="col-span-full mb-4 text-section-heading text-black md:mb-8">
          Select Category
        </h3>
        <div className="col-span-full text-center py-8 text-red-500">
          {error.categories && <p>Error loading categories: {error.categories}</p>}
          {error.instructors && <p>Error loading instructors: {error.instructors}</p>}
        </div>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-12 gap-x-6">
      <h3 className="col-span-full mb-4 text-section-heading text-black md:mb-8">
        Select Category
      </h3>

      <Categories
        categories={categories}
        selectedCategories={selectedCategories}
        handleToggleSelectedCategories={handleToggleSelectedCategories}
      />

      <Educators instructors={instructors} />

      <BookingForm />
    </section>
  );
}