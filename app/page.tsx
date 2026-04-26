import { AppRoute } from "@/src/client/common/enums/route";
import { Link } from "@/src/client/components/common/Link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-16 dark:bg-black">
      <section className="w-full max-w-3xl rounded-2xl border border-zinc-200 bg-white p-10 dark:border-zinc-800 dark:bg-zinc-950">
        <p className="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Next.js Starter
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Starter
        </h1>
        <p className="mt-4 max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
          A modern starter built with Next.js App Router, TypeScript, tRPC,
          Drizzle ORM, PostgreSQL, TanStack Query, and Zod validation.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href={AppRoute.REGISTER} variant="primary">
            Get Started
          </Link>
          <Link href={AppRoute.REGISTER} variant="secondary">
            Open Register Page
          </Link>
        </div>
      </section>
    </main>
  );
}
