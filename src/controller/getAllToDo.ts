import express,{Request, Response} from "express";
import fs from "fs-extra";


export const getAll = (req: Request, res: Response) => {
    const all = fs.readFileSync("./toDo.json", "utf8");
    const todos = JSON.parse(all);
  res.json({ todos });
}