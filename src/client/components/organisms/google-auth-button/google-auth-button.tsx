"use client";

import { useMutation } from "@tanstack/react-query";

import { GoogleIcon } from "./google-icon";

import { authClient } from "@/src/client/auth/auth-client";
import { AppRoute } from "@/src/client/common/enums/route/app-route.enum";

const GoogleAuthButton = () => {
  const googleSignInMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await authClient.signIn.social({
        callbackURL: AppRoute.HOME,
        provider: "google"
      });

      if (error) {
        throw new Error(error.message ?? "Google sign in failed");
      }

      return data;
    }
  });

  return (
    <div className="flex flex-col gap-2">
      <button
        className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-zinc-300 bg-white text-sm text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-transparent dark:text-zinc-200 dark:hover:bg-zinc-900"
        disabled={googleSignInMutation.isPending}
        onClick={() => {
          void googleSignInMutation.mutateAsync();
        }}
        type="button"
      >
        <GoogleIcon />
        {googleSignInMutation.isPending
          ? "Connecting to Google..."
          : "Continue with Google"}
      </button>

      {googleSignInMutation.error ? (
        <p className="text-xs text-red-600 dark:text-red-400">
          {googleSignInMutation.error.message}
        </p>
      ) : null}
    </div>
  );
};

export { GoogleAuthButton };
