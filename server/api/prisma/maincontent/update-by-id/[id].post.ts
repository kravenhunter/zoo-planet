import { createError, defineEventHandler, readMultipartFormData } from "#imports";
import type { H3Error } from "h3";
import type { IPropsContentPage } from "~/server/types";
import { extractMultipartData } from "~/server/utils/extractFormData";
import { remove_file_from_store } from "~/server/utils/remove_file_helper";
import { write_MultiPartData_To_File } from "~/server/utils/saving_file_helper";

export default defineEventHandler(async (event) => {
  const getId = event?.context?.params?.id;

  try {
    const body = await readMultipartFormData(event);

    if (getId && body?.length) {
      const getMain = extractMultipartData<IPropsContentPage>(body);

      const pageResult = await event.context.prisma.$transaction(async (prisma) => {
        const getCurrentPage = await prisma.contentPages.findFirst({
          where: { id: event?.context?.params?.id },
        });

        let result = await prisma.contentPages.update({
          where: { id: event?.context?.params?.id },
          data: {
            title: getMain.title,
            subTitle: getMain.subTitle,
            shortDescription: getMain.shortDescription,
            description: getMain.description,
            extraeDscription: getMain.extraeDscription ?? null,
          },
        });

        if (getMain.imageBgLink) {
          getCurrentPage?.imageBgLink && remove_file_from_store(getCurrentPage.imageBgLink);
          const getPathImageBgFile = await write_MultiPartData_To_File(getMain.imageBgLink);

          result = await prisma.contentPages.update({
            where: { id: event?.context?.params?.id },
            data: {
              imageBgLink: getPathImageBgFile,
            },
          });
        }
        if (getMain.imagePreviewLink) {
          getCurrentPage?.imagePreviewLink &&
            remove_file_from_store(getCurrentPage.imagePreviewLink);

          const getPathimagePreviewFile = await write_MultiPartData_To_File(
            getMain.imagePreviewLink,
          );

          result = await prisma.contentPages.update({
            where: { id: event?.context?.params?.id },
            data: {
              imagePreviewLink: getPathimagePreviewFile,
            },
          });
        }

        return result;
      });

      return {
        statusCode: 200,
        statusMessage: "Success",
        table: "main-content-pages",
        method: "update",
        objectResult: pageResult,
      };
    }
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
//     const body = await readMultipartFormData(event);
//     if (body?.length) {
//       const getMain = extractMultipartData<IPropsContentPage>(body);
//       const getCurrentPage = await event.context.prisma.contentPages.findFirst({
//         where: { id: event?.context?.params?.id },
//       });
//       await event.context.prisma.contentPages.update({
//         where: { id: event?.context?.params?.id },
//         data: {
//           title: getMain.title,
//           subTitle: getMain.subTitle,
//           shortDescription: getMain.shortDescription,
//           description: getMain.description,
//           extraeDscription: getMain.extraeDscription ?? null,
//         },
//       });

//       if (getMain.imageBgLink) {
//         getCurrentPage?.imageBgLink && remove_file_from_store(getCurrentPage.imageBgLink);
//         const getPathImageBgFile = await write_MultiPartData_To_File(getMain.imageBgLink);

//         await event.context.prisma.contentPages.update({
//           where: { id: event?.context?.params?.id },
//           data: {
//             imageBgLink: getPathImageBgFile,
//           },
//         });
//       }
//       if (getMain.imagePreviewLink) {
//         getCurrentPage?.imagePreviewLink && remove_file_from_store(getCurrentPage.imagePreviewLink);

//         const getPathimagePreviewFile = await write_MultiPartData_To_File(getMain.imagePreviewLink);

//         await event.context.prisma.contentPages.update({
//           where: { id: event?.context?.params?.id },
//           data: {
//             imagePreviewLink: getPathimagePreviewFile,
//           },
//         });
//       }

//       return {
//         statusCode: 200,
//         statusMessage: "Success",
//         // table: "main-content-pages",
//         // method: "update",
//         // objectResult: getItem,
//       };
//     }
//   } catch (error) {
//     console.log(error);

//     const getError = error as H3Error;
//     throw createError({
//       statusCode: getError.statusCode,
//       statusMessage: getError.statusMessage,
//     });
//   }
// });
