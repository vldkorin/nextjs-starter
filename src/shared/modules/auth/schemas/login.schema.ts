import { z } from "zod";

import { AuthErrorMessageEnum } from "../enums/auth-error-message.enum";

const loginSchema = z.object({
  email: z
    .email()
    .trim()
    .transform((email) => {
      return email.toLowerCase();
    }),
  password: z.string().min(1, {
    message: AuthErrorMessageEnum.PASSWORD_REQUIRED
  })
});

export { loginSchema };
