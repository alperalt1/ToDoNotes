import React, { useEffect,useState } from 'react'
import { supabase } from "../lib/helper/supabaseclient";
import { useNavigate } from "react-router-dom";
import { SlLogout } from "react-icons/sl";
import { SlUser } from "react-icons/sl";

export const Appbar = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const EmailUser = async() => {
    try {
      const user = (await supabase.auth.getSession()).data.session.user;
      console.log(user.email)
      if (user) {
        setEmail(user.email);  // Guardar el email en el estado
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  

  useEffect(() => {
    EmailUser();
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/")
      }else {
        navigate("/init")
      }
    })
  }, [navigate]);
  return (
    <nav className={`w-screen h-16 p-4 rounded-b-lg bg-slate-300`}>
      <ul className={`h-full w-full flex justify-between`}>
        <li>
          <div className={`flex`}>
            <SlUser size={25} className={`flex mr-4`}/>
            {email}
          </div>
        </li>
        <li>
          <button onClick={() => supabase.auth.signOut()}><SlLogout size={25} /></button>
        </li>
      </ul>
    </nav>
  );
};
