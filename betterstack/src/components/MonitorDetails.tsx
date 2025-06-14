"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { Activity, Clock, Play, Settings, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"



export default function MonitorDetailPage({ monitor,responseTime,uptime,logs }) {
  const [selectedPeriod, setSelectedPeriod] = useState("24h")
  const [isTestingNow, setIsTestingNow] = useState(false)
  

  const testNow = async () => {
    setIsTestingNow(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsTestingNow(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            {monitor.name}
          </h1>
          <p className="text-muted-foreground mt-1">{monitor.url}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={testNow}
            disabled={isTestingNow}
            variant="outline"
            className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-950"
          >
            <Play className="mr-2 h-4 w-4" />
            {isTestingNow ? "Testing..." : "Test Now"}
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>

      {/* Status Alert */}
      {monitor.status === "down" && (
        <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            This monitor is currently down. Last successful check was 1 hour ago.
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Current Status</CardTitle>
            {monitor.status === "up" ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-red-600" />
            )}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              {monitor.status === "up" ? "Online" : "Offline"}
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">Last checked {monitor.lastChecked}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{monitor.responseTime}ms</div>
            <p className="text-xs text-blue-600 dark:text-blue-400">Average over 24h</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">Uptime (24h)</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{monitor.uptime24h}%</div>
            <p className="text-xs text-purple-600 dark:text-purple-400">Last 24 hours</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">Check Frequency</CardTitle>
            <Activity className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">{monitor.frequency}</div>
            <p className="text-xs text-orange-600 dark:text-orange-400">Monitoring interval</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Logs */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-slate-100 dark:bg-slate-800">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="uptime">Uptime</TabsTrigger>
          <TabsTrigger value="logs">Request Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Response Time</CardTitle>
                  <CardDescription>Response time over the last 24 hours</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={selectedPeriod === "24h" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPeriod("24h")}
                  >
                    24h
                  </Button>
                  <Button
                    variant={selectedPeriod === "7d" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPeriod("7d")}
                  >
                    7d
                  </Button>
                  <Button
                    variant={selectedPeriod === "30d" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPeriod("30d")}
                  >
                    30d
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={responseTime}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                    <XAxis dataKey="time" className="text-slate-600 dark:text-slate-400" />
                    <YAxis
                      className="text-slate-600 dark:text-slate-400"
                      label={{ value: "Response Time (ms)", angle: -90, position: "insideLeft" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="responseTime"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="uptime" className="space-y-4">
          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Uptime Overview</CardTitle>
              <CardDescription>Uptime percentage over different time periods</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3 mb-6">
                <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{monitor.uptime24h}%</div>
                  <div className="text-sm text-green-700 dark:text-green-300">Last 24 hours</div>
                </div>
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{monitor.uptime7d}%</div>
                  <div className="text-sm text-blue-700 dark:text-blue-300">Last 7 days</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{monitor.uptime30d}%</div>
                  <div className="text-sm text-purple-700 dark:text-purple-300">Last 30 days</div>
                </div>
              </div>

              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={uptime}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-slate-700" />
                    <XAxis dataKey="time" className="text-slate-600 dark:text-slate-400" />
                    <YAxis
                      className="text-slate-600 dark:text-slate-400"
                      domain={[99, 100]}
                      label={{ value: "Uptime (%)", angle: -90, position: "insideLeft" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="uptime"
                      stroke="#10b981"
                      fill="url(#uptimeGradient)"
                      strokeWidth={2}
                    />
                    <defs>
                      <linearGradient id="uptimeGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Request Logs</CardTitle>
              <CardDescription>Recent monitoring check results</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Response Time</TableHead>
                    <TableHead>Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log) => (
                    <TableRow key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                      <TableCell className="font-mono text-sm">{log.timestamp}</TableCell>
                      <TableCell>
                        <Badge
                          variant={log.isUp ? "default" : "destructive"}
                          className={
                            log.isUp
                              ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100"
                              : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100"
                          }
                        >
                          {log.status} {log.statusText}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.isUp ? `${log.responseTime}ms` : "—"}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {log.isUp ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                          )}
                          <span
                            className={
                              log.isUp ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"
                            }
                          >
                            {log.isUp ? "Success" : "Failed"}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
