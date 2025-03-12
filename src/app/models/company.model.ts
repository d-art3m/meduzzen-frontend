import { User } from "./user.model";

export enum CompanyVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export enum CompanyType {
  Public = 'public',
  Personal = 'personal'
}

export interface Company {
  id: string;
  name: string;
  description: string;
  visibility: CompanyVisibility;
  owner: User;
}