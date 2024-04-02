import type { MultiPartData } from "h3";

export default interface ISpecie {
  id?: string;
  title: string;
  imageBgLink?: MultiPartData;
  imagePreviewLink?: MultiPartData;
  habitain: string;
  countLeft: string;
  conservationStatus: string;
  populationTrend: string;
  shordDescription: string;
  description: string;
  extraeDscription?: string;
}
