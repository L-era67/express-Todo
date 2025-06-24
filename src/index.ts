import express, { Request, Response } from "express";
import { TodoType } from "./types/types";
import fs from "fs-extra";
import todoRouter from "./router/todos.router";
import { Db, MongoClient, ObjectId } from "mongodb";
import "dotenv/config";

const app = express();
const port = 3001;

app.use(express.json());

// app.use("/todos", todoRouter);

const url = process.env.MONGO_URI!;
let db: Db;

const connectDb = async () => {
  try {
    const client = new MongoClient(url);

    await client.connect();
    db = client.db("sample_mflix");
    console.log("Database Connected");
  } catch (error) {
    return error;
  }
};

app.post("/addUser", async (req: Request, res: Response) => {
  const { desc, isCompleted } = req.body;

  try {
    const response = db.collection("toDo").insertOne({ desc, isCompleted });
    const todo = await response;
    res.status(200);
    res.json(todo);
    // res.json((await response).insertedId.getTimestamp());
  } catch (error) {
    console.log(error);
  }
});

app.get("/", async (req: Request, res: Response) => {
  // const client = new MongoClient(uri);
  // await client.connect();

  //YMAR DB-S AWAHAA BICHIJ UGNU.
  // const db = client.db("sample_mflix");

  //TUHAIN DB-D BAIGAA COLLECTION-G BICHEJ UGNU

  const responses = db.collection("toDo").find(); //find - aa todorhoilj uguugui bol bugdiin awch irne!

  //RESPONSE ARRAY BOLGOPJ HUWIRGAN.
  const users = await responses.toArray();
  // console.log("Users", users);

  res.json(users);
});

app.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("ID", id);

  const response = await db
    .collection("toDo")
    .find({ _id: new ObjectId(id) })
    .toArray();

  console.log("Response,", response);

  if (response.length > 0) {
    res.json({ succesfull: true, response });
  }
});

app.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  // const { _id } = req.body;
  console.log(id);

  try {
    const response = db
      .collection("toDo")
      .find({ _id: new ObjectId(id) })
      .toArray();

    console.log("RESPONSSEEE", await response);

    const allTodos = await db.collection("toDo").find().toArray();

    console.log("ALL TODOS ARRAY", allTodos);

    // const updatedTodos = allTodos.filter((todo) => todo._id===response.);
    const todo = await response;
    // res.send("DELETE");
    // res.json({ succes: true, todo });
    res.json(allTodos)
  } catch (error) {
    console.log("DELETE ERROR", error);
  }
});

app.listen(port, async () => {
  await connectDb();
  console.log(`Example app listening on port http://localhost:${port}`);
});
