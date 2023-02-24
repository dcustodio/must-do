import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getTodos } from "~/models/todo.server";

export const loader = async () => {
    return json({
     todos: await getTodos()
    });
  };

export default function Todos() {

    const { todos } = useLoaderData<typeof loader>();
  console.log(todos);

    return (
      <main>
        <h1>Must do's</h1>
        <Link to="admin" className="text-red-600 underline">Admin</Link>
        <ul>
            {todos.map((todo)=> (
                <li key={todo.id}>
                    <Link to={todo.id}
                        className={`text-blue-600  ${ todo.isCompleted ? 'line-through' : 'underline'}`}>
                        {todo.title}
                    </Link>

                </li>
            ))}
        </ul>
      </main>
    );
  }