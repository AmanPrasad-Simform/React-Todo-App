import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useContext } from "react";
import MyContext from "../context/TodoContext";

const CalendarComponent = ({ onDateChange, taskDates, completedTaskDates }) => {
    // With a global state management library (like Redux), updated values are directly accessible.
    // However, in the Context API, state updates are batched and only reflected after the render cycle completes.
    const { selectedDate } = useContext(MyContext);
    const today = new Date();
    const parseDate = (dateStr) => {
        const [day, month, year] = dateStr.split("/");
        return new Date(`${year}-${month}-${day}`);
    };
    const parsedDate = parseDate(selectedDate);
    const tileClassName = ({ date, view }) => {
        if (view === "month") {
            if (taskDates.has(date.toLocaleDateString())) {
                return "task-day";
            }
            if (completedTaskDates.has(date.toLocaleDateString())) {
                return "completed-task-day";
            }
        }
        return "";
    };
    return (
        <div className="mb-4">
            <Calendar
                minDate={today}
                onChange={onDateChange}
                value={parsedDate}
                tileClassName={tileClassName}
            />
        </div>
    );
};

export default CalendarComponent;
