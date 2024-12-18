import prisma from "@/app/libs/prismadb";

interface IParams {
  id?: string;
}

export default async function getAthleteById(params: IParams) {
  try {
    const { id } = params;

    console.log("iddddddd", id)

    const athlete = await prisma.athlete.findUnique({
      where: {
        id: id,
      },
      // include: {
      //   endorsements: true,
      //   content: true,
      // },
    });

    if (!athlete) {
      console.log("Athlete not found", params);
      return null;
    }

    console.log("Athlete 🍋", athlete);

    return athlete;
  } catch (error: any) {
    throw new Error(error);
  }
}
