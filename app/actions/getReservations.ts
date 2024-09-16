import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations(
  params: IParams
) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};
        
    if (listingId) {
      query.listingId = listingId;
    };

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    console.log("🚀",query);

    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: {
          include: {
            user: true,
            boat: true,
            reservations: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeReservations = reservations.map(
      (reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
        user: {
          ...reservation.listing.user,
          createdAt: reservation.listing.user.createdAt.toString(),
          updatedAt: reservation.listing.user.updatedAt.toString(),
          emailVerified: 
            reservation.listing.user.emailVerified?.toString() || null,
        },
        boat: {
          ...reservation.listing.boat
        },
        reservations: reservation.listing.reservations.map(res => ({
          ...res,
          createdAt: res.createdAt.toString(),
        }))
      }
    }));

    return safeReservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
