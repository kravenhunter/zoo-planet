import { createError, defineEventHandler, readMultipartFormData } from "#imports";
import type { Category } from "@prisma/client";
import { Prisma } from "@prisma/client";
import type { H3Error } from "h3";
import type { IPropsPost } from "~/server/types";
import { extractMultipartData } from "~/server/utils/extractFormData";
import { remove_file_from_store } from "~/server/utils/remove_file_helper";
import { write_MultiPartData_To_File } from "~/server/utils/saving_file_helper";

const CATEGORY_LIST = ["Education", "FightingExtinction", "News", "Species"];

export default defineEventHandler(async (event) => {
  const getId = event?.context?.params?.id;

  try {
    const body = await readMultipartFormData(event);
    if (getId && body?.length) {
      const formData = extractMultipartData<IPropsPost>(body);

      // Использовать в случае если транзакция завершается раньше чем  обработаются операции удаления и сохранения файлов.
      //Выносим логику сохранения вне транзакции  , чтобы уменьшить процесс  создания  записи в БД
      // const getCurrentPost = await event?.context?.prisma.post.findFirst({
      //   where: { id: getId },
      // });
      // let getPathImageBgFile :string | null = null
      // let getPathimagePreviewFile :string | null = null

      // if (formData.imageBgLink) {
      //   getCurrentPost?.imageBgLink && remove_file_from_store(getCurrentPost.imageBgLink);

      //    getPathImageBgFile = await write_MultiPartData_To_File(formData.imageBgLink);

      //    await event?.context?.post.update({
      //     where: { id: getId },
      //     data: {
      //       imageBgLink: { set: getPathImageBgFile },
      //     },
      //   });
      // }
      // if (formData.imagePreviewLink) {
      //   getCurrentPost?.imagePreviewLink &&
      //     remove_file_from_store(getCurrentPost.imagePreviewLink);

      //   getPathimagePreviewFile = await write_MultiPartData_To_File(formData.imagePreviewLink);

      //    await event?.context?.prisma.post.update({
      //     where: { id: getId },
      //     data: {
      //       imagePreviewLink: { set: getPathimagePreviewFile },
      //     },
      //   });
      // }

      const postResult = await event.context.prisma.$transaction(
        async (prisma) => {
          const getCurrentPost = await prisma.post.findFirst({
            where: { id: getId },
          });
          let result = await prisma.post.update({
            where: { id: getId },
            data: {
              title: formData.title,
              category: CATEGORY_LIST.some((el) => el.includes(formData.category))
                ? (formData.category as Category)
                : "News",
              description: formData.description,
              extraeDscription: formData.extraeDscription && formData.extraeDscription,
            },
          });

          if (formData.imageBgLink) {
            getCurrentPost?.imageBgLink && remove_file_from_store(getCurrentPost.imageBgLink);

            const getPathImageBgFile = await write_MultiPartData_To_File(formData.imageBgLink);

            result = await prisma.post.update({
              where: { id: getId },
              data: {
                imageBgLink: { set: getPathImageBgFile },
              },
            });
          }
          if (formData.imagePreviewLink) {
            getCurrentPost?.imagePreviewLink &&
              remove_file_from_store(getCurrentPost.imagePreviewLink);

            const getPathimagePreviewFile = await write_MultiPartData_To_File(
              formData.imagePreviewLink,
            );

            result = await prisma.post.update({
              where: { id: getId },
              data: {
                imagePreviewLink: { set: getPathimagePreviewFile },
              },
            });
          }
          return result;
        },
        {
          maxWait: 5000, // default: 2000 - Увеличиваем максимальное время ожиданияв транцакции до  5сек
          timeout: 10000, // default: 5000 Максимальное время, в течение которого может выполняться интерактивная транзакция перед отменой и откатом. Значение по умолчанию - 5 секунд
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration. Параметр устанавливает уровень изоляции в случаее работы с несколькими операция  в транзакции
        },
      );

      return {
        statusCode: 200,
        statusMessage: "Success",
        table: "post",
        method: "update",
        objectResult: postResult,
      };
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

// export default defineEventHandler(async (event) => {
//   const getId = event?.context?.params?.id;

//   try {
//     const body = await readMultipartFormData(event);
//     if (getId && body?.length) {
//       const formData = extractMultipartData<IPropsPost>(body);

//       const getCurrentPost = await event.context.prisma.post.findFirst({
//         where: { id: getId },
//       });

//       const post = await event.context.prisma.post.update({
//         where: { id: event?.context?.params?.id },
//         data: {
//           title: formData.title,
//           category: isCorrectObject<{ cat: string }>({ cat: formData.category }, CATEGORY_LIST)
//             ? (formData.category as Category)
//             : "News",
//           description: formData.description,
//           extraeDscription: formData.extraeDscription && formData.extraeDscription,
//         },
//       });

//       if (formData.imageBgLink) {

//         getCurrentPost?.imageBgLink && remove_file_from_store(getCurrentPost.imageBgLink);

//         const getPathImageBgFile = await write_MultiPartData_To_File(formData.imageBgLink);

//         await event.context.prisma.post.update({
//           where: { id: event?.context?.params?.id },
//           data: {
//             imageBgLink: { set: getPathImageBgFile },
//           },
//         });
//       }

//       if (formData.imagePreviewLink) {
//         getCurrentPost?.imagePreviewLink && remove_file_from_store(getCurrentPost.imagePreviewLink);

//         const getPathimagePreviewFile = await write_MultiPartData_To_File(
//           formData.imagePreviewLink,
//         );

//         await event.context.prisma.post.update({
//           where: { id: event?.context?.params?.id },
//           data: {
//             imagePreviewLink: { set: getPathimagePreviewFile },
//           },
//         });
//       }

//       return {
//         statusCode: 200,
//         statusMessage: "Success",
//         table: "post",
//         method: "update",
//         objectResult: post,
//       };
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
