import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/helper/supabaseclient";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Passwordrecovery = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState:{ errors }, watch, reset } = useForm();

  const onSubmit = handleSubmit(async (info)=>{
    try {
      const { data, error } = await supabase.auth
      .resetPasswordForEmail(info.email,{
        redirectTo: 'https://alperalt1.github.io/ToDoNotes/passwordupdate/',
      });
      if (error) throw error;
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
    reset()
  });

  return (
    <div className={`h-screen w-screen flex justify-center items-center`}>
      <div className={`h-1/2 w-80 bg-fith rounded-md`}>
        <div>
          <div className={`mx-8 small-mobile:my-4 my-8 flex flex-col text-xl font-bold`}>
            Recuperar Contraseña
            <span className={`text-sm mt-1 font-medium`}>Ingrese su correo para enviar el enlace y restablecer su contraseña.</span>
          </div>
          <form onSubmit={onSubmit}>
            <div className={`h-24 mx-8 flex flex-col font-medium`}>
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
            <div className={`w-full mb-6 flex justify-center items-center`}>
              <button
                type="submit"
                className={`h-10 w-20 bg-fourth rounded border border-gray-300 hover:border-blue-500 font-medium`}
              >
                Enviar
              </button>
            </div>
          </form>
          <hr className={`mx-8`}></hr>
          <div className={`my-4 flex justify-center items-center`}>
            <Link to="/" className={`text-sm mt-1 font-medium`}>
              ¿Tienes una cuenta? Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Passwordrecovery;