import express from "express"
import { sequelize } from "./configs/db/db.config.js";


const app = express();




app.listen(4000,async()=>{
  await sequelize.sync();
  console.log("server is connected");
});
