import Button from "../Button.client";
import { useCallback } from "react";
import useReservationModal from "@/app/hooks/useReservationModal";

interface CollaborationRequestProps {
  price: number;
  className?: string;
}

const CollaborationRequest: React.FC<CollaborationRequestProps> = ({ price }) => {
  const reservationModal = useReservationModal();

  const onToggle = useCallback(() => {
    reservationModal.onOpen();
  }, [reservationModal]);

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-4 my-4">
      <div className="text-xl font-semibold">${Math.round(price / 120)} / month with financing</div>
      <Button label="Request Collab" onClick={onToggle}  />
      <div className="font-semibold text-lg mt-4">Total: $ {price}</div>
    </div>
  );
}

export default CollaborationRequest;
