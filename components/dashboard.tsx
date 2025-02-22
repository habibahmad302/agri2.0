import { LiveDataFeed } from "./live-data-feed"
import { ComputerVisionInsights } from "./computer-vision-insights"
import { AIPredictions } from "./ai-predictions"
import { ActionableCards } from "./actionable-cards"
import { CropScheduling } from "./crop-scheduling"
import { WeatherWidget } from "./weather"

export function Dashboard() {
  return (
    <div className="container mx-auto py-6 space-y-8">
      <h1 className="text-3xl font-bold">Farm Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <LiveDataFeed />
        <ComputerVisionInsights />
        <AIPredictions />
        <ActionableCards />
        {/* <CropScheduling /> */}
        <WeatherWidget />
      </div>
    </div>
  )
}

