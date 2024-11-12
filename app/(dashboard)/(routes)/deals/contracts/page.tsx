// app/(dashboard)/(routes)/deals/contracts/page.tsx

"use client";

import { useEffect, useState } from "react";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { ContractCard } from "./components/contract-card";
import { ContractEmptyPlaceholder } from "./components/contract-empty-placeholder";
import { getContractsByAccountId } from "@/app/actions/contractsActions";
import { ContractModel } from "@/app/types";
import LibraryLayout from "@/app/components/atomic/templates/LibraryLayout";

export default function ContractsPage() {
  const accountId = "org_2ncENhn6JwWpZA2lTOdmnXAFjaG";
  const [contracts, setContracts] = useState<ContractModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const data = await getContractsByAccountId(accountId);
        setContracts(data);
      } catch (error) {
        console.error("Error fetching contracts:", error);
        setError("Error fetching contracts");
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, [accountId]);

  const header = {
    title: "Contracts",
    description: "Manage your contracts and agreements efficiently.",
    actions: (
      <Button>
        <PlusCircledIcon className="mr-2 h-5 w-5" />
        Create New Contract
      </Button>
    ),
  };

  const userDefinedContracts = contracts.filter(
    (contract) => contract.contract_creator === "user_defined"
  );

  const suggestedContracts = contracts.filter(
    (contract) => contract.contract_creator === "suggested_contract"
  );

  // Define standard card properties
  const standardCardProps = {
    aspectRatio: "landscape",
    width: 300,
    height: 225,
  };

  const tabs = [
    {
      value: "active",
      label: "Active",
      categories: [
        {
          name: "Continue Reviewing Your Key Contracts",
          items: userDefinedContracts,
          cardProps: standardCardProps,
        },
        {
          name: "Suggested Contracts",
          items: suggestedContracts,
          cardProps: standardCardProps,
        },
      ],
    },
    {
      value: "draft",
      label: "Drafts",
      content: <ContractEmptyPlaceholder />,
    },
    {
      value: "archive",
      label: "Archive",
      categories: [], // Provide archive categories if any
    },
  ];

  const itemLink = (contract: ContractModel) => `/contracts/${contract.id}`;

  return (
    <LibraryLayout<ContractModel>
      header={header}
      tabs={tabs}
      isLoading={loading}
      error={error}
      cardComponent={({ item, ...props }) => (
        <ContractCard contract={item} {...props} />
      )}
      itemLink={itemLink}
    />
  );
}
