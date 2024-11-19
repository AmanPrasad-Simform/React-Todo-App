import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    setEditing,
    deleteTask,
    toggleTaskCompletion,
    setSelectedDate,
} from "@/slices/todoSlice";
import Button from "@/components/Button";

const TaskItem = ({ task }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isEditing } = useSelector((state) => state.todos);

    const handleEdit = () => {
        dispatch(setEditing(task.id));
        dispatch(setSelectedDate(task.date));
        navigate("/addTask");
    };

    const handleDelete = () => {
        dispatch(deleteTask(task.id));
        if (isEditing === task.id) {
            dispatch(setEditing(null));
        }
    };

    const toggleCompletion = () => {
        dispatch(toggleTaskCompletion(task.id));
    };

    const taskClass = task.completed
        ? "line-through text-gray-500"
        : "text-gray-500";
    const descriptionClass = task.completed
        ? "line-through text-gray-400 text-sm italic"
        : "text-gray-400 text-sm italic";

    return (
        <li className="flex justify-between items-center px-4 py-2 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition duration-300">
            <div className="flex items-center space-x-3">
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={toggleCompletion}
                    className="form-checkbox h-5 w-5 text-gray-500"
                />
                <div className="flex flex-col">
                    <span className={taskClass}>{task.name}</span>
                    <span className={descriptionClass}>
                        {task.description || "No description"}
                    </span>
                </div>
            </div>
            <div className="flex space-x-3">
                <span className="flex items-center text-gray-500">
                    {task.date}
                </span>
                {!task.completed && (
                    <div className="flex space-x-2">
                        <Button
                            onClick={handleEdit}
                            text="Edit"
                            variant="default"
                            className="text-gray-600 hover:text-gray-700 transition duration-300"
                        />
                        <Button
                            onClick={handleDelete}
                            text="Delete"
                            variant="default"
                            className="text-red-500 hover:text-red-600 transition duration-300"
                        />
                    </div>
                )}
            </div>
        </li>
    );
};

export default TaskItem;
