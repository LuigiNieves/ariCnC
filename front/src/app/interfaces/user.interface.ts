export interface IUSER {
  id?: string;
  userId?: string
  username: string;
  email?: string;
  password?: string;
  idPhoto?:string
  photo?: string | File;
  bio?: string;
  isowner: boolean;
}
