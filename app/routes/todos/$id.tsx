import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getTodo } from "~/models/todo.server";
import invariant from "tiny-invariant";

export const loader = async ({ params }: LoaderArgs) => {
    invariant(params.id, `params.id is required`);

    const todo = await getTodo(params.id);
    invariant(todo, `Todo not found: ${params.id}`);

    return json({ todo });
  };

export default function TodoId() {
    const { todo } = useLoaderData<typeof loader>();

    return (
      <main className="mx-auto max-w-4xl">
        <h1 className="my-6 border-b-2 text-center text-3xl">
          {todo.title}
        </h1>
      </main>
    );
  }