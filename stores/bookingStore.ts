import { ref } from "#imports";
import {
  createTablesData,
  deleteDataById,
  loadData,
  updateTablesData,
} from "@/composables/genericCrudFunctions";
import type { MembershipPrice, TicketPrice } from "@prisma/client";
import { defineStore } from "pinia";
import type { IMembershipPrice } from "types/IMembershipPrice";
import type { ITicketPrice } from "types/ITicketPrice";

export const useBookingStore = defineStore("booking-store", () => {
  const membershipTable = ref<MembershipPrice[] | null>();
  const ticketTable = ref<TicketPrice[] | null>();
  const loadingMemberPrices = ref<boolean>(false);

  async function loadTables() {
    const ticketResult = loadData<TicketPrice>("ticket", "list");
    const memberResult = loadData<MembershipPrice>("membership", "list");
    const promiseAll = await Promise.all([ticketResult, memberResult]);

    ticketTable.value = promiseAll[0];
    membershipTable.value = promiseAll[1];
  }

  const addTicketPrices = async (singleEnty: ITicketPrice, unlimitedEntry: ITicketPrice) => {
    const resultSingle = createTablesData<ITicketPrice>(
      "ticket",
      "create-ticket-prices",
      singleEnty,
    );
    const resultUnlimit = createTablesData<ITicketPrice>(
      "ticket",
      "create-ticket-prices",
      unlimitedEntry,
    );
    const promiseAll = await Promise.all([resultSingle, resultUnlimit]);
    const singleData = promiseAll[0];
    const unlimitedData = promiseAll[1];

    if (singleData && unlimitedData) {
      ticketTable.value = [];
      ticketTable.value.push({ ...(singleData as TicketPrice) });
      ticketTable.value.push({ ...(unlimitedData as TicketPrice) });

      return "Success";
    }

    return "Error";
  };

  const addMembershipPreces = async (stateMonth: IMembershipPrice, stateYaer: IMembershipPrice) => {
    const resultMonth = createTablesData<IMembershipPrice>(
      "membership",
      "create-member-prices",
      stateMonth,
    );
    const resultYaer = createTablesData<IMembershipPrice>(
      "membership",
      "create-member-prices",
      stateYaer,
    );
    const promiseAll = await Promise.all([resultMonth, resultYaer]);
    const monthData = promiseAll[0];
    const yaerdData = promiseAll[1];

    if (monthData && yaerdData) {
      membershipTable.value = [];
      membershipTable.value.push({ ...(monthData as MembershipPrice) });
      membershipTable.value.push({ ...(yaerdData as MembershipPrice) });

      return "Success";
    }

    return "Error";
  };

  const updateMemberShipPrices = async (
    idMonth: string,
    idYarth: string,
    stateMonth: IMembershipPrice,
    stateYaer: IMembershipPrice,
  ) => {
    if (idMonth && idYarth) {
      const resultMonth = updateTablesData<IMembershipPrice>(
        idMonth,
        "membership",
        "update-member-prices",
        stateMonth,
      );
      const resultYaer = updateTablesData<IMembershipPrice>(
        idYarth,
        "membership",
        "update-member-prices",
        stateYaer,
      );
      const promiseAll = await Promise.all([resultMonth, resultYaer]);
      const monthData = promiseAll[0];
      const yaerdData = promiseAll[1];

      if (monthData && yaerdData) {
        membershipTable.value = [];
        membershipTable.value.push({ ...(monthData as MembershipPrice) });
        membershipTable.value.push({ ...(yaerdData as MembershipPrice) });

        return "Success";
      }
    }

    return "Error";
  };
  const updateTicketPrices = async (
    singleId: string,
    unlimitId: string,
    singleEnty: ITicketPrice,
    unlimitedEntry: ITicketPrice,
  ) => {
    if (singleId && unlimitId) {
      const resultSingle = updateTablesData<ITicketPrice>(
        singleId,
        "ticket",
        "update-ticket-prices",
        singleEnty,
      );
      const resultUnlimit = updateTablesData<ITicketPrice>(
        unlimitId,
        "ticket",
        "update-ticket-prices",
        unlimitedEntry,
      );
      const promiseAll = await Promise.all([resultSingle, resultUnlimit]);
      const singleData = promiseAll[0];
      const unlimitData = promiseAll[1];

      if (singleData && unlimitData) {
        ticketTable.value = [];
        ticketTable.value.push({ ...(singleData as TicketPrice) });
        ticketTable.value.push({ ...(unlimitData as TicketPrice) });

        return "Success";
      }
    }

    return "Error";
  };

  const deleteByTicketTableId = async (idPage: string) => {
    if (idPage) {
      const result = await deleteDataById(idPage, "ticket", "delete-by-id");
      return result;
    }
    return "Error";
  };
  const deleteByMemberTableId = async (idPage: string) => {
    if (idPage) {
      const result = await deleteDataById(idPage, "membership", "delete-by-id");
      return result;
    }
    return "Error";
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
    deleteByTicketTableId,
    deleteByMemberTableId,
  };
});

// export const useBookingStore = defineStore("booking-store", () => {
//   const membershipTable = ref<MembershipPrice[] | null>();
//   const ticketTable = ref<TicketPrice[] | null>();
//   const loadingMemberPrices = ref<boolean>(false);

//   async function loadTables() {
//     try {
//       const resutlTicketable = useFetch<TicketPrice[]>(`/api/prisma/ticket/list`);
//       const resutlMemberTable = useFetch<MembershipPrice[]>(`/api/prisma/membership/list`);
//       const promiseAll = await Promise.all([resutlTicketable, resutlMemberTable]);

//       const { data: ticketResponce, error: errorTicket } = promiseAll[0];
//       const { data: memberResponce, error: errorMember } = promiseAll[1];

//       membershipTable.value = memberResponce.value;
//       ticketTable.value = ticketResponce.value;

//       console.log(errorTicket.value);
//       console.log(errorMember.value);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   const addTicketPrices = async (singleEnty: ITicketPrice, unlimitedEntry: ITicketPrice) => {
//     try {
//       const respoonseSinglePrice = await useFetch<string>(
//         `/api/prisma/membership/create-ticket-prices`,
//         {
//           method: "post",
//           body: JSON.stringify(singleEnty),
//         },
//       );
//       const respoonseUnlimitedPrices = useFetch<string>(
//         `/api/prisma/membership/create-ticket-prices`,
//         {
//           method: "post",
//           body: JSON.stringify(unlimitedEntry),
//         },
//       );
//       const promiseAll = await Promise.all([respoonseSinglePrice, respoonseUnlimitedPrices]);
//       console.log(promiseAll);

//       const { data: singleEntry, error: errorMonth } = promiseAll[0];
//       const { data: unlimited, error: errorYar } = promiseAll[1];

//       console.log(singleEntry.value);
//       console.log(unlimited.value);

//       console.log(errorMonth.value);
//       console.log(errorYar.value);
//       return singleEntry.value;
//     } catch (error) {
//       console.log(error);

//       return "Error";
//     }
//   };
//   const addMembershipPreces = async (stateMonth: IMembershipPrice, stateYaer: IMembershipPrice) => {
//     try {
//       const responseMonth = useFetch<string>("/api/prisma/membership/create-member-prices", {
//         method: "post",
//         body: JSON.stringify(stateMonth),
//       });
//       const responeYar = useFetch<string>("/api/prisma/membership/create-member-prices", {
//         method: "post",
//         body: JSON.stringify(stateYaer),
//       });
//       const promiseAll = await Promise.all([responseMonth, responeYar]);
//       console.log(promiseAll);
//       const { data: respoonseMonth, error: errorMonth } = promiseAll[0];
//       const { data: respoonseYar, error: errorYar } = promiseAll[1];

//       console.log(errorMonth.value);
//       console.log(errorYar.value);

//       return respoonseMonth.value;
//     } catch (error) {
//       console.log(error);

//       return "Error";
//     }
//   };

//   const updateMemberShipPrices = async (
//     idMonth: string,
//     idYarth: string,
//     stateMonth: IMembershipPrice,
//     stateYaer: IMembershipPrice,
//   ) => {
//     try {
//       const responseMonth = useFetch<string>(
//         `/api/prisma/membership/update-member-prices/${idMonth}`,
//         {
//           method: "post",
//           body: JSON.stringify(stateMonth),
//         },
//       );
//       const responeYar = useFetch<string>(
//         `/api/prisma/membership/update-member-prices/${idYarth}`,
//         {
//           method: "post",
//           body: JSON.stringify(stateYaer),
//         },
//       );
//       const promiseAll = await Promise.all([responseMonth, responeYar]);
//       console.log(promiseAll);

//       const { data: respoonseMonth, error: errorMonth } = promiseAll[0];

//       const { data: respoonseYar, error: errorYar } = promiseAll[1];

//       // console.log(respoonseMonth.value);
//       // console.log(respoonseYar.value);

//       // console.log(errorMonth.value);
//       // console.log(errorYar.value);
//       return respoonseMonth.value;
//     } catch (error) {
//       console.log(error);

//       return "Error";
//     }
//   };
//   const updateTicketPrices = async (
//     singleId: string,
//     unlimitId: string,
//     singleEnty: ITicketPrice,
//     unlimitedEntry: ITicketPrice,
//   ) => {
//     try {
//       const respoonseSinglePrice = useFetch<string>(
//         `/api/prisma/membership/update-ticket-prices/${singleId}`,
//         {
//           method: "post",
//           body: JSON.stringify(singleEnty),
//         },
//       );
//       const respoonseUnlimitedPrices = useFetch<string>(
//         `/api/prisma/membership/update-ticket-prices/${unlimitId}`,
//         {
//           method: "post",
//           body: JSON.stringify(unlimitedEntry),
//         },
//       );
//       const promiseAll = await Promise.all([respoonseSinglePrice, respoonseUnlimitedPrices]);
//       console.log(promiseAll);

//       const { data: singleEntry, error: errorMonth } = promiseAll[0];
//       const { data: unlimited, error: errorYar } = promiseAll[1];

//       // console.log(singleEntry.value);
//       // console.log(unlimited.value);

//       // console.log(errorMonth.value);
//       // console.log(errorYar.value);
//       return singleEntry.value;
//     } catch (error) {
//       console.log(error);

//       return "Error";
//     }
//   };

//   return {
//     membershipTable,
//     ticketTable,
//     loadingMemberPrices,
//     loadTables,
//     updateTicketPrices,
//     updateMemberShipPrices,
//     addMembershipPreces,
//     addTicketPrices,
//   };
// });
