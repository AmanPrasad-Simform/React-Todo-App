import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask, setEditing } from "@/slices/todoSlice";
import Button from "@/components/Button";

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
        } else {
            reset();
        }
    }, [isEditing, taskToEdit, setValue, reset]);

    const handleFormSubmit = (data) => {
        if (isEditing) {
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
                date: selectedDate,
            };
            dispatch(addTask(newTask));
        }
        reset();
    };

    const labelClass = "text-sm font-semibold text-gray-700 mb-2";
    const inputClass =
        "px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500";

    return (
        <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="flex flex-col space-y-6"
        >
            <div className="flex flex-col">
                <label htmlFor="taskDate" className={labelClass}>
                    Task Due Date
                </label>
                <input
                    id="taskDate"
                    type="text"
                    value={selectedDate}
                    disabled
                    className={`${inputClass} bg-gray-100 text-gray-700 cursor-not-allowed`}
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="taskTitle" className={labelClass}>
                    Task Title<sup>*</sup>
                </label>
                <input
                    id="taskTitle"
                    type="text"
                    {...register("taskTitle", {
                        required: "This field is required",
                    })}
                    className={inputClass}
                    placeholder="Add a new task..."
                />
                {errors.taskTitle && (
                    <p className="text-red-500 text-xs mt-1">
                        {errors.taskTitle.message}
                    </p>
                )}
            </div>

            <div className="flex flex-col">
                <label htmlFor="taskDescription" className={labelClass}>
                    Task Description
                </label>
                <textarea
                    id="taskDescription"
                    {...register("taskDescription")}
                    className={`${inputClass} resize-none`}
                    placeholder="Describe your task..."
                    rows={3}
                />
            </div>

            <Button
                type="submit"
                text={isEditing ? "Update" : "Add"}
                variant="secondary"
            />
        </form>
    );
};

export default TaskForm;
