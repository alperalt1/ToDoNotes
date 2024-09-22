import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTask } from "../context/TaskContext";
import { IoMdClose } from "react-icons/io";


export const ModalCreateTask = ({isVisible, onClose}) => {
  if(!isVisible) return null;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { createTask, adding } = useTask();

  const onSub = handleSubmit(async (info) => {

    createTask(info.tarea, info.descriptiontask);
    reset();
    onClose()
  });

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center `}
    >
      <div className={`bg-fith w-1/2 small-mobile:w-full small-mobile:h-2/4 h-1/3 p-4 rounded-md`}>
        <button  onClick={()=>{onClose()}} className={`w-full flex justify-end `}><IoMdClose />
        </button>
        <form onSubmit={onSub}>
          <div className={`flex flex-col font-medium mb-4`}>
            <label htmlFor="tarea">Nombre de la Tarea</label>
            <input
              type="text"
              {...register("tarea", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              })}
              className={`h-8 mt-2 bg-fith font-normal px-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none`}
            />
            {errors.tarea && (
              <span className={`text-xs`}>{errors.tarea.message}</span>
            )}
          </div>

          <div className={`flex flex-col font-medium mb-4`}>
            <label htmlFor="descriptiontask">Tarea</label>
            <textarea
              maxLength={120}
              type="text"
              {...register("descriptiontask", {
                required: {
                  value: true,
                  message: "Este campo es obligatorio",
                },
              })}
              className={`h-1/2 small-mobile:h-28 mt-2 bg-fith font-normal p-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none`}
            />
            {errors.descriptiontask && (
              <span className={`text-xs`}>
                {errors.descriptiontask.message}
              </span>
            )}
          </div>
          <div className={`flex justify-center items-center mt-7`}>
            <button
               
              type="submit"
              disabled={adding}
              className={`h-10 w-20 bg-fourth rounded border border-gray-300 hover:border-blue-500 font-medium`}
            >
              {adding ? "..Creando"  : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
