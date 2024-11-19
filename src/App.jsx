import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeDateToNewDueDate } from "@/slices/todoSlice";
import { lazy } from "react";
import Layout from "@/components/Layout";

const TodoList = lazy(() => import("./components/TodoList"));
const TaskList = lazy(() => import("./components/TaskList"));

function App() {
    const dispatch = useDispatch();
    dispatch(changeDateToNewDueDate());

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<TodoList />} />
                    <Route path="addTask" element={<TodoList />} />
                    <Route path="tasks" element={<TaskList />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
