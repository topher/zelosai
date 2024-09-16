import prisma from "@/app/libs/prismadb";
import { SafeListing } from '@/app/types'

interface IParams {
  listingId?: string;
}

export default async function getListingById(params: IParams) {
  try {
    const { listingId } = params;

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
        seller: {
          include: {
            office: {
              include: {
                physicalLocation: true,
              },
            },
            user: true,
          },
        },
        boat: {
          include: {
            manufacturer: true,
            boatModel: true,
            images: true,
            PhysicalLocation: true,
          },
        },
      },
    });

    if (!listing) {
      console.log("Listing not found", params);
      return null;
    }

    console.log("Listing 🍋", listing);

    const transformedListing: SafeListing = {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt ? listing.user.createdAt.toISOString() : '',
        updatedAt: listing.user.updatedAt ? listing.user.updatedAt.toISOString() : '',
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      },
      seller: {
            ...listing.seller,
            id: listing.seller.id,
            userId: listing.seller.userId || '', 
            name: listing.seller.name,
            user: {
              ...listing.seller.user,
              createdAt: listing.seller.user.createdAt?.toISOString() || null,
              updatedAt: listing.seller.user.updatedAt?.toISOString() || null,
              emailVerified: listing.seller.user.emailVerified?.toISOString() || null,
            },
            officeId: listing.seller.officeId || '',
            office: {
              id: listing.seller.office.id,
              name: listing.seller.office.name,
              physicalLocationId: listing.seller.office.physicalLocationId,
              physicalLocation: {
                ...listing.seller.office.physicalLocation,
              },
            },
          },
      boat: {
        ...listing.boat,
        PhysicalLocation: {
          ...listing.boat.PhysicalLocation,
        },
        images: listing.boat.images || null,
        location: listing.boat.location || null,
        category: listing.boat.category || null,
        fuelType: listing.boat.fuelType || null,
        boatClass: listing.boat.boatClass || null,
        boatNumber: listing.boat.boatNumber || null,
        boatMake: listing.boat.boatMake || null,
        hullMaterial: listing.boat.hullMaterial || null,
        dimensions: listing.boat.dimensions || null,
        loa: listing.boat.loa || null,
        beam: listing.boat.beam || null,
        minDraft: listing.boat.minDraft || null,
        fuelTanks: listing.boat.fuelTanks || null,
        cruisingSpeed: listing.boat.cruisingSpeed || null,
        maxSpeed: listing.boat.maxSpeed || null,
        engines: listing.boat.engines || null,
        itemCondition: listing.boat.itemCondition || null,
        productID: listing.boat.productID || null,
        additionalProperties: listing.boat.additionalProperties || null,
        modelId: listing.boat.modelId || null,
        manufacturerId: listing.boat.manufacturerId || null,
        productionDate: listing.boat.productionDate || null,
        physicalLocationId: listing.boat.physicalLocationId || null,
        manufacturer: listing.boat.manufacturer || null,
        boatModel: listing.boat.boatModel || null,
      },
    };

    console.log("Listing 🍋🍋", transformedListing);

    return transformedListing;
  } catch (error: any) {
    throw new Error(error);
  }
}
