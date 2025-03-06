import type { Item } from "./item";

export interface Subscriber extends Item {
  email?: string;
  name?: string;
  state?: string;
  createdAt?: string;
  updatedAt?: string;
  fieldValues?: any;
  id?: number;
}
