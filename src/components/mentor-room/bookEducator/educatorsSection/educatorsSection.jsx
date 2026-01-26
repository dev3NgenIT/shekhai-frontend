"use client";

import { useState } from "react";
import BookingForm from "./bookingForm/bookingForm";
import Categories from "./categories";
import Educators from "./educators/educators";

export default function EducatorsSection() {
  const categories = [
    "react",
    "next js",
    "node js",
    "react native",
    "flutter",
    "vue",
    "angular",
    "python",
    "robotics",
    "machine learning",
    "data science",
    "web development",
    "mobile development",
    "ui/ux",
  ];

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleToggleSelectedCategories = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

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

      <Educators />

      <BookingForm />
    </section>
  );
}
