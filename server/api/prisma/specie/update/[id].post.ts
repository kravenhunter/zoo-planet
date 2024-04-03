import { createError, defineEventHandler, readMultipartFormData } from "#imports";
import { Prisma, type ConservationStatus, type PopulationTrend } from "@prisma/client";
import type { H3Error } from "h3";
import type { IPropsSpecie } from "~/server/types";
import { extractMultipartData } from "~/server/utils/extractFormData";
import { isCorrectObject, write_MultiPartData_To_File } from "~/server/utils/saving_file_helper";

const POPULATION_TREND = ["Decreasing", "Increasing", "Stable"];
const CONVERSION_STATUS = ["LC", "NT", "VU", "EN", "CR", "EW", "EX"];

export default defineEventHandler(async (event) => {
  const getId = event?.context?.params?.id;

  try {
    const body = await readMultipartFormData(event);
    if (getId && body?.length) {
      const getSpesie = extractMultipartData<IPropsSpecie>(body);

      // const getPathImageBgFile =
      //   getSpesie.imageBgLink && (await write_MultiPartData_To_File(getSpesie.imageBgLink));
      // const getPathimagePreviewFile =
      //   getSpesie.imagePreviewLink &&
      //   (await write_MultiPartData_To_File(getSpesie.imagePreviewLink));

      const sesieItem = await event.context.prisma.$transaction(
        async (prisma) => {
          const getCurrentSpecie = await prisma.specie.findFirst({
            where: { id: getId },
          });

          let result = await prisma.specie.update({
            where: { id: getSpesie.id },
            data: {
              title: getSpesie.title,
              habitain: getSpesie.habitain,
              populationTrend: isCorrectObject<{ trend: string }>(
                { trend: getSpesie.populationTrend },
                POPULATION_TREND,
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

          if (getSpesie.imageBgLink) {
            getCurrentSpecie?.imageBgLink && remove_file_from_store(getCurrentSpecie.imageBgLink);

            const getPathImageBgFile = await write_MultiPartData_To_File(getSpesie.imageBgLink);

            result = await prisma.specie.update({
              where: { id: getId },
              data: {
                imageBgLink: { set: getPathImageBgFile },
              },
            });
          }
          if (getSpesie.imagePreviewLink) {
            getCurrentSpecie?.imagePreviewLink &&
              remove_file_from_store(getCurrentSpecie.imagePreviewLink);

            const getPathimagePreviewFile = await write_MultiPartData_To_File(
              getSpesie.imagePreviewLink,
            );

            result = await prisma.specie.update({
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
        table: "species",
        method: "update",
        objectResult: sesieItem,
      };
    }
    return {
      statusCode: 400,
      statusMessage: "Error - Id   or from data is  empty",
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
