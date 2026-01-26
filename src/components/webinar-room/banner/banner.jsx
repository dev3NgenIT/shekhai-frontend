// components/webinar-room/banner/banner.jsx
"use client";

import { useState, useEffect } from "react";
import { LuChevronDown } from "react-icons/lu";
import Content from "./content";
import Form from "./form";

export default function Banner({ webinar }) {
  const [scrolled, setScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    // Trigger fade-in animation
    setIsLoaded(true);
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!webinar) return null;

  // Use the webinar banner image if available, otherwise use default
  const backgroundImage = webinar.bannerImage || "/assets/webinar-banner.png";

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight - 100,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-gray-900 to-black">
      {/* Animated Background with Particles */}
      <div className="absolute inset-0 z-0">
        {/* Main Background Image with Parallax Effect */}
        <div 
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.9)), url(${backgroundImage})`,
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        />
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
        
        {/* Particle Effect */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute h-[1px] w-[1px] bg-white opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 h-40 w-40 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-10 h-60 w-60 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Content Section with Animation */}
          <div 
            className={`transition-all duration-700 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
          >
            <Content webinar={webinar} />
          </div>

          {/* Form Section with Animation */}
          <div 
            className={`transition-all duration-700 delay-300 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
          >
            <Form webinar={webinar} />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          className={`mt-16 flex justify-center transition-all duration-500 ${scrolled ? 'opacity-0 translate-y-4' : 'opacity-100'}`}
          onClick={handleScrollDown}
        >
          <button className="group flex flex-col items-center text-white/60 hover:text-white transition-colors">
            <span className="mb-2 text-sm font-medium tracking-wider">LEARN MORE</span>
            <div className="animate-bounce">
              <LuChevronDown className="h-8 w-8 group-hover:scale-110 transition-transform" />
            </div>
          </button>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
    </section>
  );
}