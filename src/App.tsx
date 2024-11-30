import { useState } from "react";
import WeekdayDateRangePicker from "./components/DatePicker";
import "./index.css";

function App() {
  const [selectedDates, setSelectedDates] = useState<{
    start: Date | null;
    end: Date | null;
    weekends: Date[];
  }>({
    start: null,
    end: null,
    weekends: [],
  });
  return (
    <>
      <div className="flex items-center justify-center h-full w-full pt-28">
        <WeekdayDateRangePicker
          onDateSelect={(start, end, weekends) =>
            setSelectedDates({ start, end, weekends })
          }
        />
      </div>
      <div className="text-center my-10">
        {selectedDates.start?.toDateString()} -{" "}
        {selectedDates.end?.toDateString()}
      </div>
      <div className="text-center my-10">
        Weekend Dates - {selectedDates.weekends.map(date => date.toLocaleDateString()).join(", ")}
      </div>
    </>
  );
}

export default App;
