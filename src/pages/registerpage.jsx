import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { supabase } from "../lib/helper/supabaseclient";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const Registerpage = () => {
  let navigate = useNavigate()
  const { register, handleSubmit, formState:{ errors }, watch, reset } = useForm();

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      
    });
  };

  const onSubmit = handleSubmit(async (info)=>{
    try {
      const { data, error } = await supabase.auth.signUp({ 
        email: info.email,
        password: info.password,
        options: {
          emailRedirectTo: "https://alperalt1.github.io/ToDoNotes/"
        }
      });

      if ( data.user.identities?.length === 0 ){
        Swal.fire("Usuario Existente");
      } else if( error==null ){
        Swal.fire("Registro Exitoso");
        navigate("/");
      }
    } catch (error) {
      alert(error.message);
    }
    reset()
  });

  return (
    <div className={`h-screen w-screen flex justify-center items-center small-mobile:items-center`}>
      <div className={`h-3/4 w-80 bg-fith rounded-md`}>
        <div>
          <div className={`mx-8 small-mobile:my-1 my-8 flex flex-col text-xl font-bold`}>
            Registrarse
            <span className={`text-sm mt-1 font-medium`}>Ingresar los datos.</span>
          </div>
          <div className={`my-6 small-mobile:my-4`}>
            <a
              onClick={login}
              className={`h-8 bg-fourth text-sm mx-8 cursor-pointer flex justify-center items-center rounded border border-gray-300 focus:border-blue-500 focus:outline-none`}
            >
              <FaGithub />
              <span className={`mx-2 font-medium`}>Registrase con Github</span>
            </a>
          </div>
          <div className={`w-full px-8 flex justify-center items-center`}>
            <hr className={`w-1/2`}></hr>
            <span className={`mx-1 mb-1 font-medium`}>o</span>
            <hr className={`w-1/2`}></hr>
          </div>
          <form onSubmit={onSubmit}>
            <div className={`h-24 small-mobile:h-20 mx-8 flex flex-col font-medium`}>
              <label htmlFor="mail">Correo</label>
              <input
                type="email"
                {...register("email",{
                  required: {
                    value: true,
                    message: "Este campo es obligatorio"
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Correo no válido",  
                  }
                })}
                className={`h-7 px-2 bg-fith font-normal my-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none`}
              />
              {
                errors.email && <span className={`text-xs`}>{errors.email.message}</span>
              }
            </div>
            <div className={`h-24 small-mobile:h-20 mx-8 flex flex-col font-medium`}>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                {...register("password",{
                  required: {
                    value: true,
                    message: "Este campo es obligatorio"
                  },
                  minLength: {
                    value: 6,
                    message: "Debe tener al menos 6 caracteres"
                  }
                })}
                className={`h-7 px-2 bg-fith font-normal my-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none`}
              />
              {
                errors.password && <span className={`text-xs`}>{errors.password.message}</span>
              }
            </div>
            <div className={`h-24 small-mobile:h-20 mx-8 flex flex-col font-medium`}>
              <label htmlFor="repeteadpassword">Repetir Contraseña</label>
              <input
                type="password"
                {...register("repeteadpassword",{
                  required: {
                    value: true,
                    message: "Este campo es obligatorio"
                  },
                  validate: value => value === watch("password") || "Contraseñas no coinciden"
                    
                })}
                className={`h-7 px-2 bg-fith font-normal my-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none`}
              />
              {
                errors.repeteadpassword && <span className={`text-xs`}>{errors.repeteadpassword.message}</span>
              }
            </div>
            <div className={`w-full mb-6 small-mobile:mb-3 flex justify-center items-center`}>
              <button
                type="submit"
                
                className={`h-10 w-20 bg-fourth rounded border border-gray-300 hover:border-blue-500 font-medium`}
              >
                Registrar
              </button>
            </div>
          </form>
          <hr className={`mx-8`}></hr>
          <div className={`my-4 flex justify-center items-center`}>
            <Link to="/" className={`text-sm mt-1 font-semibold`}>
              ¿Tienes una cuenta? Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registerpage;
