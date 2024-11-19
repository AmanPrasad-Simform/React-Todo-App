import { useState } from "react";
import { useSelector } from "react-redux";
import TaskItem from "@/components/TaskItem";
import Button from "@/components/Button";

const RenderTasks = ({ taskList }) => {
    return taskList.length === 0 ? (
        <li className="text-gray-500">No tasks available</li>
    ) : (
        taskList.map((task) => <TaskItem key={task.id} task={task} />)
    );
};

const TaskList = () => {
    const { tasks } = useSelector((state) => state.todos);

    const [selectedTab, setSelectedTab] = useState("active");

    const toggleTab = (tab) => {
        setSelectedTab(tab);
    };

    const taskGroups = {
        active: tasks.filter((task) => !task.completed),
        completed: tasks.filter((task) => task.completed),
    };

    return (
        <div className="mt-8 w-11/12 max-w-3xl bg-white rounded-lg shadow-lg p-6 text-gray-800">
            <div className="flex mb-6">
                {["active", "completed"].map((tab) => (
                    <Button
                        key={tab}
                        onClick={() => toggleTab(tab)}
                        text={`${
                            tab.charAt(0).toUpperCase() + tab.slice(1)
                        } Tasks`}
                        isSelected={selectedTab === tab}
                        variant="selected"
                        className={`${
                            selectedTab === tab
                                ? "bg-gray-600 text-white border-b-2 border-gray-600"
                                : "text-gray-500 hover:bg-gray-600"
                        } transition duration-300 rounded-lg py-2 px-4`}
                    />
                ))}
            </div>

            <div className="mt-6">
                <h3 className="font-semibold text-lg">
                    {selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)}{" "}
                    Tasks
                </h3>
                <ul className="mt-2 space-y-3 max-h-[40rem] overflow-y-auto">
                    {<RenderTasks taskList={taskGroups[selectedTab]} />}
                </ul>
            </div>
        </div>
    );
};

export default TaskList;
