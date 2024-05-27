import { Metadata } from "next"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "./components/date-range-picker"
import { MainNav } from "./components/main-nav"
import { Overview } from "./components/overview"
import { RecentActivties } from "@/components/recent-activity"
import { Search } from "./components/search"
import TeamSwitcher from "./components/team-switcher"
import { UserNav } from "./components/user-nav"
import { allStatCards } from "@/app/data"; // Assuming connectors data defined here


export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
}

const stat_cards_workflow_analytics = allStatCards.filter(
  (stat) => stat.page === "workflow_analytics"
);

export default function DashboardPage() {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <CalendarDateRangePicker />
              <Button>Download</Button>
            </div>
          </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stat_cards_workflow_analytics.map((item) => (
                <Card key={item.title} className="card"> {/* Add a class name for styling */}
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium"> {/* Apply styles to title */}
                      {item.title}
                    </CardTitle>
                    {/* {item.icon && ( // Conditionally render icon if provided
                      <svg>
                        <path d={item.icon} />
                      </svg>
                    )} */}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{item.value}</div>
                    <p className="text-xs text-muted-foreground">{item.subtitle || "This month"}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      There were 265 actions this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentActivties />
                  </CardContent>
                </Card>
              </div>
        </div>
      </div>
    </>
  )
}
