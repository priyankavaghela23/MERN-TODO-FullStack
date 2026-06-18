import e from "express";
// import { connection } from "mongoose"
import { connection, collectionName } from "./dbconfig.js";
import cors from "cors";
import { ObjectId } from "mongodb";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
const app = e();

app.use(e.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());

app.post("/login", async (req, res) => {
  const userData = req.body;
  if (userData.email && userData.password) {
    const db = await connection();
    const collection = await db.collection("users");
    const result = await collection.findOne({
      email: userData.email,
      password: userData.password,
    });
    if (result) {
      jwt.sign(userData, "Google", { expiresIn: "5d" }, (error, token) => {
        res.send({
          success: true,
          message: "login done",
          token,
        });
      });
    } else {
      res.send({
        success: false,
        message: "user not found",
      });
    }
  } else {
    res.send({
      success: false,
      message: "login not done",
    });
  }
});

app.post("/signup", async (req, res) => {
  const userData = req.body;
  if (userData.email && userData.password) {
    const db = await connection();
    const collection = await db.collection("users");
    const result = await collection.insertOne(userData);
    if (result) {
      jwt.sign(userData, "Google", { expiresIn: "5d" }, (error, token) => {
        res.send({
          success: true,
          message: "signup done",
          token,
        });
      });
    } else
      ({
        success: false,
        message: "signup not done",
      });
  }
});

app.post("/add-task", verifyJWTToken, async (req, res) => {
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

app.get("/tasks", verifyJWTToken, async (req, res) => {
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


app.get("/task/:id", verifyJWTToken, async (req, res) => {
  const db = await connection();
  const collection = await db.collection(collectionName);
  const id = req.params.id;
  const result = await collection.findOne({ _id: new ObjectId(id) });
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

app.put("/update-tasks", verifyJWTToken, async (req, res) => {
  const db = await connection();
  const collection = await db.collection(collectionName);
  const { _id, ...fields } = req.body;
  const update = { $set: fields };
  // console.log(fields);
  // res.send("Test")
  const result = await collection.updateOne({ _id: new ObjectId(_id) }, update);
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

app.delete("/delete/:id", verifyJWTToken, async (req, res) => {
  const db = await connection();
  const id = req.params.id;
  const collection = await db.collection(collectionName);
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
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

app.delete("/delete-multiple", verifyJWTToken, async (req, res) => {
  const db = await connection();
  const ids = req.body;
  const deleteTaskIds = ids.map((item) => new ObjectId(item));
  console.log(ids);

  const collection = await db.collection(collectionName);
  const result = await collection.deleteMany({ _id: { $in: deleteTaskIds } });
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

function verifyJWTToken(req, res, next) {
  // console.log("verifyJWTToken",req.cookies['token']);
  const token = req.cookies["token"];
  jwt.verify(token, "Google", (error, decode) => {
    if(error){
      return res.send({
        message:"Invalid Token",
        success: false
      })
    }
    console.log(decode);
    next()

  });

}

app.listen(3200);
