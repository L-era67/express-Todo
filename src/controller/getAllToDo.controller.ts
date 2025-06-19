import express, { Request, Response } from "express";
import fs from "fs-extra";

export const getAll = (req: Request, res: Response) => {
  const all = fs.readFileSync("./toDo.json", "utf8");
  const todos = JSON.parse(all);
  
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
