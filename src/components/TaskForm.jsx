import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask, setEditing } from "../slices/todoSlice";

const TaskForm = () => {
    const dispatch = useDispatch();
    const { tasks, isEditing, selectedDate } = useSelector(
        (state) => state.todos
    );

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            taskTitle: "",
            taskDescription: "",
        },
    });

    const taskToEdit = tasks.find((task) => task.id === isEditing);

    useEffect(() => {
        if (isEditing && taskToEdit) {
            setValue("taskTitle", taskToEdit.name);
            setValue("taskDescription", taskToEdit.description);
        }
    }, [isEditing, taskToEdit, setValue]);

    const handleFormSubmit = (data) => {
        const taskDate = selectedDate;
        if (isEditing !== null) {
            dispatch(
                updateTask({
                    id: isEditing,
                    updatedTask: {
                        name: data.taskTitle,
                        description: data.taskDescription,
                    },
                })
            );
            dispatch(setEditing(null));
        } else {
            const newTask = {
                id: Date.now(),
                name: data.taskTitle,
                description: data.taskDescription,
                completed: false,
                date: taskDate,
            };
            dispatch(addTask(newTask));
        }
        reset();
    };

    return (
        <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex flex-col space-y-6"
        >
            <div className="flex flex-col">
                <label
                    htmlFor="taskDate"
                    className="text-sm font-semibold text-gray-700 mb-2"
                >
                    Task Due Date
                </label>
                <input
                    id="taskDate"
                    type="text"
                    value={selectedDate}
                    disabled
                    className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 focus:outline-none cursor-not-allowed"
                />
            </div>

            <div className="flex flex-col">
                <label
                    htmlFor="taskTitle"
                    className="text-sm font-semibold text-gray-700 mb-2"
                >
                    Task Title<sup>*</sup>
                </label>
                <input
                    id="taskTitle"
                    type="text"
                    {...register("taskTitle", { required: true })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                    placeholder="Add a new task..."
                />
                {errors.taskTitle && (
                    <p className="text-red-500 text-xs mt-1">
                        This field is required
                    </p>
                )}
            </div>

            <div className="flex flex-col">
                <label
                    htmlFor="taskDescription"
                    className="text-sm font-semibold text-gray-700 mb-2"
                >
                    Task Description
                </label>
                <textarea
                    id="taskDescription"
                    {...register("taskDescription")}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 resize-none"
                    placeholder="Describe your task..."
                    rows={3}
                />
            </div>

            <button
                type="submit"
                className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300"
            >
                {isEditing ? "Update" : "Add"}
            </button>
        </form>
    );
};

export default TaskForm;
