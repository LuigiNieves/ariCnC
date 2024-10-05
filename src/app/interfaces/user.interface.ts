export interface IUSER {
  id?: string;
  userName: string;
  email?: string;
  password?: string;
  idPhoto?:string
  photo?: string | File;
  bio?: string;
  owner?: boolean;
}
