"use client"

import type React from "react"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { LandingPage } from "@/components/landing-page"
import { Dashboard } from "@/components/dashboard"
import { WeatherComponent } from "@/components/weather-component"
import { ChatbotScreen } from "@/components/chatbot-screen"
import { ImageProcessing } from "@/components/image-processing"
import { ReportGeneration } from "@/components/report-generation"
import { Header } from "@/components/header"
import { NotificationSystem } from "@/components/notification-system"
// In your main layout file
import 'bootstrap/dist/css/bootstrap.min.css';
import CropRecommendation from "@/components/croprecommendation"

export default function Home() {
  const [activePage, setActivePage] = useState<string>("landing")

  const pageComponents: { [key: string]: React.ReactNode } = {
    landing: <LandingPage onGetStarted={() => setActivePage("dashboard")} />,
    dashboard: <Dashboard />,
    chatbot: <ChatbotScreen />,
    weather: <WeatherComponent />,
    imageProcessing: <ImageProcessing />,
    reportGeneration: <ReportGeneration />,
    CropRecommendation: <CropRecommendation />,
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {activePage !== "landing" && <Header setActivePage={setActivePage} activePage={activePage} />}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {pageComponents[activePage]}
          </motion.div>
        </AnimatePresence>
      </main>
      <NotificationSystem />
    </div>
  )
}

