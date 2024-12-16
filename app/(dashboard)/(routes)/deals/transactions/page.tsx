// /app/(dashboard)/(routes)/workflows/transactions/page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import TableViewLayout from "@/app/components/atomic/templates/TableViewLayout";
import { Transaction } from "@/app/types";
import { columns } from "./components/columns"; // Transaction-specific columns

const TransactionPage = () => {
  const { userId, orgId } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId && orgId) {
      const fetchTransactions = async () => {
        try {
          const response = await fetch(`/api/resource/transactions`);

          if (response.ok) {
            const data = await response.json();
            setTransactions(data.resources);
          } else {
            console.error("Failed to fetch transactions:", response.statusText);
            setError("Failed to load transactions.");
          }
        } catch (err) {
          console.error("Error fetching transactions:", err);
          setError("Failed to load transactions.");
        } finally {
          setLoading(false);
        }
      };

      fetchTransactions();
    }
  }, [userId, orgId]);

  // Function to toggle transaction status or any other attribute
  const toggleTransactionStatus = async (transactionId: string) => {
    const transactionIndex = transactions.findIndex((tx) => tx.id === transactionId);
    if (transactionIndex === -1) return;

    const updatedTransaction: Transaction = {
      ...transactions[transactionIndex],
      status: transactions[transactionIndex].status === "Pending" ? "Completed" : "Pending",
    };

    try {
      // Update the transaction in the backend
      const response = await fetch(`/api/resource/transactions/${transactionId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updatedTransaction.status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update transaction status.");
      }

      // Update the transaction in the local state
      setTransactions((prevTransactions) => {
        const newTransactions = [...prevTransactions];
        newTransactions[transactionIndex] = updatedTransaction;
        return newTransactions;
      });
    } catch (error) {
      console.error("Error updating transaction status:", error);
      alert("Failed to update transaction status.");
    }
  };

  return (
    <TableViewLayout<Transaction, string>
      header={{
        title: "Transactions",
        description: "Manage your financial transactions effectively.",
        actions: (
          <Link href="/dashboard/workflows/transactions/new">
            <Button>
              <PlusCircledIcon className="mr-2 h-5 w-5" />
              Add New Transaction
            </Button>
          </Link>
        ),
      }}
      isLoading={loading}
      error={error}
      data={transactions}
      columns={columns(toggleTransactionStatus)}
    />
  );
};

export default TransactionPage;
