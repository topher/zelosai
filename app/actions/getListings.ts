import prisma from "@/app/libs/prismadb";
import { SafeListing } from '../types'

export interface IBoatParams {
  id?: string;
  name?: string;
  description?: string;
  url?: string;
  availability?: string;
  priceCurrency?: string;
  price?: number;
}

const boatToListing = (boat: any, listing: any): SafeListing => {

    // console.log("OOOOYYYY:", boat, listing);
    // Ensure boat and listing are not undefined before mapping
    if (!boat || !listing) {
      console.error("boat or listing is undefined. Skipping this listing.");
    }
  
    return {
    id: listing.id,
    boatId: boat.id,
    title: listing.title,
    description: boat.description,
    imageSrc: boat.url,
    createdAt: listing.createdAt.toISOString(),
    price: boat.price,
    locationValue: `${boat.PhysicalLocation.city}, ${boat.PhysicalLocation.state}`,
    reservations: listing.reservations,
    user: listing.user,
    boat: boat,
    userId: listing.user.id,
    sellerId: listing.seller.id,
    location: { // Adding the location property
      id: boat.PhysicalLocation.id,
      country: boat.PhysicalLocation.country,
      state: boat.PhysicalLocation.state,
      city: boat.PhysicalLocation.city,
      zip: boat.PhysicalLocation.zip,
      address: boat.PhysicalLocation.address,
      longitude: boat.PhysicalLocation.longitude,
      latitude: boat.PhysicalLocation.latitude
    },
    seller: { 
      id: listing?.seller?.id,
      name: listing?.seller?.name,
      user: listing?.seller?.user,
      office: listing?.seller?.office,
      officeId: listing?.seller?.officeId,
      userId: listing?.seller?.userId
    }
  };
};

export default async function getListings(params: IBoatParams): Promise<SafeListing[]> {
  try {
    const listings = await prisma.listing.findMany({
      include: {
        boat: {
          include: {
            PhysicalLocation: true,
          },
        },
        seller: true,
        user: true  // <--- Include the user relationship here
      },
    });

    // Log the entire listings to inspect the returned data
    // console.log("Fetched listings:", JSON.stringify(listings, null, 2));

    return listings.map(listing => {
      const boat = listing.boat;
      if (!boat) {
        console.error("Boat is undefined for listing:", listing.id);
      }

      // Log listing and boat before converting to see if they have all the necessary properties
      console.log("Mapping listing:", listing.title);
      console.log("With boat:", boat.name);

      return boatToListing(boat, listing);
    }).filter(listing => listing !== null);
    
  } catch (error: any) {
    console.error("Error in getListings:", error); // Log the error here for clarity
    throw new Error(error);
  }
}
