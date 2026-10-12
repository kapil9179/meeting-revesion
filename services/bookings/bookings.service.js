import { sequelize } from "../../configs/db/db.config.js";
import { generateOrgnaizerLockKey } from "../../utils/bookings/bookingfields.js";
import { ensureOrgnaizerDayLocked } from "../../utils/bookings/bookingfields.js";
import { lockorgnaizerDay } from "../../utils/bookings/bookingfields.js";

const data = {
    orgnaizerEmail:"kapilpandeyweb@gmail.com",
    start:"",
    roomId:1
}

const createBooking = async () => {
  try {
    //  1 done basic validation validate request is valid

    // 2 generate key
     const lockkey = generateOrgnaizerLockKey();
      if(!lockkey){
       throw new Error("locked key not created")
      }
    
      await ensureOrgnaizerDayLocked(lockkey);
        return sequelize.transaction(async(transaction)=>{
            await lockorgnaizerDay(transaction,lockkey);
            
            // lock room prevent 
                 

            // meeting overlap
             
        })
  } catch (error) {
    throw new Error("issue occur in create booking api");
  }
};
