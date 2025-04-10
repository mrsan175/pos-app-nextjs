import { z } from "zod";

export const userSchemaRegister = z.object({
  id: z.string().cuid().optional(),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  username: z
    .string()
    .regex(
      /^[a-zA-Z0-9_]{3,16}$/,
      "Username can only contain letters, numbers, and underscores, and must be between 3-16 characters long"
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
