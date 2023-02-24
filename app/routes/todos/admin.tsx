import { json } from "@remix-run/node";
import { Link, useLoaderData, Outlet } from "@remix-run/react";

import { getTodos } from "~/models/todo.server";

export const loader = async () => {
  return json({ posts: await getTodos() });
};

export default function TodoAdmin() {
  const { posts: todos } = useLoaderData<typeof loader>();
  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="my-6 mb-2 border-b-2 text-center text-3xl">
        Todo Admin
      </h1>
      <div className="grid grid-cols-4 gap-6">
        <nav className="col-span-4 md:col-span-1">
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <Link
                  to={todo.id}
                  className="text-blue-600 underline"
                >
                  {todo.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <main className="col-span-4 md:col-span-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}