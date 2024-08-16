"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { routes } from "@/components/sidebar";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] });

const DataVault: React.FC = () => {
  // find the Data Vault route from the sidebar routes array
  const dataVaultRoute = routes.find(route => route.label === 'Data Vault');

  return (
    <div className={`container mx-auto pb-10 -translate-y-14 ${montserrat.className}`}>
      <h1 className="text-6xl font-black mb-8 mt-4 relative text-left tracking-tight leading-tight">
        <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
          Data Vault
          {/* add extra context to denote homepage, maybe implement breadcrumb */}
        </span>
        <span className="block mt-4 h-1 bg-gradient-to-r from-indigo-600 to-pink-500 rounded-full w-40"></span>
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {dataVaultRoute?.children?.map((child, index) => (
          <li
            key={index}
            className="rounded-xl overflow-hidden shadow-lg transition-all transform hover:scale-105 hover:-translate-y-2 duration-300 group bg-gradient-to-t from-black/10 to-transparent backdrop-blur-lg hover:bg-gradient-to-br hover:from-indigo-500 hover:to-pink-500 hover:text-white hover:bg-opacity-30 hover:backdrop-blur-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
          >
            <Link href={child.href}>
              <div className="p-8">
                <div className="mb-4">
                  <Image
                    src={`/${child.icon}/${child.icon}-dynamic-color.png`}
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
                <p className="text-gray-600 group-hover:text-gray-200 mt-2 text-sm transition-colors duration-300">
                  {child.description}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataVault;


// import { Metadata } from "next"
// import Image from "next/image"

// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs"
// import { CalendarDateRangePicker } from "./components/date-range-picker"
// import { MainNav } from "./components/main-nav"
// import { Overview } from "./components/overview"
// import { RecentActivties } from "@/components/recent-activity"
// import { Search } from "./components/search"
// import TeamSwitcher from "./components/team-switcher"
// import { UserNav } from "./components/user-nav"
// import { allStatCards } from "@/app/data";


// export const metadata: Metadata = {
//   title: "Dashboard",
//   description: "Example dashboard app built using the components.",
// }

// const stat_cards_knowledge_bank = allStatCards.filter(
//   (stat) => stat.page === "knowledge_bank"
// );

// export default function DashboardPage() {
//   return (
//     <>
//       <div className="md:hidden">
//         <Image
//           src="/examples/dashboard-light.png"
//           width={1280}
//           height={866}
//           alt="Dashboard"
//           className="block dark:hidden"
//         />
//         <Image
//           src="/examples/dashboard-dark.png"
//           width={1280}
//           height={866}
//           alt="Dashboard"
//           className="hidden dark:block"
//         />
//       </div>
//       <div className="hidden flex-col md:flex">
//         {/* <div className="border-b">
//            <div className="flex h-16 items-center px-4">
//              <TeamSwitcher />
//              <MainNav className="mx-6" />
//              <div className="ml-auto flex items-center space-x-4">
//                <Search />
//                <UserNav />
//              </div>
//           </div>
//         </div> */}
//         <div className="flex-1 space-y-4 p-8 pt-6">
//           <div className="flex items-center justify-between space-y-2">
//             <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
//             <div className="flex items-center space-x-2">
//               <CalendarDateRangePicker />
//               <Button>Download</Button>
//             </div>
//           </div>
//           <Tabs defaultValue="overview" className="space-y-4">
//             {/* <TabsList>
//               <TabsTrigger value="overview">Overview</TabsTrigger>
//               <TabsTrigger value="analytics" disabled>
//                 Analytics
//               </TabsTrigger>
//               <TabsTrigger value="reports" disabled>
//                 Reports
//               </TabsTrigger>
//               <TabsTrigger value="notifications" disabled>
//                 Notifications
//               </TabsTrigger>
//             </TabsList> */}
//             <TabsContent value="overview" className="space-y-4">
//             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//               {stat_cards_knowledge_bank.map((item) => (
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
//               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//                 <Card className="col-span-4">
//                   <CardHeader>
//                     <CardTitle>Overview</CardTitle>
//                   </CardHeader>
//                   <CardContent className="pl-2">
//                     <Overview />
//                   </CardContent>
//                 </Card>
//                 <Card className="col-span-3">
//                   <CardHeader>
//                     <CardTitle>Recent Activiy</CardTitle>
//                     <CardDescription>
//                       Your team made 265 actions this month.
//                     </CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <RecentActivties />
//                   </CardContent>
//                 </Card>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>
//     </>
//   )
// }
