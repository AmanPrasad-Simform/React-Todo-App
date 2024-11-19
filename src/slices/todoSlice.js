import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: "todos",
    initialState: {
        tasks: [],
        isEditing: null,
        selectedDate: new Date().toLocaleDateString(),
    },
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },
        setEditing: (state, action) => {
            state.isEditing = action.payload;
        },
        setSelectedDate: (state, action) => {
            state.selectedDate = action.payload;
        },
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        updateTask: (state, action) => {
            const { id, updatedTask } = action.payload;
            const taskIndex = state.tasks.findIndex((task) => task.id === id);
            if (taskIndex >= 0) {
                state.tasks[taskIndex] = {
                    ...state.tasks[taskIndex],
                    ...updatedTask,
                };
            }
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(
                (task) => task.id !== action.payload
            );
        },
        toggleTaskCompletion: (state, action) => {
            const taskIndex = state.tasks.findIndex(
                (task) => task.id === action.payload
            );
            if (taskIndex >= 0) {
                state.tasks[taskIndex].completed =
                    !state.tasks[taskIndex].completed;
            }
        },
        changeDateToNewDueDate: (state) => {
            const today = new Date();
            const isWeekend = today.getDay() === 0 || today.getDay() === 6;

            if (isWeekend) {
                const daysToAdd = today.getDay() === 0 ? 1 : 2;
                today.setDate(today.getDate() + daysToAdd);
            }

            const formattedToday = today.toLocaleDateString();

            state.tasks.forEach((task) => {
                if (!task.completed && task.date < formattedToday) {
                    task.date = formattedToday;
                }
            });
        },
    },
});

export const {
    setTasks,
    setEditing,
    setSelectedDate,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    changeDateToNewDueDate,
} = todoSlice.actions;

export default todoSlice.reducer;
