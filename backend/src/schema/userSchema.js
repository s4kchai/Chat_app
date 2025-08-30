const { z } = require("zod");

const createUserSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(5, "Username must be at least 5 characters")
    .max(20, "Username must not exceed 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores")
    .transform((val) => val.toLowerCase()),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .transform((val) => val.toLowerCase()),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password must not exceed 100 characters"),

  displayname: z
    .string()
    .max(50, "Display name must not exceed 50 characters")
    .transform((val) => val?.trim())
    .optional(),
});

const loginSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .min(5, "Username must be at least 5 characters")
    .transform((val) => val.toLowerCase()),

  password: z.string().min(1, "Password is required").min(6, "Password must be at least 6 characters"),
});

module.exports = { createUserSchema, loginSchema };
