import express, { Request, response, Response } from "express";
import { TodoType } from "./types/types";
import fs from "fs-extra";
import todoRouter from "./router/todos.router";
import { Db, MongoClient } from "mongodb";

const app = express();
const port = 3000;
app.use(express.json());

app.use("/todos", todoRouter);

const url = "mongodb+srv://Bolormaa:blackpink@cluster0.quqnudn.mongodb.net/";

let db: Db;

const connectDb = async () => {
  try {
    const client = new MongoClient(url);

    await client.connect();
    db = client.db("sample_mflix");
    console.log("Database Connected");

    // return client;
  } catch (error) {
    return error;
  }
};
app.post("/addUser", async (req: Request, res: Response) => {
  try {
    const response = db.collection("testUsers").insertMany([
      { name: "Ustgal", age: "19" },
      { name: "Ustagl2", age: "90" },
    ]);
    res.json((await response).insertedIds);
    // res.json(response)
    // res.send("OK");
  } catch (error) {
    console.log(error);
  }
});

app.get("/", async (req: Request, res: Response) => {
  // const client = new MongoClient(url);
  // await client.connect();

  //YMAR DB-S AWAHAA BICHIJ UGNU.
  // const db = client.db("sample_mflix");

  //TUHAIN DB-D BAIGAA COLLECTION-G BICHEJ UGNU
  const responses = db.collection("testUsers").find(); //find - aa todorhoilj uguugui bol bugdiin awch irne!

  //RESPONSE ARRAY BOLGOPJ HUWIRGAN.
  const users = await responses.toArray();

  console.log("Users", users);

  res.json(users);
});

app.delete("/del", async (req: Request, res: Response) => {
  const response = db.collection("testUsers").deleteMany({ name: "Johan" });
  console.log("DELTED RESPONSE", response);
  res.send("Bolormaa");
});

app.put("/upDate", async (req: Request, res: Response) => {
  const responses = db
    .collection("testUsers")
    .updateMany({ name: "Yagami" }, { $set: { age: "18" } });
  console.log("UPDATED RESPONSES", await responses);

  res.json(responses);
});

app.get("/selectUser", async (req: Request, res: Response) => {
  const responses = db.collection("testUsers").find({ name: "Johan" });
  const selelcted = await responses.toArray();
  res.json(selelcted);
});

app.listen(port, async () => {
  await connectDb();
  console.log(`Example app listening on port http://localhost:${port}`);
});
