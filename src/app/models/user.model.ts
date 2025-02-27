import { Auth } from "./auth.model";

export interface User {
  id: string;
  name: string;
  email: string;
  auth?: Auth;
}