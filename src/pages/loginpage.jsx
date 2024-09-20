import React, { useState, useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { supabase } from "../lib/helper/supabaseclient";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Loginpage = () => {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorDiv, seterrorDiv] = useState(false);

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/");
      }
    };
    checkUser();
  }, [navigate]);

  const onSubmit = handleSubmit(async (info) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: info.email,
      password: info.password,
    });
    if (error) {
      seterrorDiv(true); // Muestra el mensaje de error si existe un error
    } else {
      seterrorDiv(false); // Oculta el mensaje de error si el login fue exitoso
      navigate("/init"); // Navegar a otra ruta si el inicio de sesión es correcto
    }
  });

  return (
    <div className={`h-screen w-screen flex justify-center items-center`}>
      <div className={`h-2/3 w-80 bg-fith rounded-md`}>
        <div>
          <div className={`mx-8 my-8 flex flex-col text-xl font-bold`}>
            Iniciar Sesión
            <span className={`text-sm mt-1 font-medium`}>
              Ingrese a su cuenta.
            </span>
          </div>
          <div className={`my-6`}>
            <a
              onClick={login}
              className={`h-8 bg-fourth text-sm mx-8 cursor-pointer flex justify-center items-center rounded border border-gray-300 focus:border-blue-500 focus:outline-none`}
            >
              <FaGithub />
              <span className={`mx-2 font-medium`}>Continuar con Github</span>
            </a>
          </div>
          <div className={`w-full px-8 flex justify-center items-center`}>
            <hr className={`w-1/2`}></hr>
            <span className={`mx-1 mb-1 font-medium`}>o</span>
            <hr className={`w-1/2`}></hr>
          </div>
          <form onSubmit={onSubmit}>
            <div className={`h-20 mx-8 flex flex-col font-medium`}>
              <label htmlFor="mail">Correo</label>
              <input
                type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Este campo es obligatorio",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Correo no válido",
                  },
                })}
                className={`h-8 bg-fith font-normal px-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none`}
              />
              {errors.email && (
                <span className={`text-xs`}>{errors.email.message}</span>
              )}
            </div>
            <div className={`h-20 mx-8 flex flex-col font-medium`}>
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Este campo es obligatorio",
                  },
                })}
                className={`h-8 bg-fith font-normal px-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none`}
              />
              {errors.password && (
                <span className={`text-xs`}>{errors.password.message}</span>
              )}
            </div>
            {errorDiv && (
              <span
                className={`my-5 text-sm mt-1 font-medium flex justify-center items-center`}
              >
                Credenciales Incorrectas
              </span>
            )}

            <div className={`w-full mb-6 flex justify-center items-center`}>
              <button
                type="submit"
                className={`h-10 w-20 bg-fourth rounded border border-gray-300 hover:border-blue-500 font-medium`}
              >
                Ingresar
              </button>
            </div>
          </form>
          <hr className={`mx-8`}></hr>
          <div className={`my-4 flex justify-center items-center`}>
            <Link to="/register" className={`text-sm mt-1 font-semibold`}>
              Registrarse
            </Link>
          </div>
          <div className={`my-6 flex justify-center items-center`}>
            <Link
              to="/passwordrecovery"
              className={`text-sm mt-1 font-semibold`}
            >
              ¿Olvidaste tu Contraseña?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
