import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { UserNav } from "./components/user-nav"
import { allStatCards, data_categories } from "@/app/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TaxonomySunburstOverview } from "./components/taxonomy-overview"

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}

const stat_cards_business_terms = allStatCards.filter(
  (stat) => stat.page === "business_terms"
);

export default async function TaskPage() {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/tasks-light.png"
          width={1280}
          height={998}
          alt="Playground"
          className="block dark:hidden"
        />
        <Image
          src="/examples/tasks-dark.png"
          width={1280}
          height={998}
          alt="Playground"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">

        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <UserNav />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {stat_cards_business_terms.map((item) => (
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
            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
            <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Terms</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                   <DataTable data={data_categories} columns={columns} />
                  </CardContent>
            </Card>
            {/* <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Types</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <TaxonomySunburstOverview />
                  </CardContent>
                </Card> */}
                </div>
      </div>
    </>
  )
}
