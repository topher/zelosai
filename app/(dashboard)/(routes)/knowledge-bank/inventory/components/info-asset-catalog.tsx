"use client"

import * as React from "react"
import {
  AlertCircle,
  Archive,
  File,
  Inbox,
  MessagesSquare,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Separator } from "@/components/ui/separator"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AccountSwitcher } from "./account-switcher"
import { InfoAssetDisplay } from "./info-asset-display"
import { InfoAssetList } from "./info-asset-list"
import { InfoAsset } from "@/app/types";
import { Nav } from "./nav"
import { useInfoAsset } from "../../use-info-asset"

interface InfoAssetCatalogProps {
  accounts: {
    label: string
    email: string
    icon: React.ReactNode
  }[]
  info_assets: InfoAsset[]
  defaultLayout: number[] | undefined
  defaultCollapsed: boolean
  navCollapsedSize: number
}

export function InfoAssetCatalog({
  accounts,
  info_assets,
  defaultLayout = [265, 440, 655],
  defaultCollapsed = false,
  navCollapsedSize,
}: InfoAssetCatalogProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed)

  const { infoAsset, updateInfoAsset } = useInfoAsset();

  const handleAssetSelection = (infoAsset: InfoAsset) => {
    updateInfoAsset(infoAsset); // Assuming a state management solution with setInfoAsset
  };
  

  type PartialInfoAsset = Partial<InfoAsset>; // Creates a new type with all properties optional

  // Usage in InfoAssetCatalog.tsx
  const infoAssets: InfoAsset[] = []; // Array of complete InfoAssetProps objects


  const selectedInfoAsset = infoAssets.find(
    (item) => item.URI === infoAsset?.uri
  );
  
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes
          )}`
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={30}
          onCollapse={() => {
            setIsCollapsed(true); // Set desired collapsed state
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`;
          }}
          onExpand={() => {
            setIsCollapsed(false); // Set desired expanded state - titles now reappear on expansion
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`;
          }}
              
          className={cn(
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2"
            )}
          >
            {/* <AccountSwitcher isCollapsed={isCollapsed} accounts={accounts} /> */}
          </div>
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Needs Review",
                label: "128",
                icon: Inbox,
                variant: "default",
              },
              {
                title: "Drafts",
                label: "9",
                icon: File,
                variant: "ghost",
              },
              {
                title: "Public",
                label: "39",
                icon: Send,
                variant: "ghost",
              },
              {
                title: "Private",
                label: "23",
                icon: Archive,
                variant: "ghost",
              },
              {
                title: "Trash",
                label: "",
                icon: Trash2,
                variant: "ghost",
              },
              {
                title: "Archive",
                label: "",
                icon: Archive,
                variant: "ghost",
              },
            ]}
          />
          <Separator />
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                title: "Core Data",
                label: "972",
                icon: Users2,
                variant: "ghost",
              },
              {
                title: "Creative Works",
                label: "972",
                icon: Users2,
                variant: "ghost",
              },
              {
                title: "Training Data",
                label: "342",
                icon: AlertCircle,
                variant: "ghost",
              },
              {
                title: "Trained Models",
                label: "128",
                icon: MessagesSquare,
                variant: "ghost",
              },
              {
                title: "Data Products",
                label: "8",
                icon: ShoppingCart,
                variant: "ghost",
              },
              {
                title: "Generative AI",
                label: "8",
                icon: ShoppingCart,
                variant: "ghost",
              },
              {
                title: "Data Offerings",
                label: "21",
                icon: Archive,
                variant: "ghost",
              },
              {
                title: "Product Inventory",
                label: "21",
                icon: Archive,
                variant: "ghost",
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">My Assets</h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Public
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Private
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              <InfoAssetList infoAssets={info_assets} />
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              <InfoAssetList infoAssets={info_assets.filter((item) => !item.read)} />
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]}>
          {selectedInfoAsset && <InfoAssetDisplay infoAsset={selectedInfoAsset} />}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
