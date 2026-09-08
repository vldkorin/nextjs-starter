"use client";

import { useQuery } from "@tanstack/react-query";

import { useTRPC } from "@/src/client/trpc/trpc-context";

export default function UsersPage() {
  const trpc = useTRPC();
  const usersQuery = useQuery(trpc.users.list.queryOptions());

  if (usersQuery.isLoading) {
    return <p>Loading...</p>;
  }

  if (usersQuery.error) {
    return <p>{usersQuery.error.message}</p>;
  }

  return (
    <ul>
      {usersQuery.data?.map((user) => {
        return (
          <li key={user.id}>
            {user.name} ({user.email})
          </li>
        );
      })}
    </ul>
  );
}
