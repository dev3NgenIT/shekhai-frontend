import Banner from "@/components/about-us/Banner";
import Content from "@/components/about-us/Content";
import Hero from "@/components/about-us/Hero";

export default function AboutPage() {
  return (
    <main className="container-width page-body">
      <Hero />

      <Banner />

      <Content />
    </main>
  );
}
