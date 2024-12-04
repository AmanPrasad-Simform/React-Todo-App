import { useState, useContext } from "react";
import TaskItem from "./TaskItem";
import MyContext from "../context/TodoContext";

const TaskList = () => {
    const { tasks } = useContext(MyContext);
    const [selectedTab, setSelectedTab] = useState("active");

    const toggleTab = (tab) => {
        setSelectedTab(tab);
    };

    const activeTasks = tasks.filter((task) => !task.completed);

    const completedTasks = tasks.filter((task) => task.completed);

    return (
        <>
            <div className="mt-8 w-11/12 max-w-3xl bg-white rounded-lg shadow-lg p-6 text-gray-800">
                <div className="flex mb-6">
                    <button
                        onClick={() => toggleTab("active")}
                        className={`${
                            selectedTab === "active"
                                ? "text-purple-600 border-b-2 border-purple-600"
                                : "text-gray-500"
                        } w-1/2 py-2 px-4 transition duration-300 text-center`}
                    >
                        Active Tasks
                    </button>
                    <button
                        onClick={() => toggleTab("completed")}
                        className={`${
                            selectedTab === "completed"
                                ? "text-purple-600 border-b-2 border-purple-600"
                                : "text-gray-500"
                        } w-1/2 py-2 px-4 transition duration-300 text-center`}
                    >
                        Completed Tasks
                    </button>
                </div>

                {/* Task List Display */}
                {selectedTab === "active" ? (
                    <div className="mt-6">
                        <h3 className="font-semibold text-lg">Active Tasks</h3>
                        <ul className="mt-2 space-y-3 max-h-[40rem] overflow-y-auto">
                            {activeTasks.length === 0 ? (
                                <li className="text-gray-500">
                                    No active tasks
                                </li>
                            ) : (
                                activeTasks.map((task) => (
                                    <TaskItem key={task.id} task={task} />
                                ))
                            )}
                        </ul>
                    </div>
                ) : (
                    <div className="mt-6">
                        <h3 className="font-semibold text-lg">
                            Completed Tasks
                        </h3>
                        <ul className="mt-2 space-y-3 max-h-[40rem] overflow-y-auto">
                            {completedTasks.length === 0 ? (
                                <li className="text-gray-500">
                                    No completed tasks
                                </li>
                            ) : (
                                completedTasks.map((task) => (
                                    <TaskItem key={task.id} task={task} />
                                ))
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};

export default TaskList;
