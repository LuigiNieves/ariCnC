export interface IUSER {
  id?: string;
  userName: string;
  email?: string;
  password?: string;
  photo?: string | File;
  bio?: string;
  owner?: boolean;
}
