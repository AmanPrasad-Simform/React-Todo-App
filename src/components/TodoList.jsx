import { useDispatch, useSelector } from "react-redux";
import Calendar from "@/components/Calendar";
import TaskForm from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";
import { setSelectedDate } from "@/slices/todoSlice";
import { Suspense } from "react";
const SelectedDateTaskList = ({ tasks, selectedDate }) => {
    return (
        <div>
            <h3 className="font-semibold text-lg mt-4">
                Active Tasks for {selectedDate}
            </h3>
            <ul className="mt-2 space-y-1 max-h-60 overflow-y-auto p-2">
                {tasks.length === 0 ? (
                    <li className="text-gray-500">
                        No active tasks for this day
                    </li>
                ) : (
                    tasks.map((task) => <TaskItem key={task.id} task={task} />)
                )}
            </ul>
        </div>
    );
};

const TodoList = () => {
    const dispatch = useDispatch();
    const { tasks, selectedDate } = useSelector((state) => state.todos);

    const selectedDateActiveTasks = tasks.filter(
        (task) => task.date === selectedDate && !task.completed
    );

    const taskDates = new Set(
        tasks.filter((task) => !task.completed).map((task) => task.date)
    );

    const completedTaskDates = new Set(
        tasks.filter((task) => task.completed).map((task) => task.date)
    );

    return (
        <div className="mt-8 w-11/12 max-w-3xl bg-white rounded-lg shadow-lg p-6 text-gray-800">
            <div className="flex flex-col sm:flex-row sm:space-x-8 mb-8">
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
                <div className="w-full sm:w-1/2">
                    <Suspense fallback={<>Loading....</>}>
                        <TaskForm />
                    </Suspense>
                </div>
            </div>

            <SelectedDateTaskList
                tasks={selectedDateActiveTasks}
                selectedDate={selectedDate}
            />
        </div>
    );
};

export default TodoList;
