import { createError, defineEventHandler, readMultipartFormData } from "#imports";
import type { H3Error } from "h3";
import type { IPropsContacts } from "~/server/types";
import { extractMultipartData } from "~/server/utils/extractFormData";
import { write_MultiPartData_To_File } from "~/server/utils/saving_file_helper";

export default defineEventHandler(async (event) => {
  const getId = event?.context?.params?.id;

  try {
    const body = await readMultipartFormData(event);
    if (getId && body?.length) {
      const getContacts = extractMultipartData<IPropsContacts>(body);

      const getPathImageBgFile =
        getContacts.imageBgLink && (await write_MultiPartData_To_File(getContacts.imageBgLink));
      const getPathimagePreviewFile =
        getContacts.imagePreviewLink &&
        (await write_MultiPartData_To_File(getContacts.imagePreviewLink));

      const contactUs = await event.context.prisma.contactUs.update({
        where: { id: getId },
        data: {
          title: getContacts.title,
          imageBgLink: getPathImageBgFile && getPathImageBgFile,
          imagePreviewLink: getPathimagePreviewFile && getPathimagePreviewFile,
          description: getContacts.description,
          extraeDscription: getContacts.extraeDscription && getContacts.extraeDscription,
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
      return {
        statusCode: 200,
        statusMessage: "Success",
        table: "contacts",
        method: "update",
        // objectResult: getItem,
      };
    }
    return {
      statusCode: 400,
      statusMessage: "Error - ID is empty",
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
