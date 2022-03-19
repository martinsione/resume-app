type ISODateString = string;

export interface Session {
  user?: {
    name?: string;
    image?: string;
    username: string;
  };
  expires: ISODateString;
}
