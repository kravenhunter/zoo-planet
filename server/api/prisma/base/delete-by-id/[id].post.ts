import { createError, defineEventHandler, readBody } from "#imports";
import { PrismaClient } from "@prisma/client";
import type { H3Error } from "h3";

const prismaCLient = new PrismaClient();
interface IProps {
  type: string;
}
export default defineEventHandler(async (event) => {
  try {
    const { type } = await readBody<IProps>(event);

    if (type) {
      switch (type) {
        case "post":
          await prismaCLient.post.delete({
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
          await prismaCLient.contactUs.delete({
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
          await prismaCLient.contentPages.delete({
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
          await prismaCLient.specie.delete({
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
          await prismaCLient.planPrice.delete({
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
          await prismaCLient.membershipPrice.delete({
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
          await prismaCLient.ticketPrice.delete({
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
