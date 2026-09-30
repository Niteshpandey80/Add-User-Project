import { connectedDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";


interface CreatedUserRequest{
    name:string ;
    email:string 
}

export async function GET():Promise<NextResponse>{
    try {
        await connectedDB();
        const users = await User.find() ; 
        return NextResponse.json(users , {
          status:200 ,  
        })
    } catch (error) {
       return NextResponse.json(
        {
            message:"Failed to fetch users",
        },{
            status:500
        }
       );
    }
}

export async function POST(request:NextRequest):Promise<NextResponse>{
    try {
        await connectedDB() ; 
        const body:CreatedUserRequest = await request.json();
        const {name ,email} = body ; 
        if(!name || !email){
            return NextResponse.json(
                {
                  message:"Name and email is required", 
                },{
                    status:400, 
                }
            );
        }
        const user = await User.create({
            name ,  email
        })
        return NextResponse.json({
            message:" User Created Successfully",
            user,
        },{
            status:201
        })
    }  
    catch (error) {
        console.log(error);
        return NextResponse.json({
            message:"Failed to created user ",
        },{
            status:500,
        })
        
    }

}