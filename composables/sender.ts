import packToFormData from "~/utils/packToFormData";

import type { IResponse } from "~/types";

export default async function sendData<T>(
  state: T,
  path: string,
  id: string | null,
  createOrUpdateData: (apiPath: string, formData: FormData) => Promise<IResponse>,
  fileCover?: File | null,
  filePreview?: File | null,
) {
  const getpacksinglEntry = await packToFormData(state, id, fileCover, filePreview);
  const singlEntryResult = await createOrUpdateData(path, getpacksinglEntry);

  return singlEntryResult;
}
