import { FilterEnum } from "../enum/filter.enum";

export interface IREALSTATE {
  id?: string;
  title: string;
  description: string;
  price: number;
  location: string;
  ownerId: string;
  imageUrl?: string | File;
  categories?: FilterEnum[]
} 