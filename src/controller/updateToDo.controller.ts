import { Request, Response } from "express";
import fs from "fs-extra"
import { readTodos } from "../lib/todosJSON";

export const updatedTodo = async(req: Request, res:Response)=>{
  const {id} = req.params;
  const {desc} = req.body;

  // const updatedTodo =await fs.promises.readFile("./toDo.json", "utf8");
  // const parsedTodo = JSON.parse(updatedTodo);
  const parsedTodo =await readTodos();
  console.log("parsed to do LIB", parsedTodo);
  
  const foundedUser = parsedTodo.find((todo:any)=>todo.id === Number(id));

  if(!foundedUser){
    res.json({success:false, message:"Жагсаалт олдсонгүй"})
    return;
  }

  const updateTodos = parsedTodo.map((todo: any)=> {
    if(todo.id !==   Number(id)){
     return todo;
    } 
    if(todo.id===Number(id)){
       return {...todo, desc};
    }
  })
  
  res.json({message: "⚡️",updateTodos})

  fs.writeFileSync("./toDo.json", JSON.stringify(updateTodos, null, 2))
}