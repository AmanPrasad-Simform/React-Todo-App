import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TodoList from "./components/TodoList";
import TaskList from "./components/TaskList";
import { useDispatch } from "react-redux";
import { changeDateToNewDueDate } from "./slices/todoSlice";

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
