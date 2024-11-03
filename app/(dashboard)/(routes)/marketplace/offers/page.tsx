// app/(dashboard)/(routes)/marketplace/offers/page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs"; // Correct hook for authentication
import { Montserrat } from "next/font/google";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/app/(dashboard)/components/shared/data-table/data-table";
import { Offer } from "@/app/types";
import { columns } from "./components/columns"; // Offer-specific columns
import Image from "next/image";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const OfferPage = () => {
  const { userId, orgId } = useAuth(); // Destructure orgId from Clerk's useUser
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      if (userId && orgId) {
      const ownerId = userId; // Get ownerId from Clerk's user object

      const fetchOffers = async () => {
          try {
          const response = await fetch(`/api/resource/offers`);

          if (response.ok) {
              const data = await response.json();
              setOffers(data.resources);
          } else {
              console.error("Failed to fetch offers:", response.statusText);
              setError("Failed to load offers.");
          }
          } catch (err) {
          console.error("Error fetching offers:", err);
          setError("Failed to load offers.");
          } finally {
          setLoading(false);
          }
      };

      fetchOffers();
      }
  }, [userId, orgId]);

  // Action Handlers
  const handleAccept = async (offerId: string) => {
    try {
      const response = await fetch(`/api/resource/offers/${offerId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Accepted", buyerId: userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to accept offer.");
      }

      // Update the offer in the local state
      setOffers((prevOffers) =>
        prevOffers.map((offer) =>
          offer.id === offerId ? { ...offer, status: "Accepted", buyerId: userId } : offer
        )
      );
    } catch (error) {
      console.error("Error accepting offer:", error);
      alert("Failed to accept offer.");
    }
  };

  const handleDeny = async (offerId: string) => {
    try {
      const response = await fetch(`/api/resource/offers/${offerId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Denied" }),
      });

      if (!response.ok) {
        throw new Error("Failed to deny offer.");
      }

      // Update the offer in the local state
      setOffers((prevOffers) =>
        prevOffers.map((offer) => (offer.id === offerId ? { ...offer, status: "Denied" } : offer))
      );
    } catch (error) {
      console.error("Error denying offer:", error);
      alert("Failed to deny offer.");
    }
  };

  const handleCounter = async (offerId: string) => {
    const newPriceInput = prompt("Enter your counter offer price:");

    if (!newPriceInput) return;

    const newPrice = parseFloat(newPriceInput);

    if (isNaN(newPrice) || newPrice <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    try {
      const response = await fetch(`/api/resource/offers/${offerId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price: newPrice, status: "Countered" }),
      });

      if (!response.ok) {
        throw new Error("Failed to counter offer.");
      }

      // Update the offer in the local state
      setOffers((prevOffers) =>
        prevOffers.map((offer) =>
          offer.id === offerId ? { ...offer, price: newPrice, status: "Countered" } : offer
        )
      );
    } catch (error) {
      console.error("Error countering offer:", error);
      alert("Failed to counter offer.");
    }
  };

  const handleSendMessage = (offerId: string) => {
    // Redirect to a messaging page or open a messaging modal
    // For simplicity, we'll link to a messaging route with the offer ID
    window.location.href = `/dashboard/workflows/offers/${offerId}/message`;
  };

  if (loading) return <p>Loading offers...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <div className="md:hidden">
        {/* Mobile view images for offers if any */}
        <Image
          src="/examples/offers-light.png"
          width={1280}
          height={998}
          alt="Offers"
          className="block dark:hidden"
        />
        <Image
          src="/examples/offers-dark.png"
          width={1280}
          height={998}
          alt="Offers"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className={`text-2xl font-bold tracking-tight ${montserrat.className}`}>
              Offers
            </h2>
            <p className="text-muted-foreground">
              Manage your offers effectively.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Link href="/dashboard/workflows/offers/new">
              <Button>Add New Offer</Button>
            </Link>
          </div>
        </div>
        <DataTable<Offer, string>
          columns={columns(handleAccept, handleDeny, handleCounter, handleSendMessage)}
          data={offers}
        />
      </div>
    </>
  );
};

export default OfferPage;
