// components/atomic/templates/modals/purchase-credits-modal.tsx

"use client";

import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatError } from "@/lib/errorFormatter";
import { handleApiError } from "@/lib/errorHandler";
import { usePurchaseCreditsModal } from "@/hooks/use-purchase-credits-modal";
import { CreditPackage } from "@/config/featuresConfig"; // Define your credit packages here

interface PurchaseCreditsModalProps {}

export const PurchaseCreditsModal: React.FC<PurchaseCreditsModalProps> = () => {
  const purchaseCreditsModal = usePurchaseCreditsModal();
  const [loading, setLoading] = useState(false);

  // Define available credit packages
  const creditPackages: CreditPackage[] = [
    { id: "pkg_small", name: "Small Pack", credits: 100, price: 9.99 },
    { id: "pkg_medium", name: "Medium Pack", credits: 250, price: 19.99 },
    { id: "pkg_large", name: "Large Pack", credits: 500, price: 34.99 },
    { id: "pkg_unlimited", name: "Unlimited", credits: Infinity, price: 99.99 },
  ];

  const handlePurchase = async (packageId: string) => {
    setLoading(true);
    try {
      // Initiate purchase via API
      const response = await axios.post("/api/purchase-credits", { packageId });

      if (response.status === 200) {
        const { url } = response.data;
        // Redirect to payment processor (e.g., Stripe Checkout)
        window.location.href = url;
      } else {
        // Handle known errors
        const errorData = response.data;
        const errorResponse = formatError(
          errorData.code || "PAYMENT_SESSION_FAILED",
          errorData.message || "Failed to create a payment session."
        );
        toast.error(errorResponse.error.message);
      }
    } catch (error: any) {
      console.error("[PURCHASE_CREDITS_ERROR]", error);
      handleApiError(error);
      const errorResponse = formatError(
        "PAYMENT_SESSION_FAILED",
        "Failed to create a payment session."
      );
      toast.error(errorResponse.error.message);
    } finally {
      setLoading(false);
      purchaseCreditsModal.onClose();
    }
  };

  return (
    <Dialog open={purchaseCreditsModal.isOpen} onOpenChange={purchaseCreditsModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Purchase Credits</DialogTitle>
          <DialogDescription className="text-center">
            Choose a credit package that suits your needs.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {creditPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="flex items-center justify-between p-4 border rounded-md hover:bg-gray-50 transition cursor-pointer"
              onClick={() => handlePurchase(pkg.id)}
            >
              <div>
                <h3 className="text-lg font-semibold">{pkg.name}</h3>
                <p className="text-sm text-gray-600">
                  {pkg.credits === Infinity ? "Unlimited Credits" : `${pkg.credits} Credits`}
                </p>
              </div>
              <div className="text-lg font-bold">${pkg.price}</div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={purchaseCreditsModal.onClose} disabled={loading}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
