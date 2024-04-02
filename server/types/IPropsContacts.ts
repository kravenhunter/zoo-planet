import type { MultiPartData } from "h3";

export default interface IContacts {
  id?: string;
  imageBgLink?: MultiPartData;
  imagePreviewLink?: MultiPartData;
  title: string;
  description: string;
  extraeDscription?: string;
  phone: string;
  email: string;
  socialLink_1?: string;
  socialLink_2?: string;
  socialLink_3?: string;
  socialLink_4?: string;
  socialLink_5?: string;
  copyright: string;
}
