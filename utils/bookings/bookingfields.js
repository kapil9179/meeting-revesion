import { bookingsFields } from "../../constants/fields/booking.fields.js";
import BookingLocks from "../../models/booking/booking.model.js";

export const hasOnfields = (data) => {
  for (let key in data) {
    const result = bookingsFields.includes(key);
    if (!result) {
      return {
        valid: false,
        message: `this field is not allowed during the booking${key}`,
      };
    }
  }
  return {
    valid: true,
  };
};

export const checkDataTypeOnegivenfield = (data) => {
  if (
    !Number.isInteger(data.roomId) ||
    data.roomId < 1 ||
    typeof data.organaizerEmail !== "string" ||
    data.title.length < 1 ||
    data.title.length > 100 ||
    typeof data.status !== "string" ||
    typeof data.start !== "string" ||
    typeof data.end !== "string"
  ) {
    return {
      valid: false,
      message: "Given Fields Datatype not allowed",
    };
  }
  return {
    valid: true,
  };
};

export const generateOrgnaizerLockKey = (orgnaizerEmail, date) => {
  return `bookings:${orgnaizerEmail}:${date.toISOString.splice(0, 10)}`;
};

export const ensureOrgnaizerDayLocked = async (lockkey) => {
  const lock = await BookingLocks.create({ lockkey });
  if (!lock) {
    throw new Error("organaizer day not lock");
  }
};

export const lockorgnaizerDay = async (transaction, lockkey) => {
  try {
    await BookingLocks.findByPk(lockkey, {
      transaction,
      lock: transaction.LOCK.UPDATE,
    });
  } catch (error) {
    throw new Error("error occur on when lockorgnaizer day");
  }
};
