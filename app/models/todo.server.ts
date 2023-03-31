import { prisma } from "~/db.server";
import type { Todo } from "@prisma/client";

export async function getTodos(): Promise<Array<Todo>> { 
    return prisma.todo.findMany()
}

export async function getTodo(id: string) {
    return prisma.todo.findUnique({ where: { id }});
}

export async function createTodo(todo: Pick<Todo, "title">) {
    return prisma.todo.create({ data: todo });
}

export async function updateTodo(todo: Pick<Todo, "title" | "id" | "isCompleted">) {

    const { id, isCompleted, title } = todo;

    return prisma.todo.update({ where: {
        id
    }, data: {
        isCompleted,
        title
    } });
}

