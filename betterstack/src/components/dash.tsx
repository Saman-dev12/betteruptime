"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Plus,
  Globe,
  Clock,
  Activity,
  AlertTriangle,
  Trash2,
  MoreHorizontal,
  RefreshCw,
  Monitor,
  Zap,
} from "lucide-react"
import { AddMonitorDialog } from "@/components/add-monitor-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { deleteMonitor } from "@/actions/monitors"
import { useRouter } from "next/navigation"

interface MonitorData {
  id: string
  name: string
  url: string
  status: "up" | "down"
  responseTime: number
  lastChecked: string
  frequency: string
}

interface DashboardPageProps {
  monitors: MonitorData[]
}

export default function DashboardPage({ monitors }: DashboardPageProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const router = useRouter()

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id)
      await deleteMonitor(id)
      router.refresh() // Refresh the page to update the data
    } catch (error) {
      console.error("Failed to delete monitor:", error)
    } finally {
      setDeletingId(null)
    }
  }

  const handleRefresh = () => {
    router.refresh()
  }

  const downMonitors = monitors?.filter((m) => m.status === "down") || []
  const totalMonitors = monitors?.length || 0
  const avgResponseTime =
    monitors && monitors.filter((m) => m.status === "up").length > 0
      ? Math.round(
          monitors.filter((m) => m.status === "up").reduce((acc, m) => acc + m.responseTime, 0) /
            monitors.filter((m) => m.status === "up").length,
        )
      : 0

  // Empty State Component
  if (!monitors || monitors.length === 0) {
    return (
      <div className="space-y-6">
        {/* Stats Cards - Empty State */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Monitors</CardTitle>
              <Globe className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">0</div>
              <p className="text-xs text-blue-600 dark:text-blue-400">No monitors yet</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Avg Response Time
              </CardTitle>
              <Clock className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">—</div>
              <p className="text-xs text-purple-600 dark:text-purple-400">No data available</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">Issues</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">0</div>
              <p className="text-xs text-orange-600 dark:text-orange-400">All systems operational</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Status</CardTitle>
              <Zap className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900 dark:text-green-100">Ready</div>
              <p className="text-xs text-green-600 dark:text-green-400">Start monitoring</p>
            </CardContent>
          </Card>
        </div>

        {/* Beautiful Empty State */}
        <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="flex flex-col items-center justify-center py-16 px-6">
            <div className="relative mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Monitor className="w-12 h-12 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Plus className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="text-center space-y-4 max-w-md">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                No Monitors Yet
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Start monitoring your websites and APIs to ensure they're always running smoothly. Get instant alerts
                when something goes wrong.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Plus className="mr-2 h-5 w-5" />
                Create Your First Monitor
              </Button>
              <Button variant="outline" size="lg" className="border-2">
                <Activity className="mr-2 h-5 w-5" />
                Learn More
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 w-full max-w-2xl">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 rounded-lg">
                <Globe className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-sm text-blue-900 dark:text-blue-100">Website Monitoring</h4>
                <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">Track HTTP endpoints</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <h4 className="font-semibold text-sm text-purple-900 dark:text-purple-100">Response Times</h4>
                <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">Performance tracking</p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <h4 className="font-semibold text-sm text-green-900 dark:text-green-100">Instant Alerts</h4>
                <p className="text-xs text-green-700 dark:text-green-300 mt-1">Get notified immediately</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <AddMonitorDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
      </div>
    )
  }

  // Regular Dashboard with Data
  return (
    <div className="space-y-6">
      {/* Alert Banner */}
      {downMonitors.length > 0 && (
        <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>{downMonitors.length}</strong> monitor{downMonitors.length > 1 ? "s are" : " is"} currently down:{" "}
            {downMonitors.map((m) => m.name).join(", ")}
          </AlertDescription>
        </Alert>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Monitors</CardTitle>
            <Globe className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{totalMonitors}</div>
            <p className="text-xs text-blue-600 dark:text-blue-400">Active monitoring</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-700 dark:text-purple-300">
              Avg Response Time
            </CardTitle>
            <Clock className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{avgResponseTime}ms</div>
            <p className="text-xs text-purple-600 dark:text-purple-400">Across all monitors</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-700 dark:text-orange-300">Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">{downMonitors.length}</div>
            <p className="text-xs text-orange-600 dark:text-orange-400">
              {downMonitors.length === 0 ? "All systems operational" : "Monitors down"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-700 dark:text-green-300">Uptime</CardTitle>
            <Activity className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">
              {(((totalMonitors - downMonitors.length) / totalMonitors) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-green-600 dark:text-green-400">Overall status</p>
          </CardContent>
        </Card>
      </div>

      {/* Monitors Table */}
      <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Monitors</CardTitle>
              <CardDescription>Manage and monitor your websites and APIs</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={handleRefresh} variant="outline" size="sm">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Monitor
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Monitor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Response Time</TableHead>
                <TableHead>Last Checked</TableHead>
                <TableHead>Frequency</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monitors.map((monitor) => (
                <TableRow key={monitor.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{monitor.name}</div>
                      <div className="text-sm text-muted-foreground">{monitor.url}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={monitor.status === "up" ? "default" : "destructive"}
                      className={
                        monitor.status === "up"
                          ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-100"
                          : "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-100"
                      }
                    >
                      {monitor.status === "up" ? "Up" : "Down"}
                    </Badge>
                  </TableCell>
                  <TableCell>{monitor.status === "up" ? `${monitor.responseTime}ms` : "—"}</TableCell>
                  <TableCell className="text-muted-foreground">{monitor.lastChecked}</TableCell>
                  <TableCell className="text-muted-foreground">Every {monitor.frequency}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/monitors/${monitor.id}`}>
                            <Activity className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => handleDelete(monitor.id)}
                          disabled={deletingId === monitor.id}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          {deletingId === monitor.id ? "Deleting..." : "Delete"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddMonitorDialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen} />
    </div>
  )
}
