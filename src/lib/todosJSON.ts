import fs from "fs-extra"
import { TodoType } from "../types/types";

export const readTodos = async() =>{
    try {
        const todos = await fs.promises.readFile("./toDo.json", "utf8")
        return JSON.parse(todos) as TodoType[];
    } catch (error) {
        console.error(error);
        return [];
    }
}