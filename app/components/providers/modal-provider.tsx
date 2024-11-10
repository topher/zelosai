 "use client";

import { useEffect, useState } from "react";

import { CardModal } from "@/app/components/atomic/ttemplates/modals/card-modal";
import { ProModal } from "@/app/components/atomic/ttemplates/modals/pro-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CardModal />
      <ProModal />
    </>
  )
}