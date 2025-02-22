import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Camera, X, ScanSearch, Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function ImageProcessing() {
  const { toast } = useToast()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<any>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Camera handling
  useEffect(() => {
    if (isCameraActive) {
      startCamera()
    }
    return () => stopCamera()
  }, [isCameraActive])

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Please enable camera permissions",
        variant: "destructive"
      })
      setIsCameraActive(false)
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop())
    }
  }

  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d')
      canvasRef.current.width = videoRef.current.videoWidth
      canvasRef.current.height = videoRef.current.videoHeight
      context?.drawImage(videoRef.current, 0, 0)
      const image = canvasRef.current.toDataURL('image/png')
      setSelectedImage(image)
      setIsCameraActive(false)
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast({
        title: "File too large",
        description: "Please upload an image smaller than 5MB",
        variant: "destructive"
      })
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      setSelectedImage(e.target?.result as string)
      analyzeImage(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const analyzeImage = async (image: string) => {
    setIsProcessing(true)
    setAnalysisResult(null)
    
    // Simulate AI processing
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock analysis results
      setAnalysisResult({
        healthStatus: Math.random() > 0.5 ? "Healthy" : "At Risk",
        diseaseDetection: Math.random() > 0.5 ? "No diseases detected" : "Potential fungal infection",
        nutrientDeficiency: ["Nitrogen", "Potassium"][Math.floor(Math.random() * 2)],
        confidence: (Math.random() * 100).toFixed(1) + "%"
      })
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Could not process the image",
        variant: "destructive"
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Crop Health Analysis</h1>
        <p className="text-muted-foreground">AI-powered plant disease detection</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScanSearch className="w-6 h-6" />
            Image Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button asChild variant="outline" className="relative h-32 w-64">
              <label>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <Upload className="h-8 w-8" />
                  <span>Upload Image</span>
                  <span className="text-xs text-muted-foreground">JPG, PNG (max 5MB)</span>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  disabled={isProcessing}
                />
              </label>
            </Button>

            <Button 
              variant="outline" 
              className="h-32 w-64"
              onClick={() => setIsCameraActive(!isCameraActive)}
              disabled={isProcessing}
            >
              {isCameraActive ? (
                <div className="flex flex-col items-center justify-center gap-2">
                  <X className="h-8 w-8" />
                  <span>Stop Camera</span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2">
                  <Camera className="h-8 w-8" />
                  <span>Capture Image</span>
                </div>
              )}
            </Button>
          </div>

          {isCameraActive && (
            <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
              <video ref={videoRef} autoPlay className="w-full h-full object-contain" />
              <canvas ref={canvasRef} className="hidden" />
              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <Button onClick={captureImage} className="gap-2">
                  <Camera className="h-4 w-4" />
                  Capture Snapshot
                </Button>
              </div>
            </div>
          )}

          {selectedImage && (
            <div className="space-y-4">
              <div className="relative aspect-square bg-muted rounded-lg overflow-hidden border">
                <img 
                  src={selectedImage} 
                  alt="Analysis preview" 
                  className="w-full h-full object-contain p-4"
                />
                {isProcessing && (
                  <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                    <Loader2 className="h-12 w-12 animate-spin" />
                  </div>
                )}
              </div>

              {analysisResult && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 space-y-1">
                      <p className="text-sm text-muted-foreground">Health Status</p>
                      <p className={`text-lg font-semibold ${
                        analysisResult.healthStatus === "Healthy" 
                          ? "text-green-600" 
                          : "text-red-600"
                      }`}>
                        {analysisResult.healthStatus}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 space-y-1">
                      <p className="text-sm text-muted-foreground">Disease Detection</p>
                      <p className="text-lg font-semibold">{analysisResult.diseaseDetection}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 space-y-1">
                      <p className="text-sm text-muted-foreground">Nutrient Deficiency</p>
                      <p className="text-lg font-semibold">{analysisResult.nutrientDeficiency}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 space-y-1">
                      <p className="text-sm text-muted-foreground">Confidence Level</p>
                      <p className="text-lg font-semibold">{analysisResult.confidence}</p>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}