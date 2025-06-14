"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { UserButton, useUser } from "@clerk/nextjs"
import { Mail, Calendar, Shield, Trash2, AlertTriangle, Crown } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function ProfilePage() {
  const { user } = useUser()

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
          Profile Settings
        </h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
      </div>

      {/* Profile Card */}
      <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Account Information
          </CardTitle>
          <CardDescription>Your personal information and account details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-16 h-16",
                  },
                }}
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Crown className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-muted-foreground">@{user.username || "username"}</p>
              <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300 border-0">
                <Crown className="w-3 h-3 mr-1" />
                Pro Plan
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Mail className="h-4 w-4" />
                Email Address
              </div>
              <p className="text-sm">{user.primaryEmailAddress?.emailAddress}</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Member Since
              </div>
              <p className="text-sm">
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Stats */}
      <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Usage Statistics</CardTitle>
          <CardDescription>Your current usage and limits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">12</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Active Monitors</div>
              <div className="text-xs text-muted-foreground mt-1">of 100 limit</div>
            </div>

            <div className="text-center p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <div className="text-2xl font-bold text-green-600">45,230</div>
              <div className="text-sm text-green-700 dark:text-green-300">Checks This Month</div>
              <div className="text-xs text-muted-foreground mt-1">of 1M limit</div>
            </div>

            <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">99.8%</div>
              <div className="text-sm text-purple-700 dark:text-purple-300">Overall Uptime</div>
              <div className="text-xs text-muted-foreground mt-1">last 30 days</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subscription */}
      <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Subscription</CardTitle>
          <CardDescription>Manage your subscription and billing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-lg">
            <div>
              <h4 className="font-semibold">Pro Plan</h4>
              <p className="text-sm text-muted-foreground">$29/month • Renews on Jan 20, 2024</p>
            </div>
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">Active</Badge>
          </div>

          <div className="flex gap-2">
            <Button variant="outline">Manage Billing</Button>
            <Button variant="outline">View Invoices</Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-0 shadow-lg border-red-200 dark:border-red-800">
        <CardHeader>
          <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
          <CardDescription>Irreversible and destructive actions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              Deleting your account will permanently remove all your monitors, data, and settings. This action cannot be
              undone.
            </AlertDescription>
          </Alert>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-0 shadow-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-red-600">Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove all your data from
                  our servers including:
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>All monitors and their historical data</li>
                    <li>Alert configurations</li>
                    <li>Account settings and preferences</li>
                    <li>Billing information</li>
                  </ul>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-600 hover:bg-red-700">Yes, delete my account</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  )
}
