"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {addMonitor,deleteMonitor} from "@/actions/monitors"
const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  url: z.string().url("Please enter a valid URL"),
  frequency: z.string().min(1, "Please select a frequency"),
})

interface AddMonitorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddMonitorDialog({ open, onOpenChange }: AddMonitorDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      url: "",
      frequency: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    const monitor = await addMonitor(values)

    console.log(values)
    setIsLoading(false)
    onOpenChange(false)
    form.reset()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-0 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Add New Monitor
          </DialogTitle>
          <DialogDescription>Create a new monitor to track your website or API uptime.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monitor Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="My Website"
                      {...field}
                      className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                    />
                  </FormControl>
                  <FormDescription>A friendly name for your monitor</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com"
                      {...field}
                      className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
                    />
                  </FormControl>
                  <FormDescription>The URL you want to monitor</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="frequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Check Frequency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="30">Every 30 seconds</SelectItem>
                      <SelectItem value="60">Every 1 minute</SelectItem>
                      <SelectItem value="300">Every 5 minutes</SelectItem>
                      <SelectItem value="600">Every 10 minutes</SelectItem>
                      <SelectItem value="900">Every 15 minutes</SelectItem>
                      <SelectItem value="1800">Every 30 minutes</SelectItem>
                      <SelectItem value="3600">Every 1 hour</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>How often to check your monitor</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isLoading ? "Creating..." : "Create Monitor"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
