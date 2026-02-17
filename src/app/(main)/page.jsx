import Hero from "@/components/home/HomePage/Hero";
import MasonrySection from "@/components/home/masonrySection/masonrySection";  
import MentorCTA from "@/components/home/mentorCTA/mentorCTA";
import MentorSliderOne from "@/components/home/mentorSliderOne/mentorSliderOne";
import MentorSliderTwo from "@/components/home/mentorSliderTwo/mentorSliderTwo";
import OnDemandSkillsPromo from "@/components/home/OnDemandSkillsPromo";
import PopularProducts from "@/components/home/popularProducts/popularProducts";
import SkillCTAOne from "@/components/home/skillCTAOne/skillCTAOne";
import SkillCTATwo from "@/components/home/skillCTATwo/skillCTATwo";
import Stats from "@/components/home/stats/stats";
import Studybit from "@/components/home/studybit/studybit";
import VideoSection from "@/components/home/videoSection/videoSection";
import WhySekhai from "@/components/home/whySekhai/whySekhai";
import axios from "axios";

export const metadata = {
  title: "Shekhai || Online Learning in Bangladesh",
  description:
    "Join Shekhai to access online courses, tutorials, and educational content. Learn anytime, anywhere in Bangladesh.",
  keywords: [
    "Shekhai",
    "Online Learning",
    "Bangladesh",
    "Education",
    "Courses",
    "Tutorials",
    "E-learning",
    "Skill Development",
  ],
  metadataBase: new URL("https://shekhai.ngengroup.org/"),
  openGraph: {
    title: "Shekhai || Online Learning in Bangladesh",
    description:
      "Explore online courses and tutorials at Shekhai. Learn new skills and grow your knowledge from anywhere in Bangladesh.",
    url: "https://shekhai.ngengroup.org/",
    siteName: "Shekhai",
    type: "website",
    images: [
      {
        url: "/opengraph-image.jpg",
        alt: "Shekhai || Online Learning in Bangladesh",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shekhai || Learn Online in Bangladesh",
    description:
      "Access online courses, tutorials, and educational content on Shekhai. Learn new skills with ease!",
    images: ["/opengraph-image.jpg"],
  },
};

async function getHomepageData() {
  try {
    const response = await axios.get(
      "https://shekhai-server.onrender.com/api/v1/homepage",
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return {
      success: false,
      message: "Failed to fetch data",
      data: null,
    };
  }
}

export default async function Home() {
  const homepageData = await getHomepageData();

  // Extract data based on your API response structure
  const heroData = homepageData?.data?.hero || {};
  const featuredCategories = homepageData?.data?.featured_categories || {};
  const cookingSection = homepageData?.data?.cooking_section || {};
  const agricultureSection = homepageData?.data?.agriculture_section || {};
  const expertsSection = homepageData?.data?.experts_section || {};
  const hobbySection = homepageData?.data?.hobby_section || {};
  const projectSection = homepageData?.data?.project_section || {};
  const shareSkillCta = homepageData?.data?.share_skill_cta || {};
  const whyChooseUsData = homepageData?.data?.why_choose_us || {};
  const statsData = homepageData?.data?.statistics || {};
  const startLearning = homepageData?.data?.start_learning || {};
  const testimonialsData = homepageData?.data?.testimonials || {};
  const popularProductsData = homepageData?.data?.popular_products || {};

  // You can pass data to other components similarly
  // For example:
  // const featuredCategories = homepageData?.data?.featured_categories || {};
  // const cookingSection = homepageData?.data?.cooking_section || {};
  // etc. "why_choose_us"
  return (
    <>
      <Hero data={heroData} />
      <MasonrySection data={featuredCategories} />
      <OnDemandSkillsPromo data={startLearning} />
      <MentorSliderOne data={cookingSection} />
      <SkillCTAOne data={agricultureSection} />
      <MentorSliderTwo  />
      <SkillCTATwo data={hobbySection} />
      <Studybit data={projectSection} />
      <PopularProducts data={popularProductsData} />
      <MentorCTA data={shareSkillCta} />
      <VideoSection />
      <WhySekhai data={whyChooseUsData} />
      <Stats data={statsData} />
      {/* <Testimonials data={testimonialsData} /> */}
    </>
  );
}
