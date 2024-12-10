// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { changeDateToNewDueDate } from "@/slices/todoSlice";
// import { lazy, useEffect } from "react";
// import Layout from "@/components/Layout";

// const TodoList = lazy(() => import("./components/TodoList"));
// const TaskList = lazy(() => import("./components/TaskList"));

// function App() {
//     const dispatch = useDispatch();
//     useEffect(() => {
//         // Dispatch action when the component mounts
//         dispatch(changeDateToNewDueDate());
//     }, [dispatch]);

//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Layout />}>
//                     <Route index element={<TodoList />} />
//                     <Route path="addTask" element={<TodoList />} />
//                     <Route path="tasks" element={<TaskList />} />
//                     <Route path="*" element={<h1>404</h1>} />
//                 </Route>
//             </Routes>
//         </Router>
//     );
// }

// export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeDateToNewDueDate } from "@/slices/todoSlice";
import { lazy, useEffect } from "react";
import Layout from "@/components/Layout";

const TodoList = lazy(() => import("./components/TodoList"));
const TaskList = lazy(() => import("./components/TaskList"));

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // Dispatch action when the component mounts
        dispatch(changeDateToNewDueDate());
    }, [dispatch]);

    // Define the routes
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                { index: true, element: <TodoList /> }, // Default route
                { path: "addTask", element: <TodoList /> },
                { path: "tasks", element: <TaskList /> },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
