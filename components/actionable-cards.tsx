import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Droplet } from "lucide-react"

export function ActionableCards() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Actionable Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Card className="bg-yellow-100 dark:bg-yellow-900">
          <CardContent className="flex items-center p-4 space-x-4">
            <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            <span>Fertilizer Needed in Sector B</span>
          </CardContent>
        </Card>
        <Card className="bg-blue-100 dark:bg-blue-900">
          <CardContent className="flex items-center p-4 space-x-4">
            <Droplet className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span>Water Deficiency in Sector C</span>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}

