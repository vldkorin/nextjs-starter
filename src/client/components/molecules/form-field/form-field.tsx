import { FieldError } from "./field-error/field-error";
import type { FieldLike } from "./types/form-field.type";

import { Input } from "@/src/client/components/atoms/input/input";

interface FormFieldProps {
  autoComplete?: string;
  field: FieldLike;
  label: string;
  placeholder: string;
  submissionAttempts?: number;
  type?: "email" | "password" | "text";
}

const FormField = ({
  autoComplete,
  field,
  label,
  placeholder,
  submissionAttempts = 0,
  type = "text"
}: FormFieldProps) => {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span>{label}</span>
      <Input
        autoComplete={autoComplete}
        name={field.name}
        onBlur={field.handleBlur}
        onChange={(event) => {
          field.handleChange(event.target.value);
        }}
        placeholder={placeholder}
        type={type}
        value={field.state.value}
      />
      <FieldError
        errors={field.state.meta.errors}
        isTouched={field.state.meta.isTouched}
        submissionAttempts={submissionAttempts}
      />
    </label>
  );
};

export { FormField };
