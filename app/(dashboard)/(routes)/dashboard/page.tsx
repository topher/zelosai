"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { routes } from "@/components/sidebar";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] });

const Dashboard: React.FC = () => {
  // find the Dashboard route from the sidebar routes array
  const dashboardRoute = routes.find(route => route.label === 'Dashboard');

  return (
    <div className={`container mx-auto pb-10 ${montserrat.className}`}>
      <h1 className="text-6xl font-black mb-8 -mt-10 relative text-left tracking-tight leading-tight">
        <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
          {dashboardRoute.label}
          {/* add extra context to denote homepage, maybe implement breadcrumb */}
        </span>
        <span className="block mt-2 h-1 bg-gradient-to-r from-indigo-600 to-pink-500 rounded-full w-40"></span>
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {dashboardRoute?.children?.map((child, index) => (
          <li
            key={index}
            className="rounded-xl overflow-hidden shadow-lg transition-all transform hover:scale-105 hover:-translate-y-2 duration-300 group bg-gradient-to-t from-black/10 to-transparent backdrop-blur-lg hover:bg-gradient-to-br hover:from-indigo-500 hover:to-pink-500 hover:text-white hover:bg-opacity-30 hover:backdrop-blur-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
          >
            <Link href={child.href}>
              <div className="p-6">
                <div className="mb-2">
                  <Image
                    src={`/${child.icon}/${child.icon}-dynamic-gradient.png`}
                    alt={child.label}
                    width={240}
                    height={240}
                    className="mx-auto group-hover:hidden transition-opacity duration-300"
                  />
                  <Image
                    src={`/${child.icon}/${child.icon}-dynamic-premium.png`}
                    alt={child.label}
                    width={240}
                    height={240}
                    className="mx-auto hidden group-hover:block transition-opacity duration-300"
                  />
                </div>
                <h2 className={`text-2xl font-bold ${child.color} group-hover:text-white transition-colors duration-300`}>
                  {child.label}
                </h2>
                {/* <p className="text-gray-600 group-hover:text-gray-200 mt-2 text-sm transition-colors duration-300">
                  {child.description}
                </p> */}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;



// import { promises as fs } from "fs"
// import path from "path"
// import { Metadata } from "next"
// import Image from "next/image"
// import { z } from "zod"

// import { columns } from "./components/columns"
// import { DataTable } from "./components/data-table"
// import { UserNav } from "./components/user-nav"
// import { tasks, allStatCards } from "@/app/data"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// export const metadata: Metadata = {
//   title: "Tasks",
//   description: "A task and issue tracker build using Tanstack Table.",
// }

// const stat_cards_dashboard = allStatCards.filter(
//   (stat) => stat.page === "dashboard"
// );

// export default async function TaskPage() {
//   return (
//     <>
//       <div className="md:hidden">
//         <Image
//           src="/examples/tasks-light.png"
//           width={1280}
//           height={998}
//           alt="Playground"
//           className="block dark:hidden"
//         />
//         <Image
//           src="/examples/tasks-dark.png"
//           width={1280}
//           height={998}
//           alt="Playground"
//           className="hidden dark:block"
//         />
//       </div>
//       <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">

//         <div className="flex items-center justify-between space-y-2">
//           <div>
//             <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
//             <p className="text-muted-foreground">
//               Here&apos;s a list of your tasks for this month!
//             </p>
//           </div>
//           <div className="flex items-center space-x-2">
//             <UserNav />
//           </div>
//         </div>
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//               {stat_cards_dashboard.map((item) => (
//                 <Card key={item.title} className="card"> {/* Add a class name for styling */}
//                   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                     <CardTitle className="text-sm font-medium"> {/* Apply styles to title */}
//                       {item.title}
//                     </CardTitle>
//                     {/* {item.icon && ( // Conditionally render icon if provided
//                       <svg>
//                         <path d={item.icon} />
//                       </svg>
//                     )} */}
//                   </CardHeader>
//                   <CardContent>
//                     <div className="text-2xl font-bold">{item.value}</div>
//                     <p className="text-xs text-muted-foreground">{item.subtitle || "This month"}</p>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//         <DataTable data={tasks} columns={columns} />
//       </div>
//     </>
//   )
// }
