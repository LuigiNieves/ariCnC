export interface JwtPayload{
  id:string;
  username:string;
  name:string;
  iat?:string;
  exp?:string;
}