export interface ITicketPrice {
  adult?: string;
  childCategoryFirst?: string;
  childCategorySecond?: string;
  concession?: string;
  seniors?: string;
}
export interface IMembershipPrice {
  adult?: string;
  childCategoryFirst?: string;
  childCategorySecond?: string;
  concession?: string;
  seniors?: string;
  teacher?: string;
  supporter?: string;
}

export interface ISpecie {
  title?: string;
  imageBgLink?: string;
  imagePreviewLink?: string;
  habitain?: string;
  countLeft?: string;
  conservationStatus?: string;
  populationTrend?: string;
  shordDescription?: string;
  description?: string;
  extraeDscription?: string;
}

export interface IPost {
  title?: string;
  imageBgLink?: string;
  imagePreviewLink?: string;
  category?: string;
  description?: string;
  extraeDscription?: string;
}

export interface IContentPage {
  imageBgLink?: string;
  imagePreviewLink?: string;
  title?: string;
  subTitle?: string;
  shortDescription?: string;
  description?: string;
  extraeDscription?: string;
}
export interface IContacts {
  imageBgLink?: string;
  imagePreviewLink?: string;
  title?: string;
  description?: string;
  extraeDscription?: string;
  phone?: string;
  email?: string;
  socialLink_1?: string;
  socialLink_2?: string;
  socialLink_3?: string;
  socialLink_4?: string;
  socialLink_5?: string;
  copyright?: string;
}
export interface IAlert {
  dialogModal?: boolean;
  titleResult?: string;
  iconResult?: string;
  colorIcon?: string;
}
export interface IPlan {
  title?: string;
  admission?: string;
  faunaPark?: string;
  adultRatio?: string;
}

export interface ISelectedPrices {
  adult: number;
  child: number;
  zooCrew: number;
  concession: number;
  senior: number;
  teacher: number;
  supporter: number;
}
export interface IPerson {
  firstName?: string;
  lastName?: string;
  phone?: string;
  personGender?: string;
  dateOfBirth?: string;
  adress?: string;
  email?: string;
  isEmpty: boolean;
}
