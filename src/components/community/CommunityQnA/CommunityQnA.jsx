"use client";

import { useState } from "react";
import QnATabs from "./QnATabs";
import QnAs from "./QnAs";

export default function CommunityQnA() {
  const [ActiveCategory, setActiveCategory] = useState("General Discussion");

  return (
    <section className="container-width mt-16 md:mt-32">
      <QnATabs
        activeCategory={ActiveCategory}
        setActiveCategory={setActiveCategory}
      />

      <QnAs />
    </section>
  );
}
