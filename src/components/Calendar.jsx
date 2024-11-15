import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarComponent = ({
    selectedDate,
    onDateChange,
    taskDates,
    completedTaskDates,
}) => {
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
