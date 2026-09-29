import mongoose from "mongoose";
export interface IUser{
    name:string  , 
    email:string ,
    createAt?:Date ; 
    updatedAt?:Date ;
}
const userSchema = new mongoose.Schema<IUser>({
    name:{
        type:String , 
        required:true  
    },
    email:{
        type:String , 
        required:true , 
    }
},
    {
        timestamps:true 
    }
)
const User = mongoose.models.User || mongoose.model('User' , userSchema)
export default User ; 