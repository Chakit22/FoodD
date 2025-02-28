import { Order } from "./Order";

export interface User {
  name: string;
  email: string;
  password: string;
  role: string;
  orders: Order[];
}
