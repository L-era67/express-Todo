import { Request, Response } from "express";
import fs from "fs-extra"

export const updatedTodo = (req: Request, res:Response)=>{
  const {id} = req.params;
  const {desc} = req.body;

  const updatedTodo = fs.readFileSync("./toDo.json", "utf8");
  const parsedTodo = JSON.parse(updatedTodo);

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
  
  res.json({message: "BRO sharguu bna shoo, URAGSHAA🤯⚡️",updateTodos})

  fs.writeFileSync("./toDo.json", JSON.stringify(updateTodos, null, 2))
  // res.send( `hiigdlee ${id}`);
  
}