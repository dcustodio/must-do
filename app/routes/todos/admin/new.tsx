import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { createTodo } from "~/models/todo.server";
import invariant from "tiny-invariant";


export const action = async ({ request }: ActionArgs) => {
    const formData = await request.formData();

    const title = formData.get("title");

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

    await createTodo({ title });
  
    return redirect("/todos/admin");
  };

const inputClassName = `w-full rounded border border-gray-500 px-2 py-1 text-lg`;

export default function NewTodo() {
    const errors = useActionData<typeof action>();
    const navigation = useNavigation();
    const isCreating = Boolean(
      navigation.state === "submitting"
    );

    return (
        <Form method="post">
          <p>
            <label>
              Todo Title:{" "}
              {
                errors?.title ? (<em className="text-red-600">{errors.title}</em>) : null
              }
              <input
                type="text"
                name="title"
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
              {isCreating ? "Creating..." : "Create MustDo"}
            </button>
          </p>
        </Form>
      );
  }