// components/atomic/templates/modals/pro-modal.tsx

"use client";

import axios from "axios";
import { useState } from "react";
import { Check, Zap } from "lucide-react";
import { toast } from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";
import { formatError } from "@/lib/errorFormatter";
import { handleApiError } from "@/lib/errorHandler";

export const ProModal = () => {
  const proModal = useProModal();
  const [loading, setLoading] = useState(false);

  const onSubscribe = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/subscription/upgrade", {}); // Update API endpoint if needed

      if (response.status === 200) {
        const { url } = response.data;
        // Redirect to Stripe Checkout
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
      console.error("[PRO_MODAL_ERROR]", error);
      handleApiError(error);
      const errorResponse = formatError(
        "PAYMENT_SESSION_FAILED",
        "Failed to create a payment session."
      );
      toast.error(errorResponse.error.message);
    } finally {
      setLoading(false);
      proModal.onClose();
    }
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold text-xl">
              Upgrade to Zelos Pro
              <Badge variant="premium" className="uppercase text-sm py-1">
                Pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            <p>Unlock advanced features and higher limits with the Pro Plan.</p>
            {/* You can list features here */}
            <ul className="list-disc list-inside space-y-1">
              <li>Access to premium tools</li>
              <li>Higher usage limits</li>
              <li>Priority support</li>
            </ul>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={onSubscribe}
            size="lg"
            variant="premium"
            className="w-full"
          >
            {loading ? "Processing..." : "Upgrade"}
            <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
