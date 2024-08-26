'use client';

import Image from "next/image";

import useCountries from "@/app/hooks/useCountries";
import { SafePhysicalLocation, SafeUser } from "@/app/types";
import PhotoGallery from "./PhotoGallery";
import Heading from "../Heading";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  title: string;
  location: SafePhysicalLocation
  locationValue: string;
  imageSrc: string;
  images: any;
  id: string;
  currentUser?: SafeUser | null
  sellerName: string | null;
  user: SafeUser | null | undefined;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  location,
  imageSrc,
  images,
  id,
  currentUser
}) => {
  const { getByValue } = useCountries();

  // const location = getByValue(locationValue);

  return ( 
    <div>
      <Heading
        title={title}
        subtitle={`${location?.city}, ${location?.state}`}
      />
      <div className="
          w-full
          h-[60vh]
          overflow-hidden 
          rounded-xl
          relative
        "
      >
        <PhotoGallery images={images} />
          {/* <Image src={imageSrc} width={1920} height={1080} alt="Main Image"/> */}
        </div>
      </div>
   );
}
 
export default ListingHead;