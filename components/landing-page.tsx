"use client";

import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaRobot, FaLeaf, FaCloudSun, FaTint } from "react-icons/fa";
import { useRef, useEffect } from "react";

// Global mouse gradient effect
// Global mouse gradient effect - Modified MouseGradient component
const MouseGradient = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const gradient = useTransform(
    [x, y],
    ([x, y]) => `radial-gradient(800px at ${x}px ${y}px, rgb(110, 231, 183), transparent 65%)`
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <motion.div
      style={{
        position: "fixed",
        inset: 0,
        background: gradient,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};

const GradientCard = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [0, 400], [5, -5]);
  const rotateY = useTransform(x, [0, 400], [-5, 5]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
          x.set(e.clientX - rect.left);
          y.set(e.clientY - rect.top);
        }
      }}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      className="hover:shadow-2xl transition-shadow duration-300"
    >
      {children}
    </motion.div>
  );
};

export function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  const images = {
    yieldImprovement: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80",
    waterConservation: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80",
    sustainableFarming: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80",
    farmer1: "https://media.istockphoto.com/id/1092520698/photo/indian-farmer-at-onion-field.jpg?s=612x612&w=0&k=20&c=gvu-DzA17EyVSNzvdf7L3R8q0iIvLapG15ktOimqXqU=",
    farmer2: "https://media.istockphoto.com/id/1092520698/photo/indian-farmer-at-onion-field.jpg?s=612x612&w=0&k=20&c=gvu-DzA17EyVSNzvdf7L3R8q0iIvLapG15ktOimqXqU=",
    farmer3: "https://media.istockphoto.com/id/1092520698/photo/indian-farmer-at-onion-field.jpg?s=612x612&w=0&k=20&c=gvu-DzA17EyVSNzvdf7L3R8q0iIvLapG15ktOimqXqU=",
  
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white text-gray-900 relative overflow-hidden">
      <MouseGradient />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
            <span className="block">AI-Powered</span>
            Precision Farming Platform
          </h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8"
          >
            Transform your farming with intelligent insights, real-time monitoring, and AI-driven recommendations.
          </motion.p>

          <div className="flex justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button 
                onClick={onGetStarted} 
                className="relative bg-green-600 hover:bg-green-700 text-white shadow-xl"
                size="lg"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-transparent animate-pulse" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Button 
                variant="outline" 
                className="border-2 border-green-600 text-green-600 hover:bg-green-50 shadow-xl"
                size="lg"
              >
                Watch Demo
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
            Intelligent Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: "AI Insights", icon: <FaRobot className="w-8 h-8" /> },
              { title: "Crop Health", icon: <FaLeaf className="w-8 h-8" /> },
              { title: "Weather Analysis", icon: <FaCloudSun className="w-8 h-8" /> },
              { title: "Smart Injection", icon: <FaTint className="w-8 h-8" /> },
            ].map((feature, index) => (
              <GradientCard key={index}>
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-green-100 hover:border-green-200 transition-all h-full">
                  <div className="text-green-600 mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800">{feature.title}</h3>
                </div>
              </GradientCard>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Success Stories */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
            Success Stories
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Yield Improvement",
                stat: "35% Increase",
                desc: "AI-driven crop management for large-scale farms",
                image: images.yieldImprovement,
              },
              {
                title: "Water Conservation",
                stat: "40% Reduction",
                desc: "Smart irrigation systems optimization",
                image: images.waterConservation,
              },
              {
                title: "Sustainable Farming",
                stat: "Carbon Neutral",
                desc: "AI-optimized resource management",
                image: images.sustainableFarming,
              },
            ].map((caseStudy, index) => (
              <GradientCard key={index}>
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-green-100 hover:border-green-200 overflow-hidden">
                  <Image
                    src={caseStudy.image}
                    width={800}
                    height={600}
                    alt={caseStudy.title}
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{caseStudy.title}</h3>
                    <p className="text-green-600 font-bold text-lg mb-2">{caseStudy.stat}</p>
                    <p className="text-gray-600">{caseStudy.desc}</p>
                  </div>
                </div>
              </GradientCard>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
            Farmer Testimonials
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Organic Farmer",
                text: "Revolutionized our farm management with AI insights",
                image: images.farmer1,
              },
              {
                name: "Michael Chen",
                role: "Agri Engineer",
                text: "Saved countless hours in crop monitoring",
                image: images.farmer2,
              },
              {
                name: "Emma Rodriguez",
                role: "Farm Manager",
                text: "Real-time alerts transformed our decision making",
                image: images.farmer3,
              },
            ].map((testimonial, index) => (
              <GradientCard key={index}>
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-green-100 hover:border-green-200 h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <Image
                      src={testimonial.image}
                      width={60}
                      height={60}
                      alt={testimonial.name}
                      className="rounded-full object-cover aspect-square"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                      <p className="text-green-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
                </div>
              </GradientCard>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}