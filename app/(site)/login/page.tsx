// "use client";

// import { useState } from "react";
// import { supabase } from "@/lib/supabase";
// import { useRouter } from "next/navigation";

// export default function Login() {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const login = async () => {
//     const { error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       alert(error.message);
//       console.log(error);

//       return;
//     }

//     router.push("/admin");
//   };

//   return (
//     <div className="flex items-center justify-center h-screen">
//       <div className="bg-white p-8 rounded-xl shadow w-96">
//         <h2 className="text-2xl font-bold mb-4">Admin Login</h2>

//         <input
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           className="border p-2 w-full mb-3"
//         />

//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           className="border p-2 w-full mb-3"
//         />

//         <button
//           onClick={login}
//           className="w-full bg-teal-600 text-white p-2 rounded"
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const {data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    

    if (error) {
      alert(error.message);
      console.log(error);
      return;
    }

    router.push("/admin");
  };

  
  const signup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("User created successfully");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-xl shadow w-96">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 w-full mb-3"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 w-full mb-3"
        />

        <button
          onClick={login}
          className="w-full bg-teal-600 text-white p-2 rounded mb-2"
        >
          Login
        </button>

        <button
          onClick={signup}
          className="w-full bg-gray-800 text-white p-2 rounded"
        >
          Create Admin User
        </button>
      </div>
    </div>
  );
}
