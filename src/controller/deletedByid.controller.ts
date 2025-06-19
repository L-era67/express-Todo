import { Request, Response } from "express";
import fs from "fs-extra";
import { TodoType } from "../types/types";
import { readTodos } from "../lib/todosJSON";

export const deletedById = async (req: Request, res: Response) => {
  const { id } = req.params;

  // const deleteTodo =await fs.promises.readFile("./toDo.json", "utf8");
  // const parsedTodo: TodoType[] = JSON.parse(deleteTodo);
  const parsedTodo = await readTodos();
  console.log("DELETED OBJECT", parsedTodo);

  const toDo = parsedTodo.filter((todo: any) => todo.id !== Number(id));

  if (parsedTodo.length !== toDo.length) {
    res.json({
      success: true,
      message: `Amjilttai ustgagdlaa ID: ${id}‼️ DAHIAD UDURT JAGSAALTAA GARGAN GEJ NAIDYA🧞‍♂️`,
      toDo,
    });
    fs.writeFileSync("./toDo.json", JSON.stringify(toDo, null, 2));
  } else if (!id) {
    res.send("Ta id-gaa oruulna uu!"); // shuud param-s ni awch baigaa uchir ajlahgui yumshig bainaldaa BARAG
  } else {
    res.send("Iim id-tai jagsaalt alga 🙀");
  }
};
