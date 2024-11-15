// src/components/TodoList.js
import { useDispatch, useSelector } from "react-redux";
import Calendar from "./Calendar";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import {
    setSelectedDate,
    addTask,
    updateTask,
    setEditing,
} from "../slices/todoSlice";

const TodoList = () => {
    const dispatch = useDispatch();
    const { tasks, isEditing, selectedDate } = useSelector(
        (state) => state.todos
    );

    const onSubmit = (data) => {
        const taskDate = selectedDate;
        if (isEditing !== null) {
            dispatch(
                updateTask({
                    id: isEditing,
                    updatedTask: { name: data.taskTitle },
                })
            );
            dispatch(setEditing(null));
        } else {
            const newTask = {
                id: Date.now(),
                name: data.taskTitle,
                completed: false,
                date: taskDate,
            };
            dispatch(addTask(newTask));
        }
    };

    const selectedDateActiveTasks = tasks.filter(
        (task) => task.date === selectedDate && !task.completed
    );

    const completedTasks = tasks.filter((task) => task.completed);

    const taskDates = new Set(
        tasks.filter((task) => !task.completed).map((task) => task.date)
    );
    const completedTaskDates = new Set(completedTasks.map((task) => task.date));

    return (
        <div className="mt-8 w-11/12 max-w-3xl bg-white rounded-lg shadow-lg p-6 text-gray-800">
            <div className="flex flex-col sm:flex-row sm:space-x-8 mb-8">
                {/* Calendar Component */}
                <div className="w-full sm:w-1/2">
                    <Calendar
                        selectedDate={selectedDate}
                        onDateChange={(date) =>
                            dispatch(setSelectedDate(date.toLocaleDateString()))
                        }
                        taskDates={taskDates}
                        completedTaskDates={completedTaskDates}
                    />
                </div>

                {/* TaskForm Component */}
                <div className="w-full sm:w-1/2">
                    <TaskForm onSubmit={onSubmit} isEditing={isEditing} />
                </div>
            </div>

            <div>
                <h3 className="font-semibold text-lg mt-4">
                    Active Tasks for {selectedDate}
                </h3>
                <ul className="mt-2 space-y-1 max-h-60 overflow-y-auto p-2">
                    {selectedDateActiveTasks.length === 0 ? (
                        <li className="text-gray-500">
                            No active tasks for this day
                        </li>
                    ) : (
                        selectedDateActiveTasks.map((task) => (
                            <TaskItem key={task.id} task={task} />
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default TodoList;
