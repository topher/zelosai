// "use client";
// import { revalidatePath } from "next/cache";
// import { ACTION, ENTITY_TYPE } from "@/app/types";
// import { SolidProfileShapeShapeType } from '@/lib/.ldo/solidProfile.shapeTypes';

// import { demoData } from "@/app/data";
// import { CreateAuditLog } from "@/lib/create-audit-log";


// import { StripeRedirect } from "./schema";
// import { InputType, ReturnType } from "./types";

// import { absoluteUrl } from "@/lib/utils";
// import { stripe } from "@/lib/stripe";
// import { useLdo, useSolidAuth } from "@ldo/solid-react";

// const Handler = async (data: InputType): Promise<ReturnType> => {
//   // Extract RDF data
//   const { session } = useSolidAuth();
//   const { getSubject } = useLdo();
//   const userId = session.webId;
//   const { selectedOrg } = useSelectedOrganizationContext(); // Access orgId from context
//   const orgId = selectedOrg?.id

//   if (!userId || !orgId) {
//     return {
//       error: "Unauthorized",
//     };
//   }

//   const user = getSubject(SolidProfileShapeShapeType, userId)
//   const settingsUrl = absoluteUrl(`/organization/${orgId}`);

//   let url = "";

//   try {
//     const orgSubscription = await db.orgSubscription.findUnique({
//       where: {
//         orgId,
//       }
//     });

//     if (orgSubscription && orgSubscription.stripeCustomerId) {
//       const stripeSession = await stripe.billingPortal.sessions.create({
//         customer: orgSubscription.stripeCustomerId,
//         return_url: settingsUrl,
//       });

//       url = stripeSession.url;
//     } else {
//       const stripeSession = await stripe.checkout.sessions.create({
//         success_url: settingsUrl,
//         cancel_url: settingsUrl,
//         payment_method_types: ["card"],
//         mode: "subscription",
//         billing_address_collection: "auto",
//         customer_email: user.hasEmail?.[0]?.["@id"],
//         line_items: [
//           {
//             price_data: {
//               currency: "USD",
//               product_data: {
//                 name: "Seiri Pro",
//                 description: "Unlimited boards for your organization"
//               },
//               unit_amount: 2000,
//               recurring: {
//                 interval: "month"
//               },
//             },
//             quantity: 1,
//           },
//         ],
//         metadata: {
//           orgId,
//         },
//       });

//       url = stripeSession.url || "";
//     }
//   } catch {
//     return {
//       error: "Something went wrong!"
//     }
//   };

//   revalidatePath(`/organization/${orgId}`);
//   return { data: url };
// };

// // export const stripeRedirect = createSafeAction(StripeRedirect, Handler);
