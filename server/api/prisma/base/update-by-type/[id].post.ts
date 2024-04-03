import { createError, defineEventHandler, readMultipartFormData } from "#imports";
import type { H3Error } from "h3";
import type { IPropsMembershipPrice, IPropsPlan, IPropsTicketPrice } from "~/server/types";
import { extractMultipartData } from "~/server/utils/extractFormData";
import type { IResponse } from "~/types";

export default defineEventHandler(async (event) => {
  try {
    const getType = event?.context?.params?.id;
    const body = await readMultipartFormData(event);
    let objectResult: IResponse = {
      statusCode: 200,
      statusMessage: "Success",
    };
    if (getType && body?.length) {
      switch (getType) {
        case "plan":
          {
            const getPlanPrice = extractMultipartData<IPropsPlan>(body);
            const planPrice = await event.context.prisma.planPrice.update({
              where: { id: getPlanPrice.id },
              data: {
                title: getPlanPrice.title,
                admission: getPlanPrice.admission,
                faunaPark: getPlanPrice.faunaPark,
                adultRatio: getPlanPrice.adultRatio,
              },
            });

            objectResult = {
              statusCode: 200,
              statusMessage: "Success",
              table: "plan",
              method: "update",
              objectResult: planPrice,
            };
          }
          break;
        case "membership-price":
          {
            const getMembershiPrice = extractMultipartData<IPropsMembershipPrice>(body);
            const membershipPrice = await event.context.prisma.membershipPrice.update({
              where: { id: getMembershiPrice.id },
              data: {
                adult: getMembershiPrice.adult,
                childCategoryFirst: getMembershiPrice.childCategoryFirst,
                childCategorySecond: getMembershiPrice.childCategorySecond,
                concession: getMembershiPrice.concession,
                seniors: getMembershiPrice.seniors,
                teacher: getMembershiPrice.teacher,
                supporter: getMembershiPrice.supporter,
              },
            });
            objectResult = {
              statusCode: 200,
              statusMessage: "Success",
              //table: "membership-price",
              // method: "update",
              // objectResult: membershipPrice,
            };
          }
          break;
        case "ticket-price":
          {
            const getTicketPrice = extractMultipartData<IPropsTicketPrice>(body);
            const ticketPrice = await event.context.prisma.ticketPrice.update({
              where: { id: getTicketPrice.id },
              data: {
                adult: getTicketPrice.adult,
                childCategoryFirst: getTicketPrice.childCategoryFirst,
                childCategorySecond: getTicketPrice.childCategorySecond,
                concession: getTicketPrice.concession,
                seniors: getTicketPrice.seniors,
              },
            });
            objectResult = {
              statusCode: 200,
              statusMessage: "Success",
              // table: "ticket-price",
              // method: "update",
              // objectResult: ticketPrice,
            };
          }
          break;
        default:
          objectResult = {
            statusCode: 400,
            statusMessage: "Error - Wrong table type",
          };
      }
      return objectResult;
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
