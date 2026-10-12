import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("employeemeetings", "root", "Kapil@123", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});
