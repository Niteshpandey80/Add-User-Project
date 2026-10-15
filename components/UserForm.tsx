"use client" ;
import { use, useEffect, useState } from "react";

 
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
  
 async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create user");
      }

      setMessage(data.message);
      setName("");
      setEmail("");

      // Refresh the user list after creation
      await fetchUser();
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
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
                 <input type="text" id="email" type="email" placeholder="Enter Your Email " value={email} onChange={(e)=>setEmail(e.target.value)} required className="w-full rounded-md border p-2 text-gray-900" />
            </div>
            <button type="submit" disabled={loading} className="w-full rounded-md bg-blue-600 p-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50">{loading ? "Adding..." :"Add User "}</button>
        </form>
        {
            message && (
                <p className="mt-4 rounded-md bg-gray-100 p-3 text-sm text-gray-800">{message}</p>
            )
        }
    </section>
    <section className="mt-8 rounded-xl bg-white p-6 shadow">
     <div className="mb-4 flex items-center justify-between gap-3">
       <h2 className="text-xl font-bold text-gray-800">
        All Users
       </h2>
       <button type="button" onClick={fetchUser} className="rounded-md bg-gray-800 px-3 py-2 text-sm text-white">
        Refresh
       </button>
     </div>
     {
        users.length === 0 ? (
            <p className="text-gray-500">No users found.</p>
        ):(
            <div className="overflow-x-auto">
               <table className="w-full border-collapse text-left">
                <thead>
                    <tr className="bg-gray-100">
                       <th className="border p-3">Name</th>
                       <th className="border p-3">Email</th>
                    </tr>
                </thead>
                 <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="border p-3 text-gray-800">
                      {user.name}
                    </td>
                    <td className="border p-3 text-gray-800">
                      {user.email}
                    </td>
                  </tr>
                ))}
              </tbody>
               </table>
            </div>
        )
     }
    </section>

   </main>
  )
}

export default UserForm
