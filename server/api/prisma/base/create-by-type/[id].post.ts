import { createError, defineEventHandler, readMultipartFormData } from "#imports";
import type { Category, ConservationStatus, PopulationTrend } from "@prisma/client";
import type { H3Error } from "h3";
import type {
  IPropsContacts,
  IPropsContentPage,
  IPropsMembershipPrice,
  IPropsPlan,
  IPropsPost,
  IPropsSpecie,
  IPropsTicketPrice,
} from "~/server/types";
import { extractMultipartData } from "~/server/utils/extractFormData";
import { isCorrectObject, write_MultiPartData_To_File } from "~/server/utils/saving_file_helper";
import type { IResponse } from "~/types";

const CATEGORY_LIST = ["Education", "FightingExtinction", "News", "Species"];
const POPULATION_TREND = ["Decreasing", "Increasing", "Stable"];
const CONVERSION_STATUS = ["LC", "NT", "VU", "EN", "CR", "EW", "EX"];
interface IPropsaPlanObjects {
  frist: IPropsPlan;
  second: IPropsPlan;
  third: IPropsPlan;
}

export default defineEventHandler(async (event) => {
  try {
    const getType = event?.context?.params?.id;
    const body = await readMultipartFormData(event);
    let objectResult: IResponse = {
      statusCode: 200,
      statusMessage: "Success",
    };
    if (getType) {
      if (body?.length) {
        switch (getType) {
          case "post":
            {
              const getPost = extractMultipartData<IPropsPost>(body);

              if (getPost.imageBgLink && getPost.imagePreviewLink) {
                const getPathImageBgFile = await write_MultiPartData_To_File(getPost.imageBgLink);
                const getPathimagePreviewFile = await write_MultiPartData_To_File(
                  getPost.imagePreviewLink,
                );
                const post = await event.context.prisma.post.create({
                  data: {
                    title: getPost.title,
                    imageBgLink: getPathImageBgFile,
                    imagePreviewLink: getPathimagePreviewFile,
                    category: CATEGORY_LIST.some((el) => el.includes(getPost.category))
                      ? (getPost.category as Category)
                      : "News",
                    description: getPost.description,
                    extraeDscription: getPost.extraeDscription && getPost.extraeDscription,
                  },
                });
                objectResult = {
                  statusCode: 200,
                  statusMessage: "Success",
                  table: "post",
                  method: "create",
                  objectResult: post,
                };
              } else {
                objectResult = {
                  statusCode: 400,
                  statusMessage: "Error - Files wasn't include to the  form data",
                };
              }
            }
            break;
          case "contacts":
            {
              const getContacts = extractMultipartData<IPropsContacts>(body);

              if (getContacts.imageBgLink && getContacts.imagePreviewLink) {
                const getPathImageBgFile = await write_MultiPartData_To_File(
                  getContacts.imageBgLink,
                );
                const getPathimagePreviewFile = await write_MultiPartData_To_File(
                  getContacts.imagePreviewLink,
                );
                const contacts = await event.context.prisma.contactUs.create({
                  data: {
                    title: getContacts.title,
                    description: getContacts.description,
                    extraeDscription: getContacts.extraeDscription && getContacts.extraeDscription,
                    imageBgLink: getPathImageBgFile,
                    imagePreviewLink: getPathimagePreviewFile,
                    phone: getContacts.phone,
                    email: getContacts.email,
                    socialLink_1: getContacts.socialLink_1 && getContacts.socialLink_1,
                    socialLink_2: getContacts.socialLink_2 && getContacts.socialLink_2,
                    socialLink_3: getContacts.socialLink_3 && getContacts.socialLink_3,
                    socialLink_4: getContacts.socialLink_4 && getContacts.socialLink_4,
                    socialLink_5: getContacts.socialLink_5 && getContacts.socialLink_5,
                    copyright: getContacts.copyright,
                  },
                });
                objectResult = {
                  statusCode: 200,
                  statusMessage: "Success",
                  table: "contacts",
                  method: "create",
                  objectResult: contacts,
                };
              }
            }
            break;
          case "main-content-pages":
            {
              const getMain = extractMultipartData<IPropsContentPage>(body);

              if (getMain.imageBgLink && getMain.imagePreviewLink) {
                const getPathImageBgFile = await write_MultiPartData_To_File(getMain.imageBgLink);
                const getPathimagePreviewFile = await write_MultiPartData_To_File(
                  getMain.imagePreviewLink,
                );
                const contentPages = await event.context.prisma.contentPages.create({
                  data: {
                    title: getMain.title,
                    description: getMain.description,
                    subTitle: getMain.subTitle,
                    shortDescription: getMain.shortDescription,
                    extraeDscription: getMain.extraeDscription && getMain.extraeDscription,
                    imageBgLink: getPathImageBgFile,
                    imagePreviewLink: getPathimagePreviewFile,
                  },
                });
                objectResult = {
                  statusCode: 200,
                  statusMessage: "Success",
                  table: "main-content-pages",
                  method: "create",
                  objectResult: contentPages,
                };
              } else {
                objectResult = {
                  statusCode: 400,
                  statusMessage: "Error - Files wasn't include to the  form data",
                };
              }
            }
            break;
          case "specie":
            {
              const getSpesie = extractMultipartData<IPropsSpecie>(body);

              if (getSpesie.imageBgLink && getSpesie.imagePreviewLink) {
                const getPathImageBgFile = await write_MultiPartData_To_File(getSpesie.imageBgLink);
                const getPathimagePreviewFile = await write_MultiPartData_To_File(
                  getSpesie.imagePreviewLink,
                );
                const spesieItem = await event.context.prisma.specie.create({
                  data: {
                    title: getSpesie.title,
                    imageBgLink: getPathImageBgFile,
                    imagePreviewLink: getPathimagePreviewFile,
                    habitain: getSpesie.habitain,
                    populationTrend: POPULATION_TREND.some((el) =>
                      el.includes(getSpesie.populationTrend),
                    )
                      ? (getSpesie.populationTrend as PopulationTrend)
                      : "Stable",
                    countLeft: getSpesie.countLeft,
                    conservationStatus: isCorrectObject<{ conversion: string }>(
                      { conversion: getSpesie.conservationStatus },
                      CONVERSION_STATUS,
                    )
                      ? (getSpesie.conservationStatus as ConservationStatus)
                      : "LC",
                    shordDescription: getSpesie.shordDescription,
                    description: getSpesie.description,
                    extraeDscription: getSpesie.extraeDscription,
                  },
                });
                objectResult = {
                  statusCode: 200,
                  statusMessage: "Success",
                  table: "species",
                  method: "create",
                  objectResult: spesieItem,
                };
              } else {
                objectResult = {
                  statusCode: 400,
                  statusMessage: "Error - Files wasn't include to the  form data",
                };
              }
            }
            break;
          case "plan":
            {
              const getPlanPrice = extractMultipartData<IPropsPlan>(body);

              const planPrice = await event.context.prisma.planPrice.create({
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
                // table: "plan",
                // method: "create",
                // objectResult: planPrice,
              };
            }
            break;
          case "membership-price":
            {
              const getMembershiPrice = extractMultipartData<IPropsMembershipPrice>(body);

              const membershipPrice = await event.context.prisma.membershipPrice.create({
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
                // table: "membership-price",
                // method: "create",
                // objectResult: membershipPrice,
              };
            }
            break;
          case "ticket-price":
            {
              const getTicketPrice = extractMultipartData<IPropsTicketPrice>(body);
              const ticketPrice = await event.context.prisma.ticketPrice.create({
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
                // method: "create",
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
        statusMessage: "Error - From data is  empty",
      };
    }
    return {
      statusCode: 400,
      statusMessage: "Error - Table  type   is  empty",
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

// export default defineEventHandler(async (event) => {
//   try {
//     const getType = event?.context?.params?.id;
//     const body = await readMultipartFormData(event);

//     if (getType && body?.length) {
//       const obrectResult: IResponse = {
//         statusCode: 200,
//         statusMessage: "Success",
//       };
//       switch (getType) {
//         case "post": {
//           const getPost = extractMultipartData<IPropsPost>(body);

//           if (getPost.imageBgLink && getPost.imagePreviewLink) {
//             const getPathImageBgFile = await write_MultiPartData_To_File(getPost.imageBgLink);
//             const getPathimagePreviewFile = await write_MultiPartData_To_File(
//               getPost.imagePreviewLink,
//             );
//             const post = await event.context.prisma.post.create({
//               data: {
//                 title: getPost.title,
//                 imageBgLink: getPathImageBgFile,
//                 imagePreviewLink: getPathimagePreviewFile,
//                 category: CATEGORY_LIST.some((el) => el.includes(getPost.category))
//                   ? (getPost.category as Category)
//                   : "News",
//                 description: getPost.description,
//                 extraeDscription: getPost.extraeDscription && getPost.extraeDscription,
//               },
//             });
//             return {
//               statusCode: 200,
//               statusMessage: "Success",
//               table: "post",
//               method: "create",
//               objectResult: post,
//             };
//           }

//           return {
//             statusCode: 400,
//             statusMessage: "Error - Files wasn't include to the  form data",
//           };
//         }
//         case "contacts": {
//           const getContacts = extractMultipartData<IPropsContacts>(body);

//           if (getContacts.imageBgLink && getContacts.imagePreviewLink) {
//             const getPathImageBgFile = await write_MultiPartData_To_File(getContacts.imageBgLink);
//             const getPathimagePreviewFile = await write_MultiPartData_To_File(
//               getContacts.imagePreviewLink,
//             );
//             const contacts = await event.context.prisma.contactUs.create({
//               data: {
//                 title: getContacts.title,
//                 description: getContacts.description,
//                 extraeDscription: getContacts.extraeDscription && getContacts.extraeDscription,
//                 imageBgLink: getPathImageBgFile,
//                 imagePreviewLink: getPathimagePreviewFile,
//                 phone: getContacts.phone,
//                 email: getContacts.email,
//                 socialLink_1: getContacts.socialLink_1 && getContacts.socialLink_1,
//                 socialLink_2: getContacts.socialLink_2 && getContacts.socialLink_2,
//                 socialLink_3: getContacts.socialLink_3 && getContacts.socialLink_3,
//                 socialLink_4: getContacts.socialLink_4 && getContacts.socialLink_4,
//                 socialLink_5: getContacts.socialLink_5 && getContacts.socialLink_5,
//                 copyright: getContacts.copyright,
//               },
//             });
//             return {
//               statusCode: 200,
//               statusMessage: "Success",
//               table: "contacts",
//               method: "create",
//               objectResult: contacts,
//             };
//           }
//         }

//         case "main-content-pages":{

//           const getMain = extractMultipartData<IPropsContentPage>(body);

//           if (getMain.imageBgLink && getMain.imagePreviewLink) {
//             const getPathImageBgFile = await write_MultiPartData_To_File(getMain.imageBgLink);
//             const getPathimagePreviewFile = await write_MultiPartData_To_File(
//               getMain.imagePreviewLink,
//             );
//             const contentPages = await event.context.prisma.contentPages.create({
//               data: {
//                 title: getMain.title,
//                 description: getMain.description,
//                 subTitle: getMain.subTitle,
//                 shortDescription: getMain.shortDescription,
//                 extraeDscription: getMain.extraeDscription && getMain.extraeDscription,
//                 imageBgLink: getPathImageBgFile,
//                 imagePreviewLink: getPathimagePreviewFile,
//               },
//             });
//             return {
//               statusCode: 200,
//               statusMessage: "Success",
//               table: "main-content-pages",
//               method: "create",
//               objectResult: contentPages,
//             };
//           }

//           return {
//             statusCode: 400,
//             statusMessage: "Error - Files wasn't include to the  form data",
//           };
// }
//         case "specie":
//           const getSpesie = extractMultipartData<IPropsSpecie>(body);

//           if (getSpesie.imageBgLink && getSpesie.imagePreviewLink) {
//             const getPathImageBgFile = await write_MultiPartData_To_File(getSpesie.imageBgLink);
//             const getPathimagePreviewFile = await write_MultiPartData_To_File(
//               getSpesie.imagePreviewLink,
//             );
//             const spesieItem = await event.context.prisma.specie.create({
//               data: {
//                 title: getSpesie.title,
//                 imageBgLink: getPathImageBgFile,
//                 imagePreviewLink: getPathimagePreviewFile,
//                 habitain: getSpesie.habitain,
//                 populationTrend: POPULATION_TREND.some((el) =>
//                   el.includes(getSpesie.populationTrend),
//                 )
//                   ? (getSpesie.populationTrend as PopulationTrend)
//                   : "Stable",
//                 countLeft: getSpesie.countLeft,
//                 conservationStatus: isCorrectObject<{ conversion: string }>(
//                   { conversion: getSpesie.conservationStatus },
//                   CONVERSION_STATUS,
//                 )
//                   ? (getSpesie.conservationStatus as ConservationStatus)
//                   : "LC",
//                 shordDescription: getSpesie.shordDescription,
//                 description: getSpesie.description,
//                 extraeDscription: getSpesie.extraeDscription,
//               },
//             });
//             return {
//               statusCode: 200,
//               statusMessage: "Success",
//               table: "specie",
//               method: "create",
//               objectResult: spesieItem,
//             };
//           }

//           return {
//             statusCode: 400,
//             statusMessage: "Error - Files wasn't include to the  form data",
//           };

//         case "plan":
//           const getPlanPrice = extractMultipartData<IPropsaPlanObjects>(body);
//           const planPrice = await event.context.prisma.planPrice.createMany({
//             data: [getPlanPrice.frist, getPlanPrice.second, getPlanPrice.third],
//           });

//           return {
//             statusCode: 200,
//             statusMessage: "Success",
//             table: "plan",
//             method: "create",
//             objectResult: planPrice,
//           };

//         case "membership-price":
//           const getMembershiPrice = extractMultipartData<IPropsMembershipPrice>(body);
//           const membershipPrice = await event.context.prisma.membershipPrice.create({
//             data: getMembershiPrice,
//           });
//           return {
//             statusCode: 200,
//             statusMessage: "Success",
//             table: "membership-price",
//             method: "create",
//             objectResult: membershipPrice,
//           };

//         case "ticket-price":
//           const getTicketPrice = extractMultipartData<IPropsTicketPrice>(body);
//           const ticketPrice = await event.context.prisma.ticketPrice.create({
//             data: getTicketPrice,
//           });
//           return {
//             statusCode: 200,
//             statusMessage: "Success",
//             table: "ticket-price",
//             method: "create",
//             objectResult: ticketPrice,
//           };

//         default:
//           return {
//             statusCode: 400,
//             statusMessage: "Error - Wrong table type",
//           };
//       }
//     }
//     return {
//       statusCode: 400,
//       statusMessage: "Error - Table  type  or from data is  empty",
//     };
//   } catch (error) {
//     console.log(error);

//     const getError = error as H3Error;
//     throw createError({
//       statusCode: getError.statusCode,
//       statusMessage: getError.statusMessage,
//     });
//   }
// });
