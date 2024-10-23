"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContractCard } from "@/app/(dashboard)/(routes)/contracts/components/contract-card";
import { ContractEmptyPlaceholder } from "@/app/(dashboard)/(routes)/contracts/components/contract-empty-placeholder";
import { getContractsByAccountId } from "@/app/actions/contractsActions"; // Import the action
import { ContractModel } from "@/app/types";

export default function ContractsPage() {
  const accountId = "12345"; // Dummy account ID
  const [contracts, setContracts] = useState<ContractModel[]>([]);

  useEffect(() => {
    // Fetch contracts from Elasticsearch for this accountId
    const fetchContracts = async () => {
      try {
        const data = await getContractsByAccountId(accountId);
        setContracts(data);
      } catch (error) {
        console.error("Error fetching contracts:", error);
      }
    };

    fetchContracts();
  }, []);

  // Filter contracts by creator type
  const user_defined_contracts = contracts.filter(
    (contract) => contract.contract_creator === "user_defined"
  );

  const suggested_contracts = contracts.filter(
    (contract) => contract.contract_creator === "suggested_contract"
  );

  return (
    <>
      <div className="md:hidden">
        <Image
          src="/contract.webp"
          width={1280}
          height={1114}
          alt="Contracts"
          className="block dark:hidden"
        />
        <Image
          src="/contract.webp"
          width={1280}
          height={1114}
          alt="Contracts"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden md:block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5">
              <div className="col-span-3 lg:col-span-4 lg:border-l">
                <div className="h-full px-4 py-6 lg:px-8">
                  <Tabs defaultValue="active" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="active" className="relative">
                          Active
                        </TabsTrigger>
                        <TabsTrigger value="draft">Drafts</TabsTrigger>
                        <TabsTrigger value="archive" disabled>
                          Archive
                        </TabsTrigger>
                      </TabsList>
                      <div className="ml-auto mr-4">
                        <Button>Create New Contract</Button>
                      </div>
                    </div>

                    <TabsContent value="active" className="border-none p-0 outline-none">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">Continue reviewing</h2>
                          <p className="text-sm text-muted-foreground">Your key contracts today – Stay on top of it!</p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {user_defined_contracts.map((contract: ContractModel) => (
                              <ContractCard
                                key={contract.id}
                                contract={contract}
                                className="w-[250px]"
                                aspectRatio="portrait"
                                width={250}
                                height={330}
                              />
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                      <div className="mt-6 space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">Suggested Contracts</h2>
                        <p className="text-sm text-muted-foreground">Save time with pre-built contract templates</p>
                      </div>
                      <Separator className="my-4" />
                      <div className="relative">
                        <ScrollArea>
                          <div className="flex space-x-4 pb-4">
                            {suggested_contracts.map((contract: ContractModel) => (
                              <ContractCard
                                key={contract.id}
                                contract={contract}
                                className="w-[150px]"
                                aspectRatio="square"
                                width={150}
                                height={150}
                              />
                            ))}
                          </div>
                          <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                      </div>
                    </TabsContent>

                    <TabsContent value="draft" className="h-full flex-col border-none p-0 data-[state=active]:flex">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h2 className="text-2xl font-semibold tracking-tight">Continue drafting</h2>
                          <p className="text-sm text-muted-foreground">
                            Contracts, clauses, and negotiations aligned with your strategic goals.
                          </p>
                        </div>
                      </div>
                      <Separator className="my-4" />
                      <ContractEmptyPlaceholder />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
