export interface IUSER {
  userId?: string;
  username: string;
  email?: string;
  password?: string;
  idPhoto?: string;
  photo?: string | File;
  bio?: string;
  isowner: boolean;
  profilePicture?: string;
}
