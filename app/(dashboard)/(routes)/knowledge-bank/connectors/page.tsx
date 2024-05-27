"use client"
import { Metadata } from "next"
import Image from "next/image"
import { useState } from "react"
import ConnectorsList from "./connectors-list"
import { connectors } from "@/app/data"; // Assuming connectors data is defined here
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogOverlay } from "@radix-ui/react-dialog";


export default function ConnectorsLayout() {
  const [isCreateConnectorModalOpen, setIsCreateConnectorModalOpen] = useState(false);

  const handleOpenCreateConnectorModal = () => setIsCreateConnectorModalOpen(true);
  const handleCloseCreateConnectorModal = () => setIsCreateConnectorModalOpen(false);

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar for existing connectors */}
          <div className="col-span-4">
            <h2 className="text-xl font-bold tracking-tight">Connectors</h2>
            {/* <ConnectorsList connectors={connectors} /> */}
          </div>
          <div className="col-span-8">
            {/* Main content area */}
            <div className="space-y-0.5">
              <h2 className="text-2xl font-bold tracking-tight">Discover Connectors</h2>
              <p className="text-muted-foreground">
                Connect your favorite tools and platforms to streamline your workflow.
              </p>
            </div>
            <div className="grid grid-cols-4 gap-4"> {/* Grid layout for new connectors */}
              {/* {connectors.map((channel) => (
                <div key={channel.id} className="bg-white rounded-lg px-4 py-3 shadow-sm">
                  <p className="text-base font-medium">{channel.name}</p>
                </div>
              ))} */}
            </div>
            {/* <div className="mt-6 text-center">
              <Button onClick={handleOpenCreateConnectorModal}>
                <PlusCircledIcon className="mr-2 h-4 w-4" />
                New Connector
              </Button>
            </div> */}
          </div>
        </div>
        <div>
        {/* Create Connector Modal (using radix-ui) */}
        {isCreateConnectorModalOpen && (
          <Dialog open={isCreateConnectorModalOpen} onOpenChange={setIsCreateConnectorModalOpen}>
            <DialogTrigger asChild>
              <Button>Cancel</Button> {/* Assuming a cancel button exists in the form */}
            </DialogTrigger>
            <>
              <DialogContent>
                {/* Placeholder content */}
              </DialogContent>
            </>
            <DialogOverlay onClick={handleCloseCreateConnectorModal} />
          </Dialog>
        )}
        </div>
      </div>
    </>
  )
}
