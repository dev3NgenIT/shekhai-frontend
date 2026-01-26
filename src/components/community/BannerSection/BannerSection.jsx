import Banner from "./Banner";
import BannerFooter from "./BannerFooter";

export default function BannerSection() {
  return (
    <section className={`h-[550px] w-full`}>
      <Banner />
      <BannerFooter />
    </section>
  );
}
