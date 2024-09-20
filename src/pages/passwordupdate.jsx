import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/helper/supabaseclient";
import { useForm } from "react-hook-form";

const Passwordupdate = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState:{ errors }, watch, reset } = useForm();

    const onSubmit = handleSubmit(async (info)=>{
      try {
        const { data, error } = await supabase.auth.updateUser({ 
          password: info.password,
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
            <div className={`mx-8 my-8 flex flex-col text-xl font-bold`}>
              Nueva Contraseña
              <span className={`text-sm mt-1 font-medium`}>Ingrese su nueva contraseña.</span>
            </div>
            <form onSubmit={onSubmit}>
              <div className={`h-24 mx-8 flex flex-col font-medium`}>
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
                  className={`h-7 px-2 bg-fith font-normal rounded border border-gray-300 focus:border-blue-500 focus:outline-none`}
                />
                {
                  errors.password && <span className={`text-xs`}>{errors.password.message}</span>
                }
              </div>
              <div className={`w-full my-6 flex justify-center items-center`}>
                <button
                  type="submit"
                  className={`h-10 w-20 bg-fourth rounded border border-gray-300 hover:border-blue-500`}
                >
                  Enviar
                </button>
              </div>
            </form>
            <hr className={`mx-8`}></hr>
            <div className={`my-4 flex justify-center items-center`}>
              <a href="/#/" className={`text-sm mt-1 font-medium`}>
                ¿Tienes una cuenta? Iniciar Sesión
              </a>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Passwordupdate;