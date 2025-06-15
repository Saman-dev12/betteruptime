import MonitorDetailPage from "@/components/MonitorDetails.tsx"
import {getMonitor} from "@/actions/monitors"
export default async function MonitorDetail({ params }: { params: { id: string } }) {
  const {id} = await params
  const { monitor, logs, responseTimeData, uptimeData } = await getMonitor(id)

  return (
    <MonitorDetailPage
      monitor={monitor}
      logs={logs}
      responseTime={responseTimeData}
      uptime={uptimeData}
    />
  )
}
