import React, { useState } from "react";
import {
  AiFillPlusCircle,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import { v4 as uuid } from "uuid";
type Task = {
  id: string;
  text: string;
  check: boolean;
};

const Todo = () => {
  const unique_id = uuid();
  const [input, setInput] = useState("");
  const [checked, setChecked] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleOnChange = (position: string) => {
    const updatedTasks = tasks.filter((elem) => {
      if (position == elem.id) {
        setChecked(!checked);
        elem.check = !checked;
      }
      return elem;
    });
    setTasks(updatedTasks);
  };

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTasks([
      ...tasks,
      {
        id: unique_id,
        text: input,
        check: false,
      },
    ]);
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
                  // checked={checked}
                  value={task.id}
                  className="w-4 ml-2 pr-2"
                  type="checkbox"
                  onChange={() => handleOnChange(task.id)}
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
                  <AiOutlineEdit color={"#A4C639"} size={"30px"} />
                </button>
                <button>
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
