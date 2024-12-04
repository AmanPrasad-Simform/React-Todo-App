import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TodoList from "./components/TodoList";
import TaskList from "./components/TaskList";
import { useDispatch } from "react-redux";
import { useContext, useEffect } from "react";
import MyContext from "./context/TodoContext";

function App() {
    const { changeDateToNewDueDate } = useContext(MyContext);
    // changeDateToNewDueDate();
    // if used directly, UseContext will be called again and again thats why using useEffect
    useEffect(() => {
        changeDateToNewDueDate();
    }, []);

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
