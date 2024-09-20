import { useTask } from "../context/TaskContext";
import { IoMdClose } from "react-icons/io";

function TaskCard({ task }) {
  const { deleteTask } = useTask();

  const handleDelete = async (id) => {
    await deleteTask(id);
  };

  return (
    <div key={task.id} className={`h-36 w-full rounded-md bg-fith p-3`}>
      <div className={`flex justify-between items-center`}>
        <h1 className={`font-semibold pb-2`}>{task.name}</h1>
        <div className={`flex mb-1`}>
          <button onClick={() => deleteTask(task.id)} className={`mr-2 `}>
            <IoMdClose size={17} />
          </button>
        </div>
      </div>
      <h1>{task.description}</h1>
      {/* <p>{JSON.stringify(task.done)}</p> */}
    </div>
  );
}

export default TaskCard;