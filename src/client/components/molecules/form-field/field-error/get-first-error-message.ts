const getFirstErrorMessage = (errors: unknown[]): string | null => {
  const [firstError] = errors;

  if (typeof firstError === "string" && firstError.length > 0) {
    return firstError;
  }

  if (
    typeof firstError === "object" &&
    firstError !== null &&
    "message" in firstError
  ) {
    const { message } = firstError;

    if (typeof message === "string" && message.length > 0) {
      return message;
    }
  }

  if (Array.isArray(firstError) && firstError.length > 0) {
    return getFirstErrorMessage(firstError);
  }

  return null;
};

export { getFirstErrorMessage };
