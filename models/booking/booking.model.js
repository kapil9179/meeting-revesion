import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../configs/db/db.config.js";

class BookingLocks extends Model {}

BookingLocks.init(
  {
    lockkey: {
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "daylocks",
  },
);

export default BookingLocks;