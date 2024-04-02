import { assertMethod, createError, defineEventHandler } from "#imports";
import type { H3Error } from "h3";
interface IProps {
  table: string;
  title?: string;
}
export default defineEventHandler(async (event) => {
  assertMethod(event, ["GET", "POST"]);
  // const { table, title } = await readBody<IProps>(event);

  // const body = await readBody(event);

  const table = event?.context?.params?.id;
  if (table) {
    try {
      switch (table) {
        case "post":
          const postItemList = await event.context.prisma.post.findMany({
            orderBy: { timeStamp: "desc" },
          });

          return {
            statusCode: 200,
            statusMessage: "Success",
            table: "post",
            method: "list",
            objectResult: postItemList,
          };
        case "plan":
          const planPriceList = await event.context.prisma.planPrice.findMany({
            orderBy: { timeStamp: "desc" },
          });

          return {
            statusCode: 200,
            statusMessage: "Success",
            table: "plan-price",
            method: "list",
            objectResult: planPriceList,
          };
        case "specie":
          const specieList = await event.context.prisma.specie.findMany({
            orderBy: { timeStamp: "desc" },
          });
          return {
            statusCode: 200,
            statusMessage: "Success",
            table: "specie",
            method: "list",
            objectResult: specieList,
          };
        case "main-content-pages":
          const contentPageList = await event.context.prisma.contentPages.findMany();
          return {
            statusCode: 200,
            statusMessage: "Success",
            table: "main-content-pages",
            method: "list",
            objectResult: contentPageList,
          };
        case "contacts":
          const contactUs = await event.context.prisma.contactUs.findFirst();
          return {
            statusCode: 200,
            statusMessage: "Success",
            table: "contacts",
            method: "list",
            objectResult: contactUs,
          };
        case "membership-price":
          const membershipPriceList = await event.context.prisma.membershipPrice.findMany({
            orderBy: { timeStamp: "desc" },
          });
          return {
            statusCode: 200,
            statusMessage: "Success",
            table: "membership-price",
            method: "list",
            objectResult: membershipPriceList,
          };

        case "ticket-price":
          const ticketPriceList = await event.context.prisma.ticketPrice.findMany();
          return {
            statusCode: 200,
            statusMessage: "Success",
            table: "ticket-price",
            method: "list",
            objectResult: ticketPriceList,
          };

        default:
          return {
            statusCode: 400,
            statusMessage: "Error - Wrong table type",
          };
      }
    } catch (error) {
      console.log(error);

      const getError = error as H3Error;
      throw createError({
        statusCode: getError.statusCode,
        statusMessage: getError.message,
      });
    }
  }
  return {
    statusCode: 400,
    statusMessage: "Error - Table  type is empty",
  };
});
