import React, { useState, useEffect } from "react";
import { supabase } from "../lib/helper/supabaseclient";
import { Appbar } from "../components/appbar";
import { IoAdd } from "react-icons/io5";
import { TaskList } from "../components/TaskList";
import { useNavigate } from "react-router-dom";
import { ModalCreateTask } from "../components/ModalCreateTask";

export const InitPage = () => {
  const [showModal, setshowModal] = useState(false);
  let navigate = useNavigate();

  const handleClick = () => {
    alert("Click");
  };

  useEffect(() => {
    if (!supabase.auth.getUser()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className={`h-screen w-screen `}>
      <Appbar></Appbar>
      <div
        onClick={() => {
          setshowModal(true);
        }}
        className={`cursor-pointer mx-3 mb-4 bg-fith flex justify-center items-center rounded-md border-1`}
      >
        <button>
          <IoAdd size={30} />
        </button>
      </div>
      <ModalCreateTask
        isVisible={showModal}
        onClose={() => {
          setshowModal(false);
        }}
      ></ModalCreateTask>
      <TaskList></TaskList>
    </div>
  );
};

const addnote = () => {
  return (
    <div className={`h-1/6 w-1/12 m-2 rounded border border-gray-300`}>
      <textarea></textarea>
    </div>
  );
};
