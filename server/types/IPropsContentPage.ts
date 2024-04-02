import type { MultiPartData } from "h3";

export default interface IContentPage {
  id?: string;
  imageBgLink?: MultiPartData;
  imagePreviewLink?: MultiPartData;
  title: string;
  subTitle: string;
  shortDescription: string;
  description: string;
  extraeDscription?: string;
}
