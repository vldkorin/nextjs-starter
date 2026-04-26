import { getFirstErrorMessage } from "./utils";

interface FieldErrorProps {
  errors: unknown[];
  isTouched: boolean;
  submissionAttempts?: number;
}

const FieldError = ({
  errors,
  isTouched,
  submissionAttempts = 0
}: FieldErrorProps) => {
  if (!isTouched && submissionAttempts === 0) {
    return null;
  }

  const message = getFirstErrorMessage(errors);

  if (!message) {
    return null;
  }

  return <p className="text-sm text-red-600 dark:text-red-400">{message}</p>;
};

export { FieldError };
