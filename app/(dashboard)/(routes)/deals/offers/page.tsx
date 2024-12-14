// /app/(dashboard)/(routes)/deals/offers/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import TableViewLayout from "@/app/components/atomic/templates/TableViewLayout";
import { Offer } from "@/app/types";
import { columns } from "./components/columns"; // Offer-specific columns

const OfferPage = () => {
  const { userId, orgId } = useAuth();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId && orgId) {
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
    window.location.href = `/dashboard/workflows/offers/${offerId}/message`;
  };

  return (
    <TableViewLayout<Offer, string>
      header={{
        title: "Offers",
        description: "Manage your offers effectively.",
        actions: (
          <Link href="/dashboard/workflows/offers/new">
            <Button>
              <PlusCircledIcon className="mr-2 h-5 w-5" />
              Add New Offer
            </Button>
          </Link>
        ),
      }}
      isLoading={loading}
      error={error}
      data={offers}
      columns={columns(handleAccept, handleDeny, handleCounter, handleSendMessage)}
    />
  );
};

export default OfferPage;
