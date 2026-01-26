import { ActivityDashboard } from "@/components/community/ActivityDashboard/ActivityDashboard";
import BannerSection from "@/components/community/BannerSection/BannerSection";
import CommunityQnA from "@/components/community/CommunityQnA/CommunityQnA";
import QuestionForm from "@/components/community/QuestionForm/QuestionForm";

export default function CommunityPage() {
  return (
    <section className="page-body">
      <BannerSection />

      <QuestionForm />

      <CommunityQnA />

      <ActivityDashboard />
    </section>
  );
}
