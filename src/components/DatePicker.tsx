import React, { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

interface PredefinedRangeOption {
  label: string;
  getDates: () => { startDate: Date; endDate: Date };
}

const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

const DEFAULT_PREDEFINED_RANGES: PredefinedRangeOption[] = [
  {
    label: "Last 30 Weekdays",
    getDates: () => {
      const endDate = new Date();
      const startDate = new Date();

      startDate.setDate(endDate.getDate() - 30);

      const weekdaysOnly = [];
      const current = new Date(startDate);

      while (current <= endDate) {
        if (!isWeekend(current)) {
          weekdaysOnly.push(new Date(current));
        }
        current.setDate(current.getDate() + 1);
      }

      return {
        startDate: weekdaysOnly[0],
        endDate: weekdaysOnly[weekdaysOnly.length - 1],
      };
    },
  },
  {
    label: "Last 7 Weekdays",
    getDates: () => {
      const endDate = new Date();
      const startDate = new Date();
      let count = 7;
      while (count > 0) {
        if (!isWeekend(startDate)) count--;
        startDate.setDate(startDate.getDate() - 1);
      }
      return { startDate: startDate, endDate };
    },
  },
];

const WeekdayDateRangePicker: React.FC<{
  onDateSelect: (
    start: Date | null,
    end: Date | null,
    weekends: Date[]
  ) => void;
}> = ({ onDateSelect }) => {
  const minYear = 2020;
  const maxYear = new Date().getFullYear() + 5;
  const disablePastDates = false;

  const [currentView, setCurrentView] = useState<{
    month: number;
    year: number;
  }>({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const [selectedDateRange, setSelectedDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });

  const [showMonthSelector, setShowMonthSelector] = useState(false);
  const [showYearSelector, setShowYearSelector] = useState(false);

  const isWeekend = (date: Date): boolean =>
    date.getDay() === 0 || date.getDay() === 6;

  const isValidDate = (date: Date): boolean => {
    if (isWeekend(date)) return false;

    if (disablePastDates && date < new Date()) return false;

    return true;
  };

  const generateMonthDays = (month: number, year: number): (Date | null)[] => {
    const days: (Date | null)[] = [];
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      days.push(new Date(year, month, day));
    }
    if (firstDayOfWeek > 0) {
      days.unshift(...Array(firstDayOfWeek).fill(null));
    }

    while (days.length < 42) {
      days.push(null);
    }

    console.log(days, "days");
    return days;
  };

  const handleDateSelection = (date: Date) => {
    if (!isValidDate(date)) return;

    const { start, end } = selectedDateRange;
    if (!start || (start && end)) {
      setSelectedDateRange({ start: date, end: null });
    } else {
      const newStart = start > date ? date : start;
      const newEnd = start > date ? start : date;
      const weekendDates = getWeekendsBetween(newStart, newEnd);
      setSelectedDateRange({ start: newStart, end: newEnd });
      onDateSelect(newStart, newEnd, weekendDates);
    }
  };

  const getWeekendsBetween = (start: Date, end: Date): Date[] => {
    const weekends: Date[] = [];
    const current = new Date(start);

    while (current <= end) {
      if (isWeekend(current)) {
        weekends.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    }
    return weekends;
  };

  const predefinedRanges = DEFAULT_PREDEFINED_RANGES;

  const renderMonthSelector = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return (
      <div className="grid grid-cols-4 gap-2 p-4 bg-white shadow-lg rounded-lg">
        {months.map((month, index) => (
          <button
            key={month}
            onClick={() => {
              setCurrentView((prev) => ({ ...prev, month: index }));
              setShowMonthSelector(false);
            }}
            className="p-2 hover:bg-red-100 rounded transition-colors"
          >
            {month}
          </button>
        ))}
      </div>
    );
  };
  const renderYearSelector = () => {
    const years = Array.from(
      { length: maxYear - minYear + 1 },
      (_, i) => minYear + i
    );

    return (
      <div className="grid grid-cols-4 gap-2 p-4 bg-white shadow-lg rounded-lg max-h-60 overflow-y-auto">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => {
              setCurrentView((prev) => ({ ...prev, year }));
              setShowYearSelector(false);
            }}
            className="p-2 hover:bg-red-100 rounded transition-colors"
          >
            {year}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-2xl space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowMonthSelector(!showMonthSelector)}
            className="text-xl font-semibold hover:bg-gray-100 p-2 rounded"
          >
            {new Date(currentView.year, currentView.month).toLocaleString(
              "default",
              { month: "long" }
            )}
          </button>

          <button
            onClick={() => setShowYearSelector(!showYearSelector)}
            className="text-xl font-semibold hover:bg-gray-100 p-2 rounded"
          >
            {currentView.year}
          </button>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() =>
              setCurrentView((prev) => ({
                month: prev.month === 0 ? 11 : prev.month - 1,
                year: prev.month === 0 ? prev.year - 1 : prev.year,
              }))
            }
            className="p-2 hover:bg-gray-100 rounded"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() =>
              setCurrentView((prev) => ({
                month: prev.month === 11 ? 0 : prev.month + 1,
                year: prev.month === 11 ? prev.year + 1 : prev.year,
              }))
            }
            className="p-2 hover:bg-gray-100 rounded"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {showMonthSelector && renderMonthSelector()}
      {showYearSelector && renderYearSelector()}

      <div className="grid grid-cols-7 gap-2 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="font-bold text-gray-500">
            {day}
          </div>
        ))}

        {generateMonthDays(currentView.month, currentView.year).map(
          (date, index) => {
            if (date === null) {
              return <div key={`empty-${index}`} className=""></div>;
            }

            const isCurrentMonth = date.getMonth() === currentView.month;

            const isSelected =
              (selectedDateRange.start &&
                date.toDateString() ===
                  selectedDateRange.start.toDateString()) ||
              (selectedDateRange.end &&
                date.toDateString() === selectedDateRange.end.toDateString());

            const isInRange =
              selectedDateRange.start &&
              selectedDateRange.end &&
              date >= selectedDateRange.start &&
              date <= selectedDateRange.end;

            return (
              <button
                key={date.toISOString()}
                onClick={() => handleDateSelection(date)}
                disabled={!isValidDate(date)}
                className={`
                p-2 rounded-full transition-all
                ${!isCurrentMonth ? "text-gray-300" : ""}
                ${!isValidDate(date) ? "text-gray-300 cursor-not-allowed" : ""}
                ${isSelected ? "bg-red-600 text-white" : ""}
                ${isInRange ? "bg-red-100" : ""}
                ${isWeekend(date) ? "text-gray-300" : ""}
                hover:bg-red-200
              `}
              >
                {date.getDate()}
              </button>
            );
          }
        )}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div>
          <div className="text-sm text-gray-600">Selected Dates:</div>
          <div className="flex space-x-2">
            {selectedDateRange.start && (
              <div className="bg-red-100 px-2 py-1 rounded flex items-center">
                <CalendarDays size={16} className="mr-2" />
                {selectedDateRange.start.toLocaleDateString()}
                {selectedDateRange.end && (
                  <span className="ml-2">
                    - {selectedDateRange.end.toLocaleDateString()}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex space-x-2 mt-4">
        {predefinedRanges.map((range) => (
          <button
            key={range.label}
            onClick={() => {
              const { startDate, endDate } = range.getDates();
              const weekendDates = getWeekendsBetween(startDate, endDate);
              setSelectedDateRange({ start: startDate, end: endDate });
              onDateSelect(startDate, endDate, weekendDates);
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeekdayDateRangePicker;
