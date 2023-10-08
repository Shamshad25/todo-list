import { useState, useEffect } from "react";
import Modal from "react-modal";
import {
  AiOutlineEdit,
  AiFillPlusCircle,
  AiOutlineClose,
} from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { updateTask, todoSelector } from "../redux/feature/todoSlice";

const customStyles = {
  content: {
    width: "50%",
    height: "30%",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

interface Iid {
  id: string;
}

const EditModal = ({ id }: Iid) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");

  const selectedTask = useAppSelector(todoSelector);
  const dispatch = useAppDispatch();

  const editedTask = selectedTask.tasks.find((task) => task.id === id);

  useEffect(() => {
    editedTask && setText(editedTask.text);
  }, [editedTask]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();
    dispatch(
      updateTask({
        id: id,
        text: text,
        check: editedTask?.check ? true : false,
      })
    );
    closeModal();
  };

  return (
    <div>
      <AiOutlineEdit color={"#A4C639"} size={"30px"} onClick={openModal} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal} className=" w-full flex justify-end mb-4">
          <AiOutlineClose color={"#F65314"} size={"30px"} />
        </button>
        <div className="">
          <form
            className="flex flex-col sm:flex-row items-end sm:align-center sm:justify-center"
            onSubmit={handleSubmit}
          >
            <textarea
              // type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your next task"
              className="w-full border border-gray-400 rounded-lg"
            />
            <button type="submit" className="">
              <AiFillPlusCircle color={"#00A1F1"} size={"50px"} />
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EditModal;
