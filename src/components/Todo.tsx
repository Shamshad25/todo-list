import React, { useState, useEffect } from "react";
import { AiFillPlusCircle, AiOutlineDelete } from "react-icons/ai";
import { v4 as uuid } from "uuid";
import { ITask } from "../redux/model/ITask";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  addTask,
  deleteTask,
  todoSelector,
  updateCheck,
} from "../redux/feature/todoSlice";
import EditModal from "./EditModal";

const Todo = () => {
  const unique_id = uuid();
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState<ITask[]>([]);

  const selectedTask = useAppSelector(todoSelector);
  const dispatch = useAppDispatch();

  const handleOnChange = (position: ITask) => {
    dispatch(updateCheck(position));
  };

  useEffect(() => {
    setTasks(selectedTask?.tasks);
  }, [selectedTask]);

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask = {
      id: unique_id,
      text: input,
      check: false,
    };
    dispatch(addTask(newTask));
    setInput("");
  };

  return (
    <section className="w-3/6 h-96 m-4">
      <form
        className="flex align-center justify-center"
        onSubmit={handleChange}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write your next task"
        />
        <button type="submit">
          <AiFillPlusCircle color={"#00A1F1"} size={"50px"} />
        </button>
      </form>
      <div className="h-full">
        {tasks?.map((task) => {
          return (
            <div
              key={task.id}
              className=" bg-slate-300 flex justify-between mt-2 border border-gray-400 rounded-lg"
            >
              <div className="flex justify-center">
                <input
                  value={task.id}
                  className="w-4 ml-2 pr-2"
                  type="checkbox"
                  onChange={() => handleOnChange(task)}
                />
                <h1
                  className={"py-4 pl-2 text-lg"}
                  style={{
                    textDecoration: task.check ? "line-through" : "none",
                  }}
                >
                  {task.text}
                </h1>
              </div>
              <div className="p-3">
                <button className="pr-3">
                  <EditModal id={task.id} />
                </button>
                <button onClick={() => dispatch(deleteTask(task))}>
                  <AiOutlineDelete color={"#F65314"} size={"30px"} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Todo;
