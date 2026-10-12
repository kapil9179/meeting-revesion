import { hasOnfields } from "../../utils/bookings/bookingfields.js";

import { checkDataTypeOnegivenfield } from "../../utils/bookings/bookingfields.js";

import sample from "../../test/sample.js";

const bookingValidator = (data) => {
  // 1.incoming data should be object
  if (typeof data !== "object" || Array.isArray(data) || data == null) {
    return {
      valid: false,
      message: "Given Data is not object",
    };
  }

  //   2. allowed fields
  const result = hasOnfields(data);
  if (!result.valid) {
    return result;
  }

  // 3.validate field types
  const fieldResult = checkDataTypeOnegivenfield(data);
  if (!fieldResult.valid) {
    return fieldResult;
  }

  // 4.title should be atleast 1 and atmost 100
  if (data.title < 1 || data.title > 100) {
    return {
      valid: false,
      message: "title should be proper",
    };
  }

  const start = new Date(data.start);
  const end = new Date(data.end);
  // 5. metting end time should be greater than start time
  if (end > start) {
    return {
      valid: false,
      message: "metting end greate than start time",
    };
  }

  //  6.  metting should be same utc day
  if (start.toISOString().slice(0, 10) !== end.toISOString().slice(0, 10)) {
    return {
      valid: false,
      message: "metting should be same day",
    };
  }

  // 7 meeting boundry should be 15 minute
  if (start.getUTCHours() % 15 === 0 || end.getUTCHours() % 15 === 0) {
    return {
      valid: false,
      message: "metting should be same day",
    };
  }

  // metting time should be atlease 15 minute and atmost 4 hours
  //  1 minute 60 seconds
  let minute = (start.getTime() - end.getTime()) / 60000;
  if (minute < 15 || minute > 420) {
    return {
      valid: false,
      message: "metting should be atleast 15 minute and alomst 420 minutes",
    };
  }

  // metting can not shedule in the past strictaly ahed
  //  check waht date.now return
   

  if (start.getTime() <= Date.now) {
    return {
      valid: false,
      message: "metting should be start in future",
    };
  }

  // attendies atleast 1 and not beyond the capacity

  if(data.attendees < 1 || data.attendees > data.capacity){
    return {
       valid:false,
       message:"attendies more than 1 and equal should be capacity"

    }
  }

  return {
    valid: true,
    message: "all things are valid",
  };
};

const result = bookingValidator(sample);
console.log("result",result);
