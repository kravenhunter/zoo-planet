import { compressToBestSize } from "@/composables/compressFile";

const getImageObject = async (fileData: File, imageSize: number) => {
  //const getCoverImageSize = await getSizeImage(fileData);
  const getCompressedCoverImageFile = await compressToBestSize(imageSize, fileData);
  return getCompressedCoverImageFile;
};

export default async function packToFormData<T>(
  state: T,
  id: string | null,
  fileCover?: File | null,
  filePreview?: File | null,
) {
  const body = new FormData();

  if (id) {
    body.append("id", id);
  }
  if (fileCover) {
    const compressedCoverFile = await getImageObject(fileCover, 1920);

    compressedCoverFile?.compressedFILE &&
      body.append(
        "imageBgLink",
        compressedCoverFile?.compressedFILE,
        compressedCoverFile.compressedFILE.name,
      );
  }
  if (filePreview) {
    const compressedCoverPrevFile = await getImageObject(filePreview, 315);
    compressedCoverPrevFile?.compressedFILE &&
      body.append(
        "imagePreviewLink",
        compressedCoverPrevFile?.compressedFILE,
        compressedCoverPrevFile.compressedFILE.name,
      );
  }
  for (const item in state) {
    body.append(item, String(state[item as keyof typeof state]));
  }

  return body;
}
