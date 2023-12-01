export interface User {
  id: string;
  email: string;
  login: string;
  activated: boolean;
  facebookId?: string;
  googleId?: string;
}