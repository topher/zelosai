import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { SafeBoat, SafePhysicalLocation, SafeUser } from "../types";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const userWithFavorites = await prisma.user.findUnique({
      where: { id: currentUser.id },
      include: { favoriteIds: true },
    });

    if (!userWithFavorites) {
      throw new Error('User not found');
    }

    const favoriteListingIds = userWithFavorites.favoriteIds.map(fav => fav.listingId);

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: favoriteListingIds
        },
      },
    });

    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toString(),
    }));

    return favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toString(),
      user: {} as SafeUser, // Stubbed values
      boat: {} as SafeBoat,
      reservations: [],
      locationValue: '',
      location: {} as SafePhysicalLocation,
    }));
  } catch (error: any) {
    throw new Error(error);
  }
}
