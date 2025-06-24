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
const url ="mongodb+srv://Bolormaa:blackpink@cluster0.quqnudn.mongodb.net/";
// const url = process.env.MONGO_URI!;
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

app.post("/", async (req: Request, res: Response) => {
  const { desc, isCompleted } = req.body;

  try {
    const response = db.collection("toDo").insertOne({ desc, isCompleted });
    const todo = await response;
    res.status(200);
    res.json(todo);
    // res.json((await response).insertedId.getTimestamp());
  } catch (error) {
    res.status(400).send("Error!!!");
    console.log(error);
  }
});

app.get("/", async (req: Request, res: Response) => {
  try {
    const responses = db.collection("toDo").find(); //find - aa todorhoilj uguugui bol bugdiin awch irne!
    const users = await responses.toArray();

    if (users.length > 0) {
      res.status(200).json(users);
    } else {
      res.status(404).send("hooson baina to-do nemen uu!");
    }
  } catch (error) {
    res.status(500).send("Failed");
    console.log(error);
  }
});

app.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("ID", id);
    const response = await db
      .collection("toDo")
      .find({ _id: new ObjectId(id) })
      .toArray();
    console.log("Response,", response);

    // res.json({ success: true, response });
    if (response.length > 0) {
      res.json({ success: true, response });
    } else {
      res.status(404).json({ success: false, message: "To Do not found" });
    }
  } catch (error) {
    res.status(500).send("Failed");
    console.log(error);
  }
});

app.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // const response = db
    //   .collection("toDo")
    //   .find({ _id: new ObjectId(id) })
    //   .toArray();

    // const allTodos = await db.collection("toDo").find().toArray();

    // const updatedTodos = allTodos.filter((todo) => {
    //   console.log("TODOS OBJECT ID::", todo._id);
    //   return todo._id !== new ObjectId(id);
    // }); //WTF ene estoi neeree boldoggui shoo X0!!!!!

    // if (!id) return res.send("id-aa oruulna");

    const response = await db
      .collection("toDo")
      .deleteOne({ _id: new ObjectId(id) });
    console.log("DELETE:", response);

    const data = {
      _id: id,
    };

    if (response) {
      res.json({ success: true, data });
    }
  } catch (error) {
    res.status(500).send("Failed");
    console.log("DELETE ERROR", error);
  }
});

app.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { desc, isCompleted } = req.body;
    console.log("ID::", id);

    const response = await db
      .collection("toDo")
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { desc: desc, isCompleted: isCompleted } }
      ); //ijil nertei uchir shuud desc gesen ch bolno;
    console.log("UPDATE", response);

    // const data = {
    //   _id:id,
    //   desc:desc
    // }
    const data = await db.collection("toDo").find().toArray();
    if (data.length > 0) {
    res.json(data);
    }
  } catch (error) {
    res.status(500).send("Failed");
    console.log(error);
  }
});

app.listen(port, async () => {
  await connectDb();
  console.log(`Example app listening on port http://localhost:${port}`);
});
