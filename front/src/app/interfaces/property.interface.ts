export interface IREALSTATE {
  id?: string;
  realStateId?: string;
  title: string;
  description: string;
  price: number;
  location: string;
  ownerId: string;
  imageUrl?: string | File;
} 