"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContractCard } from "@/app/(dashboard)/(routes)/marketplace/contracts/components/contract-card";
import { ContractEmptyPlaceholder } from "@/app/(dashboard)/(routes)/marketplace/contracts/components/contract-empty-placeholder";
import { getContractsByAccountId } from "@/app/actions/contractsActions"; 
import { ContractModel } from "@/app/types";
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ weight: '600', subsets: ['latin'] });

export default function ContractsPage() {
  const accountId = "org_2ncENhn6JwWpZA2lTOdmnXAFjaG"; // Updated account ID
  const [contracts, setContracts] = useState<ContractModel[]>([]);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const data = await getContractsByAccountId(accountId);
        setContracts(data);
      } catch (error) {
        console.error("Error fetching contracts:", error);
      }
    };

    fetchContracts();
  }, [accountId]); // Added accountId as a dependency

  const user_defined_contracts = contracts.filter(
    (contract) => contract.contract_creator === "user_defined"
  );

  const suggested_contracts = contracts.filter(
    (contract) => contract.contract_creator === "suggested_contract"
  );

  return (
    <>
      <div className="min-h-screen flex flex-col">
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
        <div className="hidden md:block flex-grow">
          <div className="border-t">
            <div className="bg-background">
              <div className="grid lg:grid-cols-5">
                <div className="col-span-5 lg:border-l">
                  <div className="h-full px-4 py-6 lg:px-8 flex flex-col">

                    {/* Title and Description */}
                    <div className="mb-8">
                      <h1 className={`text-4xl font-bold tracking-tight mb-4 ${montserrat.className}`}>Contracts</h1>
                      <p className="text-lg text-muted-foreground">
                        Manage your contracts and agreements efficiently.
                      </p>
                    </div>

                    {/* Tabs and Content */}
                    <Tabs defaultValue="active" className="h-full space-y-6">
                      <div className="flex items-center justify-between mb-6">
                        <TabsList>
                          <TabsTrigger value="active">Active</TabsTrigger>
                          <TabsTrigger value="draft">Drafts</TabsTrigger>
                          <TabsTrigger value="archive" disabled>Archive</TabsTrigger>
                        </TabsList>
                        <Button>
                          <PlusCircledIcon className="mr-2 h-5 w-5" />
                          Create New Contract
                        </Button>
                      </div>
                      <TabsContent value="active">
                        <div className="space-y-6">
                          {/* User Defined Contracts */}
                          <div>
                            <h2 className={`text-2xl font-semibold tracking-tight mb-4 ${montserrat.className}`}>
                              Continue Reviewing Your Key Contracts
                            </h2>
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
                          </div>

                          {/* Suggested Contracts */}
                          <div>
                            <h2 className={`text-2xl font-semibold tracking-tight mb-4 ${montserrat.className}`}>
                              Suggested Contracts
                            </h2>
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
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="draft">
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
      </div>    
    </>
  );
}
