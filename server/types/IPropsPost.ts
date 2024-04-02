import type { MultiPartData } from "h3";

export default interface IPost {
  id?: string;
  title: string;
  imageBgLink?: MultiPartData;
  imagePreviewLink?: MultiPartData;
  category: string;
  description: string;
  extraeDscription?: string;
}
