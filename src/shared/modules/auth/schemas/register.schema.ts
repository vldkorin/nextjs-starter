import { z } from "zod";

import { AuthValidationEnum } from "../enums/auth-validation.enum";

const registerSchema = z
  .object({
    email: z
      .email()
      .trim()
      .transform((email) => {
        return email.toLowerCase();
      }),
    password: z.string().min(AuthValidationEnum.PASSWORD_MIN_LENGTH),
    confirmPassword: z.string().min(AuthValidationEnum.PASSWORD_MIN_LENGTH)
  })
  .refine(
    (value) => {
      return value.password === value.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"]
    }
  );

export { registerSchema };
