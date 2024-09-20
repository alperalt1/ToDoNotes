import { createContext, useContext, useState } from "react";
import { supabase } from "../lib/helper/supabaseclient";

export const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("Error context");
  return context;
};

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [adding, setAdding] = useState(false);
  const [loading, setLoading] = useState(false);

  const createTask = async (taskName, taskDescription) => {
    setAdding(true);
    try {
      const user = (await supabase.auth.getSession()).data.session.user;
      const { data, error } = await supabase
        .from("tasks")
        .insert({
          name: taskName,
          user_id: user.id,
          description: taskDescription,
        })
        .select();
      if (error) {
        throw error;
      }
      setTasks([...tasks, ...data]);
    } catch (error) {
      console.error(error);
    } finally {
      setAdding(false);
    }
  };

  const getTasks = async (done = false) => {
    setLoading(true);
    try {
      const user = (await supabase.auth.getSession()).data.session.user;
      const { data, error } = await supabase
        .from("tasks")
        .select()
        .eq("user_id", user.id)
        .eq("done", done);

      if (error) {
        throw error;
      }
      setTasks(data);
    } catch (error) {
      alert(error.error_description || error.message);
    }
    setLoading(false);
  };

  const deleteTask = async (id) => {
    try {
      const user = (await supabase.auth.getSession()).data.session.user;

      const { error, data } = await supabase
        .from("tasks")
        .delete()
        .eq("user_id", user.id)
        .eq("id", id)
        .select("*");

      if (error) {
        throw error;
      }

      setTasks(tasks.filter((task) => task.id !== data[0].id));
    } catch (error) {
      alert(error.error_description || error.message);
    }
  };

  return (
    <TaskContext.Provider
      value={{ tasks, getTasks, createTask, deleteTask, adding, loading }}
    >
      {children}
    </TaskContext.Provider>
  );
};
