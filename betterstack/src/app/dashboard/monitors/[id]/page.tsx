import MonitorDetailPage from "@/components/MonitorDetails.tsx"
import {getMonitor} from "@/actions/monitors"
export default async function MonitorDetail({ params }: { params: { id: string } }) {
  const { monitor, logs, responseTimeData, uptimeData } = await getMonitor(params.id)

  return (
    <MonitorDetailPage
      monitor={monitor}
      logs={logs}
      responseTime={responseTimeData}
      uptime={uptimeData}
    />
  )
}
