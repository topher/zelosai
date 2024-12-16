import prisma from "@/app/libs/prismadb";
import { SafeReservation } from '@/app/types'

export async function getListingsReservedByUser(userId: string) {

    try {
    const reservations = await prisma.reservation.findMany({
        where: {
            userId: userId,
            listing: {
            isNot: null,
            },
        },
        include: {
            listing: {
              include: {
                  user: true,
                  boat: {
                    include: {
                      images: true,
                      PhysicalLocation: true
                    }
                  },
                  reservations: true,
                  seller: {
                    include: {
                      office: {
                        include: {
                          physicalLocation: true
                        }
                      },
                      user: true
                    }
                  },
              },
            },
        },
        orderBy: {
            createdAt: 'desc',
        },
        });
          

    //   console.log("🚀 wow ",reservations);
  
    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      // totalPrice: reservation.totalPrice,
      // original: reservation.original,
      message: reservation.message,
      user: {
        ...reservation.listing.user,
        createdAt: reservation.listing.user.createdAt.toString(),
        updatedAt: reservation.listing.user.updatedAt.toString(),
        emailVerified: reservation.listing.user.emailVerified?.toString() || null,
      },
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
          ...reservation.listing.boat,
          images: {
            ...reservation.listing.boat.images,
          },
          PhysicalLocation: {
            ...reservation.listing.boat.PhysicalLocation,
          }
        },
        seller: {
          ...reservation.listing.seller
        },
        reservations: reservation.listing.reservations.map((res) => ({
          ...res,
          createdAt: res.createdAt.toString(),
        })) as SafeReservation[],
      },
    }))as SafeReservation[];
    
      return safeReservations;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  