interface MonthSelectorProps {
    setCurrentView: React.Dispatch<React.SetStateAction<{ month: number; year: number }>>;
    setShowMonthSelector: (value: boolean) => void;
  }

const MonthSelector = ({
  setCurrentView,
  setShowMonthSelector,
}: MonthSelectorProps) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="grid grid-cols-4 gap-2 p-4 bg-white shadow-lg rounded-lg">
      {months.map((month, index) => (
        <button
          key={month}
          onClick={() => {
            setCurrentView((prev) => ({
              ...prev,
              month: index,
            }));
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

export default MonthSelector;
