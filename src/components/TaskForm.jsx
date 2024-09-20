import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTask } from "../context/TaskContext";


export const TaskForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }, reset
  } = useForm();
  const {createTask, adding} = useTask()

  const onSub = handleSubmit(async (info) => {
    console.log(adding)
    createTask(info.tarea)
    reset()
  });

  return (
    <form onSubmit={onSub}>
      <div className={`h-20 mx-8 flex flex-col font-medium`}>
        <label htmlFor="tarea">Nombre de la Tarea</label>
        <input
          type="text"
          {...register("tarea", {
            required: {
              value: true,
              message: "Este campo es obligatorio",
            },
          })}
          className={`h-8 bg-fith font-normal px-2 rounded border border-gray-300 focus:border-blue-500 focus:outline-none`}
        />
        {errors.tarea && (
          <span className={`text-xs`}>{errors.tarea.message}</span>
        )}
        
      </div>
      <div className={`w-full mb-6 flex justify-center items-center`}>
        <button
          type="submit"
          disabled={adding}
          className={`h-10 w-20 bg-fourth rounded border border-gray-300 hover:border-blue-500 font-medium`}
        >
          {
            adding ? "...Creando":"Crear"
          }

        </button>
      </div>
    </form>
  );
};
