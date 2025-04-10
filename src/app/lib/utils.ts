import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as z from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSchemaDefaults<T extends z.ZodType<unknown, z.ZodTypeDef>>(
  schema: T
): z.infer<T> {
  return schema.parse({});
}
