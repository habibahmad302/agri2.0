import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, UploadCloud } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"

export function ComputerVisionInsights() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<{
    status: string
    confidence: number
    disease?: string
  } | null>(null)

  const mockAnalysisResults = [
    { status: "Healthy Crop", confidence: 0.95 },
    { status: "Powdery Mildew Detected", confidence: 0.87, disease: "Powdery Mildew" },
    { status: "Leaf Rust Detected", confidence: 0.78, disease: "Leaf Rust" }
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string)
        setIsProcessing(true)
      }
      
      reader.readAsDataURL(file)
    }
  }

  useEffect(() => {
    if (isProcessing) {
      const timeout = setTimeout(() => {
        const randomResult = mockAnalysisResults[
          Math.floor(Math.random() * mockAnalysisResults.length)
        ]
        setAnalysisResult(randomResult)
        setIsProcessing(false)
      }, 2000)

      return () => clearTimeout(timeout)
    }
  }, [isProcessing])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Computer Vision Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4">
          {/* Image Upload Section */}
          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-lg p-6 cursor-pointer hover:bg-accent/50 transition-colors">
            <UploadCloud className="h-8 w-8 text-muted-foreground" />
            <span className="text-sm font-medium">Upload Crop Image</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={isProcessing}
            />
          </label>

          {/* Image Preview Section */}
          {selectedImage && (
            <div className="relative w-full aspect-video rounded-md overflow-hidden border">
              <Image
                src={selectedImage}
                alt="Uploaded crop image"
                fill
                className="object-cover"
              />
              
              {/* Processing Overlay */}
              {isProcessing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
              )}

              {/* Analysis Result */}
              {analysisResult && !isProcessing && (
                <div className="absolute bottom-2 left-2 right-2 bg-background/90 p-3 rounded-md border shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">
                        {analysisResult.status}
                      </h3>
                      {analysisResult.disease && (
                        <p className="text-sm text-muted-foreground">
                          Detected Disease: {analysisResult.disease}
                        </p>
                      )}
                    </div>
                    <span className="text-sm font-medium text-green-600">
                      {(analysisResult.confidence * 100).toFixed(1)}% Confidence
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Rest of the code... */}
        </div>
      </CardContent>
    </Card>
  )
}