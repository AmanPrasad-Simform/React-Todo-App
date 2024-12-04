import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import MyContext from "../context/TodoContext";

const TaskItem = ({ task }) => {
    console.log("taskitem");
    const {
        tasks,
        addTask,
        updateTask,
        setEditing,
        selectedDate,
        setSelectedDate,
        isEditing,
        deleteTask,
        toggleTaskCompletion,
    } = useContext(MyContext);
    const navigateTo = useNavigate();

    const handleEdit = (id) => {
        setEditing(id);
        setSelectedDate(task.date);
        navigateTo("/addTask");
    };

    const handleDelete = (id) => {
        deleteTask(id);
        if (isEditing === id) {
            setEditing(null);
        }
    };
    const toggleCompletion = (id) => {
        toggleTaskCompletion(id);
    };
    return (
        <li
            key={task.id}
            className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition duration-300 "
        >
            <div className="flex items-center space-x-3">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleCompletion(task.id)}
                    className="form-checkbox h-5 w-5 text-purple-500"
                />
                <div className="flex flex-col">
                    <span
                        className={
                            task.completed
                                ? "line-through text-gray-500"
                                : "text-gray-500"
                        }
                    >
                        {task.name}
                    </span>
                    <span
                        className={
                            task.completed
                                ? "line-through text-gray-400 text-sm italic"
                                : "text-gray-400 text-sm italic"
                        }
                    >
                        {task.description ? task.description : "No description"}
                    </span>
                </div>
            </div>
            <div className="flex space-x-3">
                <span className="flex items-center text-gray-500">
                    {task.date}
                </span>
                {!task.completed && (
                    <button
                        onClick={() => handleEdit(task.id)}
                        className="text-blue-500 hover:text-blue-700 transition duration-300"
                    >
                        Edit
                    </button>
                )}
                <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-500 hover:text-red-700 transition duration-300"
                >
                    Delete
                </button>
            </div>
        </li>
    );
};

export default TaskItem;
