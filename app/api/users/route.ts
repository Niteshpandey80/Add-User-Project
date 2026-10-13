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
            message:"Failed to fetch all users",
        },{
            status:500
        }
       );
    }
}

export async function POST(request:NextRequest):Promise<NextResponse>{
    try {
        await connectedDB();
        const body:CreatedUserRequest = await request.json();
        const {name , email } = body ; 
        if(!name || !email){
            return NextResponse.json({
                message:"Name and Email that required " , 
            },{
                status:400 , 
            })
        }
        const user = await User.create({
            name , email
        });
        return NextResponse.json({
            message:"User created successfully" , 
            user
        } , {
            status:201
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
          message:"Failed to create user "
        } , {
            status:500
        })
        
    }
}
