"use client";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";

import { authClient } from "@/src/client/auth/auth-client";
import { AppRoute } from "@/src/client/common/enums/route/app-route.enum";
import { Button } from "@/src/client/components/atoms/button/button";
import { FormField } from "@/src/client/components/molecules/form-field/form-field";
import { GoogleAuthButton } from "@/src/client/components/organisms/google-auth-button/google-auth-button";
import { registerSchema } from "@/src/shared/modules/auth/schemas/register.schema";
import type { RegisterInput } from "@/src/shared/modules/auth/types/register.input.type";

export default function RegisterPage() {
  const registerMutation = useMutation({
    mutationFn: async (value: RegisterInput) => {
      const { data, error } = await authClient.signUp.email({
        email: value.email,
        name: value.name,
        password: value.password
      });

      if (error) {
        throw new Error(error.message ?? "Registration failed");
      }

      return data;
    },
    onSuccess: () => {
      window.location.assign(AppRoute.HOME);
    }
  });

  const form = useForm({
    defaultValues: {
      name: "",
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
        <form.Field name="name">
          {(field) => {
            return (
              <FormField
                autoComplete="name"
                field={field}
                label="Name"
                placeholder="Your name"
                submissionAttempts={form.state.submissionAttempts}
                type="text"
              />
            );
          }}
        </form.Field>

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

      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
        <span className="text-xs text-zinc-500 dark:text-zinc-400">or</span>
        <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
      </div>

      <GoogleAuthButton />

      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Already have an account?{" "}
        <a className="underline" href={AppRoute.LOGIN}>
          Sign in
        </a>
      </p>
    </main>
  );
}
