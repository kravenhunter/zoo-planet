import { createError, defineEventHandler, readBody } from "#imports";

import type { H3Error } from "h3";

interface IProps {
  type: string;
}
export default defineEventHandler(async (event) => {
  try {
    const { type } = await readBody<IProps>(event);

    if (type) {
      switch (type) {
        case "post":
          await event.context.prisma.post.delete({
            where: {
              id: event?.context?.params?.id,
            },
          });
          return {
            statusCode: 200,
            statusMessage: "Success",
            table: "post",
            method: "delete",
            // objectResult: getItem,
          };

        case "contacts":
          await event.context.prisma.contactUs.delete({
            where: {
              id: event?.context?.params?.id,
            },
          });
          return {
            statusCode: 200,
            statusMessage: "Success",
            table: "contacts",
            method: "delete",
            // objectResult: getItem,
          };
        case "main-content-pages":
          await event.context.prisma.contentPages.delete({
            where: {
              id: event?.context?.params?.id,
            },
          });
          return {
            statusCode: 200,
            statusMessage: "Success",
            table: "main-content-pages",
            method: "delete",
            // objectResult: getItem,
          };
        case "specie":
          await event.context.prisma.specie.delete({
            where: {
              id: event?.context?.params?.id,
            },
          });
          return {
            statusCode: 200,
            statusMessage: "Success",
            table: "specie",
            method: "delete",
            // objectResult: getItem,
          };
        case "plan":
          await event.context.prisma.planPrice.delete({
            where: {
              id: event?.context?.params?.id,
            },
          });
          return {
            statusCode: 200,
            statusMessage: "Success",
            table: "plan",
            method: "delete",
            // objectResult: getItem,
          };

        case "membership-price":
          await event.context.prisma.membershipPrice.delete({
            where: {
              id: event?.context?.params?.id,
            },
          });
          return {
            statusCode: 200,
            statusMessage: "Success",
            table: "membership-price",
            method: "delete",
            // objectResult: getItem,
          };

        case "ticket-price":
          await event.context.prisma.ticketPrice.delete({
            where: {
              id: event?.context?.params?.id,
            },
          });
          return {
            statusCode: 200,
            statusMessage: "Success",
            table: "ticket-price",
            method: "delete",
            // objectResult: getItem,
          };
        default:
          return {
            statusCode: 400,
            statusMessage: "Error - Wrong table type",
          };
      }
    }
    return {
      statusCode: 400,
      statusMessage: "Error - Table  type  or from data is  empty",
    };
  } catch (error) {
    console.log(error);

    const getError = error as H3Error;
    throw createError({
      statusCode: getError.statusCode,
      statusMessage: getError.statusMessage,
    });
  }
});
