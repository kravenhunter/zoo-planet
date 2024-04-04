<script setup lang="ts">
import { reactive, ref, useFetch, useRuntimeConfig, watchEffect } from "#imports";
import { useCurrentMemberTab, useTotalPrice } from "@/composables/states";
import {
  loadStripe,
  type Stripe,
  type StripeCardElement,
  type StripeElements,
} from "@stripe/stripe-js";

const runtimeCOnfig = useRuntimeConfig();
const currentTab = useCurrentMemberTab();
const totalPrice = useTotalPrice();
const stateData = reactive({
  name: "Daniel",
  email: "sdfwe4@43t4grf.com",
  adress: "Moskovia st.14, ap.5",
  city: "Moskov",
  country: "RU",
  zip: "123001",
  creditCard: "",
});
let stripe: Stripe | null;
const cardElement = ref<StripeCardElement>();
const clienSKey = ref<string | null>();
const loading = ref(true);

let elements: StripeElements;

const stripeInit = async () => {
  stripe = await loadStripe(runtimeCOnfig.public.stripePK);
  console.log(totalPrice.value);
  if (totalPrice.value) {
    const { data, error } = await useFetch<string>("/api/prisma/stripe/payment-test", {
      method: "POST",
      body: {
        amount: totalPrice.value * 100,
        currency: "usd",
      },
    });
    console.log(data.value);
    console.log(error.value);
    clienSKey.value = data.value;
    elements = stripe!.elements();
    const styleCard = {
      base: {
        fontSize: "16px",
      },
      invalid: {
        fontFamily: "Arial, sans-serif",
        color: "#EE4B2B",
        iconColor: "#EE4B2B",
      },
    };
    cardElement.value = elements.create("card", { hidePostalCode: true, style: styleCard });
    cardElement.value.mount("#payment-element");
    // cardElement.value.on("change", (event) => {
    //   const btn = document.querySelector("btn_pay") as HTMLButtonElement;
    //   btn.disabled = event.empty;
    // });
    loading.value = false;
  }
};
const payment = async () => {
  if (
    !stateData.name &&
    !stateData.email &&
    !stateData.adress &&
    !stateData.city &&
    !stateData.zip &&
    !stateData.creditCard
  ) {
    console.log("fill form correctly");
  }
  if (clienSKey.value && cardElement.value) {
    try {
      const result = await stripe?.confirmCardPayment(clienSKey.value, {
        payment_method: {
          card: cardElement.value,
          billing_details: {
            name: stateData.name,
            address: {
              city: stateData.city,
              line1: stateData.adress,
              state: stateData.city,
              postal_code: stateData.zip,
              country: stateData.country,
            },
          },
          metadata: {
            ticket: 1,
          },
        },
        shipping: {
          address: {
            city: stateData.city,
            line1: stateData.adress,
            state: stateData.city,
            postal_code: stateData.zip,
            country: stateData.country,
          },
          name: stateData.name,
        },
      });
      if (result?.error) {
        throw result?.error;
      }
      console.log("Payment Succeed");
      currentTab.value = "Confirmation";
    } catch (error) {
      console.log(error);
      loading.value = false;
    }
  }
};
// Используем метод в случае если перебрасываем юзера на страницу с оплатой
// так как в методе confirmPayment указан обязательный параметр return_url
// то в случае успеха пользователя перебросит на нужную страницу
const pay = async () => {
  if (
    !stateData.name &&
    !stateData.email &&
    !stateData.adress &&
    !stateData.city &&
    !stateData.zip &&
    !stateData.creditCard
  ) {
    console.log("fill form correctly");
  }
  try {
    const { data, error: errorPayment } = useFetch<string>("/api/prisma/stripe/payment", {
      method: "POST",
      body: {
        amount: totalPrice.value * 100,
        currency: "usd",
      },
    });
    const { error: submitError } = await elements.submit();

    const clientSecret = data.value;
    console.log(clientSecret);

    if (errorPayment.value) {
      throw errorPayment.value;
    }
    if (submitError) {
      throw submitError;
    }

    if (clientSecret) {
      console.log(clientSecret);

      const result = await stripe?.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          receipt_email: stateData.email,
          shipping: {
            address: {
              city: stateData.city,
              line1: stateData.adress,
              state: stateData.city,
              postal_code: stateData.zip,
              country: stateData.country,
            },
            name: stateData.name,
          },
          return_url: `${runtimeCOnfig.public.app_url}/success`,
        },
      });

      console.log(result?.error);
      loading.value = false;
      if (result?.error.type === "card_error" || result?.error.type === "validation_error") {
        throw result.error;
      }
      console.log("Payment Succeed");
      currentTab.value = "Payment";
    }
  } catch (error) {
    console.log(error);
    loading.value = false;
  }
};

const stripeInitialize = async () => {
  stripe = await loadStripe(runtimeCOnfig.public.stripePK);
  elements = stripe!.elements({
    mode: "payment",
    amount: 1999,
    currency: "usd",
  });
  const paymentElement = elements.create("payment");
  paymentElement.mount("#payment-element");
  loading.value = false;
};

watchEffect(async () => {
  if (totalPrice.value) {
    await stripeInit();
  }
});
</script>

<template>
  <v-sheet class="bg-orange-lighten-5 pa-5 mb-5">
    <v-list-item prepend-icon="mdi-account" class="text-green-darken-4 pb-0">
      <template #prepend>
        <v-icon title=">mdi-credit-card-check" size="25" class="text-h6 font-weight-bold"
          >mdi-credit-card-check</v-icon
        >
        <v-list-item-title class="px-2 text-subtitle-2 font-weight-bold">
          Credit Card
        </v-list-item-title>
      </template>
    </v-list-item>
    <v-card-text
      >Used for all communication with Zoos Victoria. This is your main contact for your household.
      You may change the primary member by clicking the icon next to another members' info.
    </v-card-text>
    <v-divider class="my-5" :thickness="2"></v-divider>
    <v-row>
      <v-col cols="6" class="mx-auto">
        <form class="form_data">
          <v-text-field v-model="stateData.name" label="First name"></v-text-field>
          <v-text-field v-model="stateData.email" label="Email"></v-text-field>
          <v-text-field v-model="stateData.adress" label="Adress"></v-text-field>
          <v-text-field v-model="stateData.city" label="City"></v-text-field>
          <v-text-field v-model="stateData.country" label="Country"></v-text-field>
          <v-text-field v-model="stateData.zip" label="Zip"></v-text-field>

          <div class="credit_card py-6">
            <v-card-text class="pb-3">Credit Card</v-card-text>

            <div id="payment-element" class="bg-white pa-5"></div>
          </div>
          <v-card-actions>
            <v-btn
              title="Pay"
              class="mx-auto px-10 text-subtitle-1 text-white"
              color="#395A03"
              variant="flat"
              size="x-large"
              @click="payment">
              Pay ${{ totalPrice }}
              <v-icon :size="30" color="#ffc107" class="ml-3 mb-1">mdi-paw</v-icon>
            </v-btn>
          </v-card-actions>
        </form>
      </v-col>
    </v-row>
  </v-sheet>
</template>
