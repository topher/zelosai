// import prismadb from "@/lib/prismadb"; // Comment out or remove this line
// import { stripe } from "@/lib/stripe"; // Comment out or remove this line
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = 'force-dynamic';

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Comment out or remove the Prisma-related code
    // const userSubscription = await prismadb.userSubscription.findUnique({
    //   where: {
    //     userId
    //   }
    // });

    // Comment out or remove the Stripe-related code
    // if (userSubscription && userSubscription.stripeCustomerId) {
    //   const stripeSession = await stripe.billingPortal.sessions.create({
    //     customer: userSubscription.stripeCustomerId,
    //     return_url: settingsUrl,
    //   });

    //   return NextResponse.json({ url: stripeSession.url });
    // }

    // const stripeSession = await stripe.checkout.sessions.create({
    //   success_url: settingsUrl,
    //   cancel_url: settingsUrl,
    //   payment_method_types: ["card"],
    //   mode: "subscription",
    //   billing_address_collection: "auto",
    //   customer_email: user.emailAddresses[0].emailAddress,
    //   line_items: [
    //     {
    //       price_data: {
    //         currency: "USD",
    //         product_data: {
    //           name: "Zelos Pro",
    //           description: "Unlimited AI Generations"
    //         },
    //         unit_amount: 2000,
    //         recurring: {
    //           interval: "month"
    //         }
    //       },
    //       quantity: 1,
    //     },
    //   ],
    //   metadata: {
    //     userId,
    //   }
    // });

    // return NextResponse.json({ url: stripeSession.url });

    // Temporarily return a dummy response
    return NextResponse.json({ message: "Stripe and Prisma integrations are disabled." });
  } catch (error) {
    console.log("[ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
