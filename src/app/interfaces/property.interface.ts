export interface IPROPERTY {
  id?: string;
  title: string;
  description: string;
  price: number;
  location: string;
  ownerId: string;
  imageUrl?: string | File;
} 