interface YearSelectorProps {
  maxYear: number;
  minYear: number;
  setCurrentView: React.Dispatch<
    React.SetStateAction<{ month: number; year: number }>
  >;
  setShowYearSelector: (value: boolean) => void;
}

const YearSelector = ({
  maxYear,
  minYear,
  setCurrentView,
  setShowYearSelector,
}: YearSelectorProps) => {
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
            setCurrentView((prev: { month: number; year: number }) => ({
              ...prev,
              year,
            }));
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

export default YearSelector;
