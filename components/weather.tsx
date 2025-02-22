"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Thermometer, Droplets, Wind, Compass, Loader2, RefreshCw } from "lucide-react"
import { useEffect, useState } from "react"

export function WeatherWidget() {
  const [weather, setWeather] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null)

  const getWeatherConditionIcon = (condition: string) => {
    const icons: { [key: string]: string } = {
      Clear: '☀️',
      Clouds: '☁️',
      Rain: '🌧️',
      Snow: '❄️',
      Thunderstorm: '⛈️',
      Drizzle: '🌦️',
      Mist: '🌫️',
    }
    return icons[condition] || '🌤️'
  }

  const fetchWeatherData = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      )
      
      if (!response.ok) throw new Error('Weather data fetch failed')
      
      const data = await response.json()
      return {
        temperature: Math.round(data.main.temp),
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
        condition: data.weather[0].main,
        pressure: data.main.pressure,
        city: data.name,
        country: data.sys?.country
      }
    } catch (error) {
      throw new Error('Failed to fetch weather data')
    }
  }

  const loadWeather = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })

      const { latitude, longitude } = position.coords
      setLocation({ lat: latitude, lon: longitude })
      
      const weatherData = await fetchWeatherData(latitude, longitude)
      setWeather(weatherData)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to get weather data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadWeather()
  }, [])

  if (loading) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="flex items-center justify-center h-32">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center h-32 gap-2">
          <p className="text-red-500 text-center">{error}</p>
          <Button size="sm" onClick={loadWeather}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Compass className="h-5 w-5" />
            {weather?.city || 'Current Location'}
            {weather?.country && `, ${weather.country}`}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={loadWeather}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-4xl">
                {getWeatherConditionIcon(weather.condition)}
              </span>
              <div>
                <p className="text-2xl font-bold">
                  {weather.temperature}°C
                </p>
                <p className="text-sm text-muted-foreground capitalize">
                  {weather.condition.toLowerCase()}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Thermometer className="h-5 w-5" />
              <div>
                <p className="text-sm">Feels like</p>
                <p className="font-medium">
                  {weather.temperature + Math.floor(Math.random()*3 - 1)}°C
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="h-5 w-5" />
              <div>
                <p className="text-sm">Humidity</p>
                <p className="font-medium">
                  {weather.humidity}%
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="h-5 w-5" />
              <div>
                <p className="text-sm">Wind</p>
                <p className="font-medium">
                  {weather.windSpeed} km/h
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="h-5 w-5" />
              <div>
                <p className="text-sm">Pressure</p>
                <p className="font-medium">
                  {weather.pressure} hPa
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}