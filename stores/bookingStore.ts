import { ref, useFetch } from "#imports";
import type { MembershipPrice, TicketPrice } from "@prisma/client";
import { defineStore } from "pinia";
import type { IMembershipPrice } from "types/IMembershipPrice";
import type { ITicketPrice } from "types/ITicketPrice";

export const useBookingStore = defineStore("booking-store", () => {
  const membershipTable = ref<MembershipPrice[]>();
  const ticketTable = ref<TicketPrice[]>();
  const loadingMemberPrices = ref<boolean>(false);
  // const loadTables = async () => {
  //   await loadTicketTable();
  //   await loadMemberShipTable();
  // };

  async function loadTables() {
    try {
      const resutlTicketable = useFetch(`/api/prisma/ticket/list`);
      const resutlMemberTable = useFetch(`/api/prisma/membership/list`);
      const promiseAll = await Promise.all([resutlTicketable, resutlMemberTable]);

      const { data: ticketResponce, error: errorTicket } = promiseAll[0];
      const { data: memberResponce, error: errorMember } = promiseAll[1];
      membershipTable.value = memberResponce.value as MembershipPrice[];
      ticketTable.value = ticketResponce.value as TicketPrice[];
      console.log(errorTicket.value);
      console.log(errorMember.value);
    } catch (error) {
      console.log(error);
    }
  }
  async function loadTicketTable() {
    try {
      const { data: response, error, refresh } = await useFetch("/api/prisma/ticket/list");
      // throw new Error("");
      if (error.value) {
        throw error.value;
      }

      console.log(response);
      ticketTable.value = response.value as TicketPrice[];
    } catch (error) {
      console.log(error);
    }
  }

  async function loadMemberShipTable() {
    try {
      const { data: response, error, refresh } = await useFetch(`/api/prisma/membership/list`);
      if (error) {
        throw error;
      }

      console.log(response);
      membershipTable.value = response.value as MembershipPrice[];
    } catch (error) {
      console.log(error);
    }
  }

  const addTicketPrices = async (singleEnty: ITicketPrice, unlimitedEntry: ITicketPrice) => {
    try {
      const respoonseSinglePrice = await useFetch(`/api/prisma/membership/create-ticket-prices`, {
        method: "post",
        body: JSON.stringify(singleEnty),
      });
      const respoonseUnlimitedPrices = useFetch(`/api/prisma/membership/create-ticket-prices`, {
        method: "post",
        body: JSON.stringify(unlimitedEntry),
      });
      const promiseAll = await Promise.all([respoonseSinglePrice, respoonseUnlimitedPrices]);
      console.log(promiseAll);

      const { data: singleEntry, error: errorMonth } = promiseAll[0];
      const { data: unlimited, error: errorYar } = promiseAll[1];
      setTimeout(() => {
        loadingMemberPrices.value = !loadingMemberPrices.value;
      }, 3000);

      console.log(singleEntry.value);
      console.log(unlimited.value);

      console.log(errorMonth.value);
      console.log(errorYar.value);
    } catch (error) {
      console.log(error);
    }
  };
  const addMembershipPreces = async (stateMonth: IMembershipPrice, stateYaer: IMembershipPrice) => {
    try {
      const responseMonth = useFetch("/api/prisma/membership/create-member-prices", {
        method: "post",
        body: JSON.stringify(stateMonth),
      });
      const responeYar = useFetch("/api/prisma/membership/create-member-prices", {
        method: "post",
        body: JSON.stringify(stateYaer),
      });
      const promiseAll = await Promise.all([responseMonth, responeYar]);
      console.log(promiseAll);
      const { data: respoonseMonth, error: errorMonth } = promiseAll[0];
      const { data: respoonseYar, error: errorYar } = promiseAll[1];

      setTimeout(() => {
        loadingMemberPrices.value = !loadingMemberPrices.value;
      }, 3000);

      console.log(errorMonth.value);
      console.log(errorYar.value);
    } catch (error) {
      console.log(error);
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
      const promiseAll = await Promise.all([responseMonth, responeYar]);
      console.log(promiseAll);

      const { data: respoonseMonth, error: errorMonth } = promiseAll[0];

      const { data: respoonseYar, error: errorYar } = promiseAll[1];
      setTimeout(() => {
        loadingMemberPrices.value = !loadingMemberPrices.value;
      }, 3000);

      console.log(respoonseMonth.value);
      console.log(respoonseYar.value);

      console.log(errorMonth.value);
      console.log(errorYar.value);
      return respoonseMonth.value;
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        loadingMemberPrices.value = !loadingMemberPrices.value;
      }, 3000);
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
      const promiseAll = await Promise.all([respoonseSinglePrice, respoonseUnlimitedPrices]);
      console.log(promiseAll);

      const { data: singleEntry, error: errorMonth } = promiseAll[0];
      const { data: unlimited, error: errorYar } = promiseAll[1];
      setTimeout(() => {
        loadingMemberPrices.value = !loadingMemberPrices.value;
      }, 3000);

      console.log(singleEntry.value);
      console.log(unlimited.value);

      console.log(errorMonth.value);
      console.log(errorYar.value);
      return singleEntry.value;
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        loadingMemberPrices.value = !loadingMemberPrices.value;
      }, 3000);
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
