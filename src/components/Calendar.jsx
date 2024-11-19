import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "@/Calendar.css";
import { parseDate } from "@/utils/dateUtil";

const CalendarComponent = ({
    selectedDate,
    onDateChange,
    taskDates,
    completedTaskDates,
}) => {
    const today = new Date();

    const parsedSelectedDate = parseDate(selectedDate);

    const getTileClassName = ({ date, view }) => {
        if (view === "month") {
            const dateString = date.toLocaleDateString();
            if (taskDates.has(dateString)) {
                return "task-day";
            }
            if (completedTaskDates.has(dateString)) {
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
                value={parsedSelectedDate}
                tileClassName={getTileClassName}
            />
        </div>
    );
};

export default CalendarComponent;
