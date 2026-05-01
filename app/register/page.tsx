"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { Button } from "@/src/client/components/atoms/button/button";
import { FormField } from "@/src/client/components/molecules/form-field/form-field";
import { useTRPC } from "@/src/client/trpc/trpc-context";
import { registerSchema } from "@/src/shared/modules/auth/schemas/register.schema";
import type { RegisterInput } from "@/src/shared/modules/auth/types/register.input.type";
import type { RegisterResult } from "@/src/shared/modules/auth/types/register.result.type";

export default function RegisterPage() {
  const trpc = useTRPC();

  const [registeredData, setRegisteredData] = useState<RegisterResult | null>(
    null
  );

  const registerMutation = useMutation(
    trpc.auth.register.mutationOptions({
      onSuccess: (data) => {
        setRegisteredData(data);
        form.reset();
      }
    })
  );

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    } as RegisterInput,
    validators: {
      onSubmit: registerSchema
    },
    onSubmit: async ({ value }) => {
      await registerMutation.mutateAsync(value);
    }
  });

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col gap-6 px-6 py-10">
      <h1 className="text-3xl font-semibold text-black dark:text-zinc-50">
        Register
      </h1>

      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <form.Field name="email">
          {(field) => {
            return (
              <FormField
                autoComplete="email"
                field={field}
                label="Email"
                placeholder="name@email.com"
                submissionAttempts={form.state.submissionAttempts}
                type="email"
              />
            );
          }}
        </form.Field>

        <form.Field name="password">
          {(field) => {
            return (
              <FormField
                autoComplete="new-password"
                field={field}
                label="Password"
                placeholder="Create a secure password"
                submissionAttempts={form.state.submissionAttempts}
                type="password"
              />
            );
          }}
        </form.Field>

        <form.Field name="confirmPassword">
          {(field) => {
            return (
              <FormField
                autoComplete="new-password"
                field={field}
                label="Confirm password"
                placeholder="Repeat password"
                submissionAttempts={form.state.submissionAttempts}
                type="password"
              />
            );
          }}
        </form.Field>

        <Button type="submit" disabled={registerMutation.isPending}>
          {registerMutation.isPending ? "Registering..." : "Register"}
        </Button>
      </form>

      {registerMutation.error ? (
        <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
          {registerMutation.error.message}
        </p>
      ) : null}

      {registeredData ? (
        <div className="rounded-md border border-emerald-300 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-300">
          <p>Registration completed</p>
          <p>Email: {registeredData.user.email}</p>
          <p className="break-all">Token: {registeredData.token}</p>
        </div>
      ) : null}
    </main>
  );
}
