import { ref, useFetch } from "#imports";
import type { MembershipPrice, TicketPrice } from "@prisma/client";
import { defineStore } from "pinia";
import type { IMembershipPrice } from "types/IMembershipPrice";
import type { ITicketPrice } from "types/ITicketPrice";

export const useBookingStore = defineStore("booking-store", () => {
  const membershipTable = ref<MembershipPrice[]>();
  const ticketTable = ref<TicketPrice[]>();
  const loadingMemberPrices = ref<boolean>(false);

  async function loadTables() {
    try {
      const resutlTicketable = useFetch<TicketPrice[]>(`/api/prisma/ticket/list`);
      const resutlMemberTable = useFetch<MembershipPrice[]>(`/api/prisma/membership/list`);
      const promiseAll = await Promise.all<TicketPrice[], MembershipPrice[]>([
        resutlTicketable,
        resutlMemberTable,
      ]);

      const { data: ticketResponce, error: errorTicket } = promiseAll[0];
      const { data: memberResponce, error: errorMember } = promiseAll[1];

      membershipTable.value = memberResponce.value;
      ticketTable.value = ticketResponce.value;

      console.log(errorTicket.value);
      console.log(errorMember.value);
    } catch (error) {
      console.log(error);
    }
  }

  const addTicketPrices = async (singleEnty: ITicketPrice, unlimitedEntry: ITicketPrice) => {
    try {
      const respoonseSinglePrice = await useFetch<string>(
        `/api/prisma/membership/create-ticket-prices`,
        {
          method: "post",
          body: JSON.stringify(singleEnty),
        },
      );
      const respoonseUnlimitedPrices = useFetch<string>(
        `/api/prisma/membership/create-ticket-prices`,
        {
          method: "post",
          body: JSON.stringify(unlimitedEntry),
        },
      );
      const promiseAll = await Promise.all<string>([
        respoonseSinglePrice,
        respoonseUnlimitedPrices,
      ]);
      console.log(promiseAll);

      const { data: singleEntry, error: errorMonth } = promiseAll[0];
      const { data: unlimited, error: errorYar } = promiseAll[1];

      console.log(singleEntry.value);
      console.log(unlimited.value);

      console.log(errorMonth.value);
      console.log(errorYar.value);
      return singleEntry.value;
    } catch (error) {
      console.log(error);

      return "Error";
    }
  };
  const addMembershipPreces = async (stateMonth: IMembershipPrice, stateYaer: IMembershipPrice) => {
    try {
      const responseMonth = useFetch<string>("/api/prisma/membership/create-member-prices", {
        method: "post",
        body: JSON.stringify(stateMonth),
      });
      const responeYar = useFetch<string>("/api/prisma/membership/create-member-prices", {
        method: "post",
        body: JSON.stringify(stateYaer),
      });
      const promiseAll = await Promise.all<string>([responseMonth, responeYar]);
      console.log(promiseAll);
      const { data: respoonseMonth, error: errorMonth } = promiseAll[0];
      const { data: respoonseYar, error: errorYar } = promiseAll[1];

      console.log(errorMonth.value);
      console.log(errorYar.value);

      return respoonseMonth.value;
    } catch (error) {
      console.log(error);

      return "Error";
    }
  };

  const updateMemberShipPrices = async (
    idMonth: string,
    idYarth: string,
    stateMonth: IMembershipPrice,
    stateYaer: IMembershipPrice,
  ) => {
    try {
      const responseMonth = useFetch<string>(
        `/api/prisma/membership/update-member-prices/${idMonth}`,
        {
          method: "post",
          body: JSON.stringify(stateMonth),
        },
      );
      const responeYar = useFetch<string>(
        `/api/prisma/membership/update-member-prices/${idYarth}`,
        {
          method: "post",
          body: JSON.stringify(stateYaer),
        },
      );
      const promiseAll = await Promise.all<string>([responseMonth, responeYar]);
      console.log(promiseAll);

      const { data: respoonseMonth, error: errorMonth } = promiseAll[0];

      const { data: respoonseYar, error: errorYar } = promiseAll[1];

      // console.log(respoonseMonth.value);
      // console.log(respoonseYar.value);

      // console.log(errorMonth.value);
      // console.log(errorYar.value);
      return respoonseMonth.value;
    } catch (error) {
      console.log(error);

      return "Error";
    }
  };
  const updateTicketPrices = async (
    singleId: string,
    unlimitId: string,
    singleEnty: ITicketPrice,
    unlimitedEntry: ITicketPrice,
  ) => {
    try {
      const respoonseSinglePrice = useFetch<string>(
        `/api/prisma/membership/update-ticket-prices/${singleId}`,
        {
          method: "post",
          body: JSON.stringify(singleEnty),
        },
      );
      const respoonseUnlimitedPrices = useFetch<string>(
        `/api/prisma/membership/update-ticket-prices/${unlimitId}`,
        {
          method: "post",
          body: JSON.stringify(unlimitedEntry),
        },
      );
      const promiseAll = await Promise.all<string>([
        respoonseSinglePrice,
        respoonseUnlimitedPrices,
      ]);
      console.log(promiseAll);

      const { data: singleEntry, error: errorMonth } = promiseAll[0];
      const { data: unlimited, error: errorYar } = promiseAll[1];

      // console.log(singleEntry.value);
      // console.log(unlimited.value);

      // console.log(errorMonth.value);
      // console.log(errorYar.value);
      return singleEntry.value;
    } catch (error) {
      console.log(error);

      return "Error";
    }
  };

  return {
    membershipTable,
    ticketTable,
    loadingMemberPrices,
    loadTables,
    updateTicketPrices,
    updateMemberShipPrices,
    addMembershipPreces,
    addTicketPrices,
  };
});
