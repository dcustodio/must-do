import { prisma } from "~/db.server";

type Todo = {
    id: string;
    title: string;
    isCompleted: boolean;
}


export async function getTodos(): Promise<Array<Todo>> { 
    return prisma.todo.findMany()
}

export async function getTodo(id: string) {
    return prisma.todo.findUnique({ where: { id }});
}


