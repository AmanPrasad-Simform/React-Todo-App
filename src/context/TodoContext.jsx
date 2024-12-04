// src/context/MyContext.js
import { createContext, useState } from "react";
import { updateTodo } from "../api/todosApi";

// Create the context
const MyContext = createContext();

// Context Provider component
export const MyProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const [isEditing, setIsEditing] = useState(null);
    const [selectedDate, setSelected] = useState(
        new Date().toLocaleDateString()
    );

    const setEditing = (value) => {
        setIsEditing(value);
    };

    const setSelectedDate = (value) => {
        setSelected(value.toLocaleDateString());
    };

    const addTask = (task) => {
        setTasks((prevTasks) => [...prevTasks, task]);
    };

    const updateTask = ({ id, updatedTask }) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, ...updatedTask } : task
            )
        );
    };

    const deleteTask = (value) => {
        setTasks(tasks.filter((task) => task.id !== value));
    };

    const toggleTaskCompletion = (taskId) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === taskId
                    ? { ...task, completed: !task.completed }
                    : task
            )
        );
    };

    const changeDateToNewDueDate = () => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (
                    !task.completed &&
                    task.date < new Date().toLocaleDateString()
                ) {
                    const today = new Date();
                    if (today.getDay() !== 0 && today.getDay() !== 6) {
                        // Sunday and Saturday
                        task.date = today.toLocaleDateString();
                    } else {
                        today.setDate(
                            today.getDate() +
                                ((1 + today.getDay() + 4) % 7 || 7)
                        );
                        task.date = today.toLocaleDateString();
                    }
                }
                return task;
            })
        );
    };

    return (
        <MyContext.Provider
            value={{
                tasks,
                isEditing,
                addTask,
                selectedDate,
                setSelectedDate,
                setEditing,
                updateTask,
                deleteTask,
                toggleTaskCompletion,
                changeDateToNewDueDate,
            }}
        >
            {children}
        </MyContext.Provider>
    );
};

export default MyContext;
