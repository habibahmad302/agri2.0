import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

const data = [
  { time: "00:00", soilPH: 6.5, soilMoisture: 35, temperature: 22 },
  { time: "04:00", soilPH: 6.7, soilMoisture: 38, temperature: 20 },
  { time: "08:00", soilPH: 6.8, soilMoisture: 40, temperature: 23 },
  { time: "12:00", soilPH: 7.0, soilMoisture: 42, temperature: 26 },
  { time: "16:00", soilPH: 6.9, soilMoisture: 39, temperature: 25 },
  { time: "20:00", soilPH: 6.6, soilMoisture: 36, temperature: 21 },
]

export function LiveDataFeed() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Live Data Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Line yAxisId="left" type="monotone" dataKey="soilPH" stroke="#8884d8" />
            <Line yAxisId="left" type="monotone" dataKey="soilMoisture" stroke="#82ca9d" />
            <Line yAxisId="right" type="monotone" dataKey="temperature" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

