import { createError, defineEventHandler, readMultipartFormData } from "#imports";
import { ConservationStatus, PopulationTrend } from "@prisma/client";
import type { H3Error } from "h3";
import { IPropsSpecie } from "~/server/types";
import { extractMultipartData } from "~/server/utils/extractFormData";
import { isCorrectObject, write_MultiPartData_To_File } from "~/server/utils/saving_file_helper";

const POPULATION_TREND = ["Decreasing", "Increasing", "Stable"];
const CONVERSION_STATUS = ["LC", "NT", "VU", "EN", "CR", "EW", "EX"];

export default defineEventHandler(async (event) => {
  const getType = event?.context?.params?.id;

  try {
    const body = await readMultipartFormData(event);
    if (getType && body?.length) {
      const getSpesie = extractMultipartData<IPropsSpecie>(body);

      if (getSpesie.id) {
        const getPathImageBgFile =
          getSpesie.imageBgLink && (await write_MultiPartData_To_File(getSpesie.imageBgLink));
        const getPathimagePreviewFile =
          getSpesie.imagePreviewLink &&
          (await write_MultiPartData_To_File(getSpesie.imagePreviewLink));

        const contactUs = await event.context.prisma.specie.update({
          where: { id: getSpesie.id },
          data: {
            title: getSpesie.title,
            imageBgLink: getPathImageBgFile && getPathImageBgFile,
            imagePreviewLink: getPathimagePreviewFile && getPathimagePreviewFile,
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
        return {
          statusCode: 200,
          statusMessage: "Success",
          table: "main-content-pages",
          method: "update",
          // objectResult: getItem,
        };
      }
      return {
        statusCode: 400,
        statusMessage: "Error - ID is empty",
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
