
// table.types.ts
import { ReactNode } from "react";

export type TableVariant = "default" | "bordered" | "striped" | "compact";
export type TableMode = "full" | "simple" | "minimal";

export interface TableColumn<T> {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  actions?: (row: T) => ReactNode;
  itemsPerPage?: number;
  title?: string;
  children?: ReactNode;
  searchable?: boolean;
  sortable?: boolean;
  variant?: TableVariant;
  mode?: TableMode;
}
