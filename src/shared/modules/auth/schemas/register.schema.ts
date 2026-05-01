import { z } from "zod";

import { AuthErrorMessageEnum } from "../enums/auth-error-message.enum";
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
      message: AuthErrorMessageEnum.PASSWORDS_DO_NOT_MATCH,
      path: ["confirmPassword"]
    }
  );

export { registerSchema };
