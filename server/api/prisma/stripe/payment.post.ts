import { defineEventHandler, readBody, useRuntimeConfig } from "#imports";
import Stripe from "stripe";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const { amount, currency } = await readBody(event);
  //process.env.STRIPE_SK_KEY!
  const stripe = new Stripe(runtimeConfig.private.stripeSK, {
    apiVersion: "2023-08-16",
  });

  try {
    console.log(amount);
    console.log(currency);
    const payment = await stripe.paymentIntents.create({
      amount: Number(amount),
      currency: String(currency), //  currency: "usd",
      metadata: { infoOnCustomer: "Daniel Kraven" },
      automatic_payment_methods: { enabled: true },
    });

    console.log(payment);

    return payment.client_secret;
  } catch (error) {
    console.log(error);
    throw createError({
      statusCode: 500,
      statusMessage: (error as Error).message,
    });
  }
});
