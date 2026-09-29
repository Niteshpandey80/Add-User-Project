import mongoose from "mongoose";
const MONGODB_URI:string | undefined=process.env.MONGODB_URI ;
if(!MONGODB_URI){
    throw new Error('Not able to connected')
}
export async function connectedDB():Promise<void>{
    try {
       await mongoose.connect(MONGODB_URI!);
        console.log("Connected to DB");
    } catch (error) {
        console.log("It is not connected to db" , error);
        throw error ; 
    }
}  