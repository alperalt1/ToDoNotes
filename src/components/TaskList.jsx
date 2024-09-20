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
      return <h1>....Cargando</h1>;
    } else if (tasks.length === 0) {
      return <h1>No hay tareas</h1>;
    } else {
      return (
        <div className={`h-full w-full px-3 grid grid-cols-4 gap-3`}>
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
