import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 space-y-6">
      <AlertTriangle className="h-12 w-12 text-yellow-500" />

      <h1 className="text-4xl font-bold text-orange-900 dark:text-orange-100">
        Page Not Found
      </h1>

      <p className="text-muted-foreground max-w-md">
        The page you're looking for doesn't exist or has been moved. Please check the URL or go back to the dashboard.
      </p>

      <Button asChild>
        <Link href="/dashboard">Back to Dashboard</Link>
      </Button>
    </div>
  )
}
