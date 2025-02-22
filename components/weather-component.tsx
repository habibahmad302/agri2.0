"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sun, Cloud, CloudRain, Wind, Thermometer, Droplets, Compass, LocateFixed, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function WeatherComponent() {
  const { toast } = useToast()
  const [location, setLocation] = useState("")
  const [weather, setWeather] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchWeather = async (lat?: number, lon?: number) => {
    try {
      setLoading(true)
      setError(null)
      
      let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      
      if (lat && lon) {
        url += `&lat=${lat}&lon=${lon}`
      } else {
        url += `&q=${location || "London"}`
      }

      const response = await fetch(url)
      
      if (!response.ok) throw new Error("City not found")
      
      const data = await response.json()
      
      setWeather({
        temp: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
        pressure: data.main.pressure,
        condition: data.weather[0].main,
        city: data.name,
        country: data.sys?.country
      })
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch weather")
      toast({
        title: "Error",
        description: "Failed to fetch weather data",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeather(position.coords.latitude, position.coords.longitude)
        },
        () => {
          toast({
            title: "Location Error",
            description: "Please enable location permissions",
            variant: "destructive"
          })
        }
      )
    }
  }

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear': return <Sun className="w-8 h-8 text-yellow-500" />
      case 'clouds': return <Cloud className="w-8 h-8 text-gray-500" />
      case 'rain': return <CloudRain className="w-8 h-8 text-blue-500" />
      default: return <Compass className="w-8 h-8 text-gray-500" />
    }
  }

  return (
    <div className="py-6 space-y-8 max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Global Weather</h1>
        <p className="text-muted-foreground">Get real-time weather updates</p>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Enter city or zip code"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
        />
        <Button onClick={() => fetchWeather()} disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
        </Button>
        <Button variant="outline" onClick={getCurrentLocation}>
          <LocateFixed className="h-4 w-4" />
        </Button>
      </div>

      {error && (
        <div className="text-red-500 text-center">
          {error}
        </div>
      )}

      {weather && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getWeatherIcon(weather.condition)}
              <div>
                <p className="text-2xl">{weather.city}, {weather.country}</p>
                <p className="text-muted-foreground capitalize">{weather.condition}</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <Thermometer className="w-6 h-6" />
              <div>
                <p className="text-sm">Temperature</p>
                <p className="font-medium">{weather.temp}°C</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Thermometer className="w-6 h-6" />
              <div>
                <p className="text-sm">Feels Like</p>
                <p className="font-medium">{weather.feelsLike}°C</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="w-6 h-6" />
              <div>
                <p className="text-sm">Humidity</p>
                <p className="font-medium">{weather.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-6 h-6" />
              <div>
                <p className="text-sm">Wind Speed</p>
                <p className="font-medium">{weather.windSpeed} km/h</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="w-6 h-6" />
              <div>
                <p className="text-sm">Pressure</p>
                <p className="font-medium">{weather.pressure} hPa</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}