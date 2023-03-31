import type { LoaderArgs, ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation, useLoaderData } from "@remix-run/react";
import { getTodo } from "~/models/todo.server";
import invariant from "tiny-invariant";
import { updateTodo ,createTodo } from "~/models/todo.server";
import type { Todo } from "@prisma/client";

export const loader = async ({ params }: LoaderArgs) => {
    invariant(params.id, `params.id is required`);

    if(params.id === 'new') {
        return json<any>({});
    }
    
    const todo = await getTodo(params.id);
    invariant(todo, `Todo not found: ${params.id}`);

    return json({ todo });
  };

  export const action = async ({ params, request }: ActionArgs) => {
    const formData = await request.formData();

    const title = formData.get("title");
    const isCompletedString = formData.get("isCompleted");

    const errors = { title: title ? null : "Title is required" };


    const hasErrors = Object.values(errors).some(
        (errorMessage) => errorMessage
    );

    if (hasErrors ) {
      return json(errors);
    }

    invariant(
      typeof title === "string",
      "title must be a string"
    );

    const isCompleted = isCompletedString === 'on' 

    if(params.id === 'new') {
        await createTodo({ title });
    } else {
        await updateTodo({ title, id: params?.id as string, isCompleted });
    }

  
    return redirect("/todos/admin");
  };
  
  const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export default function EditTodoId() {
    const { todo } = useLoaderData<typeof loader>();
    const errors = useActionData<typeof action>();
    const navigation = useNavigation();
    const isCreating = Boolean(
      navigation.state === "submitting"
    );

    return (
    <Form method="put">
      <main className="mx-auto max-w-4xl">
        <h1 className={`my-6 text-center text-3xl ${ todo.isCompleted ? 'line-through' : ''}`} >
          {todo.title}
        </h1>
        <p>
            <label>
              Todo Title:{" "}
              {
                errors?.title ? (<em className="text-red-600">{errors.title}</em>) : null
              }
              <input
                type="text"
                name="title"
                defaultValue={todo.title}
                className={inputClassName}
              />
            </label>
          </p>
        <p>
            <label>
         Completed:{" "}
    
              <input
                type="checkbox"
                name="isCompleted"
                defaultChecked={todo.isCompleted}
                className={inputClassName}
              />
            </label>
          </p>

          <p className="text-right">
            <button
              type="submit"
              className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400 disabled:bg-blue-300"
              disabled={isCreating}
            >
              {isCreating ? "Updating..." : "Update MustDo"}
            </button>
          </p>
      </main>
      </Form>
    );
  }