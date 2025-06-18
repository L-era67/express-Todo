import express, { Request, Response } from "express";
import { TodoType } from "./types/types";
const app = express();
const port = 3000;
app.use(express.json());

const todos: TodoType[] = [];

app.get("/", (req: Request, res: Response) => {
  res.send({ heloe: "toDo" });
});

// ADD TO-DO=> desc:
app.post("/todos", (req: Request, res: Response) => {
  const { desc }: { desc: string } = req.body;

  const uniqueId = Math.random();
  console.log("DESCRIPTION", desc);

  const todo = {
    id: uniqueId,
    desc,
    isCompleted: false,
  };

  todos.push(todo);
  console.log("todos", todos);

  res.json({ success: true, todos });
});

// BUH TO DO LIST AWAH
app.get("/todos", (req: Request, res: Response) => {
  res.json({ todos });
});

// NEGIIG AWAH
app.get("/todos/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const todo = todos.find((todo: any) => {
    // console.log(typeof todo.id);
    // console.log(typeof id); => {get hiij awsanii daraa tur zuutiin RAM DEER HADLAGADAJ BAIGAA TUL USTANA}
    todo.id === Number(id);
  });

//   if(!todo){
//     res.json({ success: false, message: 'not found todo'})
//   }

//   res.json({todo});

  console.log("GET BY ID TO DO", todo);

  console.log("ID", id);
  res.send(`ANHII PARAM ID: ${id}`);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
