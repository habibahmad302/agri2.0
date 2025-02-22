import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Mail, Loader2, AlertCircle, BarChart, Calendar } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
export function ReportGeneration() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [reportData, setReportData] = useState<any>(null)
  const [selectedFormat, setSelectedFormat] = useState("PDF")
  const [emailAddress, setEmailAddress] = useState("")

  // Simulated API call
  useEffect(() => {
    const fetchReportData = async () => {
      setIsLoading(true)
      try {
        // Simulated delay
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Mock data
        setReportData({
          yieldIncrease: "15%",
          soilQuality: "Optimal (pH 6.8)",
          waterEfficiency: "20% Improvement",
          pestIncidents: 2,
          revenueProjection: "$45,200",
          recommendations: ["Increase nitrogen levels", "Rotate crops next season"]
        })
      } catch (error) {
        toast({
          title: "Data Error",
          description: "Failed to load report data",
          variant: "destructive"
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchReportData()
  }, [])

  const handleExport = async (format: string) => {
    try {
      setIsLoading(true)
      // Simulated export delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: "Export Successful",
        description: `Report exported as ${format}`
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Could not generate report",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEmailSend = async () => {
    if (!emailAddress.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      })
      return
    }

    try {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast({
        title: "Report Sent",
        description: `Report emailed to ${emailAddress}`
      })
      setEmailAddress("")
    } catch (error) {
      toast({
        title: "Email Failed",
        description: "Could not send report",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Farm Analytics Report</h1>
        <p className="text-muted-foreground">Comprehensive agricultural insights powered by AI</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart className="h-6 w-6" />
              <span>Seasonal Report - {new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Last updated: {new Date().toLocaleDateString()}
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : reportData ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 space-y-1">
                    <p className="text-sm text-muted-foreground">Yield Projection</p>
                    <p className="text-2xl font-bold text-green-600">{reportData.yieldIncrease}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 space-y-1">
                    <p className="text-sm text-muted-foreground">Soil Quality</p>
                    <p className="text-2xl font-bold">{reportData.soilQuality}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 space-y-1">
                    <p className="text-sm text-muted-foreground">Water Efficiency</p>
                    <p className="text-2xl font-bold text-blue-600">{reportData.waterEfficiency}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 space-y-2">
                    <h3 className="font-semibold">Key Recommendations</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {reportData.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="text-sm">{rec}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 space-y-4">
                    <h3 className="font-semibold">Additional Metrics</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Pest Incidents</span>
                        <span className="font-medium">{reportData.pestIncidents}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Revenue Projection</span>
                        <span className="font-medium text-green-600">{reportData.revenueProjection}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-wrap gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button disabled={isLoading}>
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="mr-2 h-4 w-4" />
                      )}
                      Export Report ({selectedFormat})
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setSelectedFormat("PDF")}>
                      PDF Document
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedFormat("Excel")}>
                      Excel Spreadsheet
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSelectedFormat("CSV")}>
                      CSV Data
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" disabled={isLoading}>
                      <Mail className="mr-2 h-4 w-4" />
                      Share Report
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Email Report</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        type="email"
                        placeholder="Enter recipient email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                      />
                      <Button onClick={handleEmailSend} disabled={isLoading}>
                        {isLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Mail className="mr-2 h-4 w-4" />
                        )}
                        Send Report
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-32 gap-2 text-red-500">
              <AlertCircle className="h-6 w-6" />
              <span>Failed to load report data</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}