import { Request, Response } from "express";
import fs from "fs-extra";
import { TodoType } from "../types/types";

export const deletedById = (req: Request, res: Response) => {
  const { id } = req.params;
  const deleteTodo = fs.readFileSync("./toDo.json", "utf8");
  const parsedTodo: TodoType[] = JSON.parse(deleteTodo);
  console.log("DELETED OBJECT", parsedTodo);

  const toDo = parsedTodo.filter((todo: any) => todo.id !== Number(id));

  if (parsedTodo.length !== toDo.length) {
    res.json({
      success: true,
      message:
        "Amjilttai ustgagdlaa‼️ DAHIAD UDRIIN HIIH JAGSAALTAA GARGAN GEJ NAIDYA🧞‍♂️🔥 UGUI ERUN CHI NAASH BUTSAAD IREE ERUUSUU🚀💣",
      toDo,
    });
    fs.writeFileSync("./toDo.json", JSON.stringify(toDo, null, 2));
  } else if (!id) {
    res.send("Ta id-gaa oruulna uu!"); // shuud param-s ni awch baigaa uchir ajlahgui yumshig bainaldaa BARAG
  } else {
    res.send("Iim id-tai jagsaalt alga 🙀");
  }
};
