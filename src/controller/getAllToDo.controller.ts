import express, { Request, Response } from "express";
import fs from "fs-extra";
import { readTodos } from "../lib/todosJSON";

export const getAll = async(req: Request, res: Response) => {
  // const all =await fs.promises.readFile("./toDo.json", "utf8");
  // const todos = JSON.parse(all);
  const todos = await readTodos();
  
  if (todos) {
    res
      .status(200)
      .json({ message: " ZAA TEGEED HICHEEGEED L BJDEE BRO🌈🤩", todos });
  } else {
    res.send(
      "HOOSON BNA SHUU DEE, BRO INGEEL ZALHUURAAD BAIH YUM UU? Aliw HIIH JAGSAALTAA GARGAAD UURUU UURTUU HURUNGU ORUUL🌪😼💥"
    );
  }
};
