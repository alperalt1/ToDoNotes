import React from "react";
import { useTask } from "../context/TaskContext";
import { useEffect } from "react";


import TaskCard from "./TaskCard";
export const TaskList = () => {
  const { tasks, getTasks, loading, deleteTask } = useTask();


  const handleDelete = (task)=>{
      deleteTask(task.id)
  }

  useEffect(() => {
    getTasks();
  }, []);

  function RenderTask() {
    if (loading) {
      return (
        <div className={`flex justify-center items-center`}>
          <h1 className={`font-medium`}>....Cargando</h1>
        </div>
      
    );

    } else if (tasks.length === 0) {
      return (
        <div className={`flex justify-center items-center`}>
          <h1 className={`font-medium`}>No hay tareas</h1>
        </div>
      
    );
    } else {
      return (
        <div className={`h-full w-full px-3 grid grid-cols-4 gap-3 small-mobile:grid-cols-1`}>
          {
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} />

            ))
          }
        </div>
      );
    }
  }

  return <div>{RenderTask()}</div>;
};
