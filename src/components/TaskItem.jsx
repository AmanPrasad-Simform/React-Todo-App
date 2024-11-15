import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    setEditing,
    deleteTask,
    toggleTaskCompletion,
    setSelectedDate,
} from "../slices/todoSlice";
const TaskItem = ({ task }) => {
    console.log("taskitem");
    const dispatch = useDispatch();
    const navigateTo = useNavigate();
    const { isEditing } = useSelector((state) => state.todos);

    const handleEdit = (id) => {
        dispatch(setEditing(id));
        dispatch(setSelectedDate(task.date));
        navigateTo("/addTask");
    };

    const handleDelete = (id) => {
        dispatch(deleteTask(id));
        if (isEditing === id) {
            dispatch(setEditing(null));
        }
    };
    const toggleCompletion = (id) => {
        dispatch(toggleTaskCompletion(id));
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
