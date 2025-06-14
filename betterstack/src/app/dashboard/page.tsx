import DashboardPage from "@/components/dash"
import { getAllMonitors } from "@/actions/monitors"

export default async function Dashboard() {
  const monitors = await getAllMonitors();

  return <DashboardPage monitors={monitors} />;
}
