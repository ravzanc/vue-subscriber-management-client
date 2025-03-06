import type { Item } from "./item";

export interface Field extends Item {
  title?: string;
  type?: string;
  createdAt?: string;
  updatedAt?: string;
  fieldValues?: any;
  id?: number;
}
