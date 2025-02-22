import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AIPredictions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Predictions</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          <li>Optimal watering time: 6:00 AM</li>
          <li>Predicted yield: 15% increase</li>
          <li>Pest risk: Low</li>
          <li>Recommended action: Apply fertilizer next week</li>
        </ul>
      </CardContent>
    </Card>
  )
}

