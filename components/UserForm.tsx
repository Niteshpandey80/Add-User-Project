"use client" ;
import { useEffect, useState } from "react";

 
interface IUser{
    _id:string ;
    name:string ; 
    email:string;
    createAt?:string ;
}


const UserForm = () => {
  const [name , setName ] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState<IUser[]>([]) ; 
  const [message , setMessage] = useState("");
  const [loading , setLoading ] = useState(false); 

  async function fetchUser(){
    try {
        const response = await fetch('/api/users') ;
        const data = await response.json();
        if(!response.ok){
            throw new Error(data.message || "Failed to fetch users")
        }
        setUsers(data)
    } catch (error) {
        console.log("Fetch error : " , error);
        setMessage("Failed to fetch Users")
        
    }
  }
  useEffect(()=>{
    fetchUser();
  },[])
  
 async const handleSubmit(){

 }

  return (
   <main className="mx-auto min-h-screen max-w-3xl bg-gray-100 p-6">
    <section className="mx-auto max-w-md rounded-xl bg-white p-6 shadow">
        <h1 className="mb-5 text-2xl font-bold text-gray-800">Add User</h1>
        <form onSubmit={handleSubmit} className="space-y-4" >
            <div>
                <label htmlFor="name" className="mb-1 block font-medium text-gray-700">Name</label>
                <input type="text" id="name" placeholder="Enter your name"  value={name} onChange={(e)=>setName(e.target.value)} required className="w-full rounded-md border p-2 text-gray-900"/>
            </div>
            <div>
                <label htmlFor="email" className="mb-1 block font-medium text-green-700">Email</label>
                 <input type="text" />
            </div>
        </form>
    </section>

   </main>
  )
}

export default UserForm
