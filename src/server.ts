import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function server() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");

  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

server().catch((err) => console.log(err));
