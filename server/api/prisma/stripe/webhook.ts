import { defineEventHandler, readRawBody, useRuntimeConfig } from "#imports";
import Stripe from "stripe";

//WebHook - this endpoin will capture data soon as payment goes through

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();

  //process.env.STRIPE_SK_KEY!
  const stripe = new Stripe(runtimeConfig.private.stripeSK, {
    apiVersion: "2023-08-16",
  });

  const headers = event.node.req.headers;
  const body = await readRawBody(event);
  const sig = headers["stripe-signature"];
  let hookEvent: Stripe.Event;
  try {
    hookEvent = stripe.webhooks.constructEvent(
      body as string,
      sig as string,
      runtimeConfig.private.endpoinSK as string,
    );
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: (error as Error).message,
    });
  }

  switch (hookEvent.type) {
    case "payment_intent.created":
      console.log("payment_intent.created");
      break;
    case "payment_intent.succeeded":
      console.log("payment_intent.succeeded", hookEvent.data.object);
      break;
    case "charge.succeeded":
      console.log("charge.succeeded", (hookEvent.data.object as Stripe.Charge).created);
      break;
    default:
      console.log("Unhandled event type");
  }
});
