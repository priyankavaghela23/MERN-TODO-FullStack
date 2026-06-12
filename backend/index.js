import e from "express";
// import { connection } from "mongoose"
import { connection, collectionName } from "./dbconfig.js";
import cors from "cors";
import { ObjectId } from "mongodb";
const app = e();

app.use(e.json());
app.use(cors());
app.post("/add-task", async (req, res) => {
  // let result = true
  const db = await connection();
  const collection = await db.collection(collectionName);
  const result = await collection.insertOne(req.body);
  if (result) {
    res.send({
      message: "New task added",
      success: true,
      result,
    });
  } else {
    res.send({
      message: "Task Not added",
      success: false,
    });
  }
});

app.get("/tasks", async (req, res) => {
  // let result = true
  const db = await connection();
  const collection = await db.collection(collectionName);
  const result = await collection.find().toArray();
  if (result) {
    res.send({
      message: "Tasks list fatched",
      success: true,
      result,
    });
  } else {
    res.send({
      message: "Try After Sometime",
      success: false,
    });
  }
});


app.get("/task/:id", async (req, res) => {
  const db = await connection();
  const collection = await db.collection(collectionName);
  const id = req.params.id
  const result = await collection.findOne({_id:new ObjectId(id)})
  if (result) {
    res.send({
      message: "Tasks fatched",
      success: true,
      result,
    });
  } else {
    res.send({
      message: "Try After Sometime",
      success: false,
    });
  }
});

app.put("/update-tasks", async (req, res) => {
  const db = await connection();
  const collection = await db.collection(collectionName);
  const {_id,...fields} = req.body;
  const update = {$set: fields}
  // console.log(fields);
  // res.send("Test")
  const result = await collection.updateOne({_id:new ObjectId(_id)},update);
  if (result) {
    res.send({
      message: "Tasks Updated",
      success: true,
      result,
    });
  } else {
    res.send({
      message: "Try After Sometime",
      success: false,
    });
  }
});

app.delete("/delete/:id", async (req, res) => {
  const db = await connection();
  const id = req.params.id
  const collection = await db.collection(collectionName);
  const result = await collection.deleteOne({_id:new ObjectId(id)})
  if (result) {
    res.send({
      message: "Tasks Deleted",
      success: true,
      result,
    });
  } else {
    res.send({
      message: "Try After Sometime",
      success: false,
    });
  }
});
app.listen(3200);
