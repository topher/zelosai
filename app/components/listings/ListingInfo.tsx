'use strict';

import dynamic from "next/dynamic";
import useCountries from "@/app/hooks/useCountries";
import { SafeUser, SafeBoat } from "@/app/types";
import Avatar from "../Avatar";

const Map = dynamic(() => import('../Map'), { 
  ssr: false 
});

interface Boat {
  name: string;
  description: string;
  url: string;
  price: number;
  weightLB: number;
  weightKG: number;
}

interface ListingInfoProps {
  user?: SafeUser | null;
  sellerName: string;
  listingDescription: string;
  boat: SafeBoat,
  locationValue: string;
  description: string;
  price: number;
  
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  user,
  sellerName,
  listingDescription,
  boat,
  locationValue,
}) => {
  const { getByValue } = useCountries();
  console.log("listing info", boat) 

  return ( 
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div 
          className="
            text-xl 
            font-semibold 
            flex 
            flex-row 
            items-center
            gap-2
          "
        >
          <div>Seller: {sellerName}</div>
          <Avatar src={user?.image} />
        </div>

        <div className="details-container">
          <div className="detail text-md">{boat?.manufacturer?.name}</div>
          <div className="detail text-md">{boat?.boatModel?.name}</div>
          <div className="detail text-md">{boat.loa}</div>
        </div>
      </div>
      <hr />
      <div className="text-lg font-light text-neutral-500">
        {listingDescription}
      </div>
    </div>


   );
}
 
export default ListingInfo;
