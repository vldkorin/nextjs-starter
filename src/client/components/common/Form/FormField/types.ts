export interface FieldLike {
  name: string;
  handleBlur: () => void;
  handleChange: (value: string) => void;
  state: {
    value: string;
    meta: {
      isTouched: boolean;
      errors: unknown[];
    };
  };
}
