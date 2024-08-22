// utils/contracts.ts
import { contracts } from "@/app/data";
import { ContractModel } from "@/app/types";

export function getContractById(id: string): ContractModel | undefined {
  return contracts.find((contract) => contract.id === id);
}
