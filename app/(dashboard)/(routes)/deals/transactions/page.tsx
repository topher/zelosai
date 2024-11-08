// app/(dashboard)/routes/workflows/transactions/page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs"; // Correct hook for authentication
import { Montserrat } from "next/font/google";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/app/components/atomic/organisms/data-table";
import { Transaction } from "@/app/types";
import { columns } from "./components/columns"; // Transaction-specific columns
import Image from "next/image"; // Correctly import Image

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const TransactionPage = () => {
    const { userId, orgId } = useAuth(); // Destructure orgId from Clerk's useUser
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      if (userId && orgId) {
        const ownerId = userId; // Get ownerId from Clerk's user object
  
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
    const transactionIndex = transactions.findIndex(
      (tx) => tx.id === transactionId
    );
    if (transactionIndex === -1) return;

    const updatedTransaction: Transaction = {
      ...transactions[transactionIndex],
      status:
        transactions[transactionIndex].status === "Pending"
          ? "Completed"
          : "Pending",
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

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <div className="md:hidden">
        {/* Mobile view images for transactions if any */}
        <Image
          src="/examples/transactions-light.png"
          width={1280}
          height={998}
          alt="Transactions"
          className="block dark:hidden"
        />
        <Image
          src="/examples/transactions-dark.png"
          width={1280}
          height={998}
          alt="Transactions"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className={`text-2xl font-bold tracking-tight ${montserrat.className}`}>
              Transactions
            </h2>
            <p className="text-muted-foreground">
              Manage your financial transactions effectively.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/dashboard/workflows/transactions/new">
              <Button>Add New Transaction</Button>
            </Link>
          </div>
        </div>
        <DataTable<Transaction, string>
          columns={columns(toggleTransactionStatus)}
          data={transactions}
        />
      </div>
    </>
  );
};

export default TransactionPage;
