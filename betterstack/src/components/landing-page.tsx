"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Globe, Shield, Zap, BarChart3, Bell, Clock, Users, Star } from "lucide-react"
import { SignInButton, SignUpButton } from "@clerk/nextjs"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-md dark:bg-slate-900/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                UptimeGuard
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <SignInButton mode="modal">
                <Button variant="ghost">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Get Started
                </Button>
              </SignUpButton>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 dark:from-blue-900/30 dark:to-purple-900/30 dark:text-blue-300 border-0">
            <Zap className="w-3 h-3 mr-1" />
            Enterprise-Grade Monitoring
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 dark:from-white dark:via-blue-100 dark:to-purple-100 bg-clip-text text-transparent leading-tight">
            Monitor Everything.
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Miss Nothing.
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Get instant alerts when your websites go down. Monitor uptime, performance, and user experience with our
            premium monitoring platform trusted by thousands of developers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <SignUpButton mode="modal">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Monitoring Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </SignUpButton>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 rounded-xl border-2 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              View Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{"<"}30s</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Alert Speed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">50K+</div>
              <div className="text-sm text-slate-600 dark:text-slate-400">Websites</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Everything you need to monitor your infrastructure
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              From simple website monitoring to complex API health checks, we've got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Website Monitoring</CardTitle>
                <CardDescription>
                  Monitor HTTP/HTTPS endpoints with customizable check intervals and detailed response analysis.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Performance Analytics</CardTitle>
                <CardDescription>
                  Track response times, uptime percentages, and performance trends with beautiful charts.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-4">
                  <Bell className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Instant Alerts</CardTitle>
                <CardDescription>
                  Get notified immediately when your services go down via email, SMS, or webhooks.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Custom Intervals</CardTitle>
                <CardDescription>
                  Set monitoring frequencies from every 30 seconds to once per day based on your needs.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">SSL Monitoring</CardTitle>
                <CardDescription>
                  Monitor SSL certificate expiration and get alerts before certificates expire.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">Team Collaboration</CardTitle>
                <CardDescription>
                  Share monitors with your team and manage access controls for different team members.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              Trusted by developers worldwide
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  "UptimeGuard has been a game-changer for our team. The alerts are instant and the dashboard is
                  beautiful."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    JS
                  </div>
                  <div className="ml-3">
                    <div className="font-semibold">John Smith</div>
                    <div className="text-sm text-slate-500">CTO, TechCorp</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  "Finally, a monitoring service that doesn't break the bank but delivers enterprise features."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    MJ
                  </div>
                  <div className="ml-3">
                    <div className="font-semibold">Maria Johnson</div>
                    <div className="text-sm text-slate-500">Lead Developer, StartupXYZ</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  "The best monitoring dashboard I've used. Clean, fast, and incredibly reliable."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                    DL
                  </div>
                  <div className="ml-3">
                    <div className="font-semibold">David Lee</div>
                    <div className="text-sm text-slate-500">DevOps Engineer, BigCorp</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to never miss downtime again?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who trust UptimeGuard to monitor their critical infrastructure.
          </p>
          <SignUpButton mode="modal">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-slate-50 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </SignUpButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">UptimeGuard</span>
            </div>
            <div className="text-slate-400">© 2024 UptimeGuard. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
