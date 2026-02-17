"use client";

import { Calendar, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Mock date-fns functions for demo
const format = (date, formatStr) => {
  if (!date) return "";
  if (formatStr === "dd/MM/yyyy") {
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
  }
  if (formatStr === "MMM") {
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
    return months[date.getMonth()];
  }
  return date.toString();
};

const eachYearOfInterval = ({ start, end }) => {
  const years = [];
  for (let year = start.getFullYear(); year <= end.getFullYear(); year++) {
    years.push(new Date(year, 0));
  }
  return years;
};

const eachMonthOfInterval = ({ start, end }) => {
  const months = [];
  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  for (let year = startYear; year <= endYear; year++) {
    const startMonth = year === startYear ? start.getMonth() : 0;
    const endMonth = year === endYear ? end.getMonth() : 11;

    for (let month = startMonth; month <= endMonth; month++) {
      months.push(new Date(year, month));
    }
  }
  return months;
};

const startOfYear = (date) => new Date(date.getFullYear(), 0);
const endOfYear = (date) => new Date(date.getFullYear(), 11);
const isBefore = (date1, date2) => date1 < date2;
const isAfter = (date1, date2) => date1 > date2;

const Button = ({
  children,
  className = "",
  variant = "default",
  size = "default",
  onClick,
  disabled,
  ...props
}) => (
  <button
    className={`inline-flex items-center justify-center rounded-md px-3 text-sm font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50 ${
      variant === "ghost"
        ? "hover:bg-accent hover:text-accent-foreground"
        : variant === "outline"
          ? "border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          : "bg-primary text-primary-foreground hover:bg-primary/90"
    } ${size === "sm" ? "px-2 py-1 text-xs" : ""} ${className}`}
    onClick={onClick}
    disabled={disabled}
    {...props}
  >
    {children}
  </button>
);

const ScrollArea = ({ children, className = "", ...props }) => (
  <div
    className={`overflow-auto ${className}`}
    style={{ maxHeight: "300px" }}
    {...props}
  >
    {children}
  </div>
);

const Collapsible = ({ children, className = "", defaultOpen }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className={className} data-state={isOpen ? "open" : "closed"}>
      {children}
    </div>
  );
};

const CollapsibleTrigger = ({ children, asChild, ...props }) => (
  <div {...props}>{children}</div>
);

const CollapsibleContent = ({ children, className = "" }) => (
  <div className={className}>{children}</div>
);

export default function FormCalender() {
  const today = new Date();
  const [month, setMonth] = useState(today);
  const [date, setDate] = useState(undefined);
  const [isYearView, setIsYearView] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const startDate = new Date(1980, 6);
  const endDate = new Date(2030, 6);
  const inputRef = useRef(null);
  const calendarRef = useRef(null);

  const years = eachYearOfInterval({
    start: startOfYear(startDate),
    end: endOfYear(endDate),
  });

  const formatDateForInput = (date) => {
    if (!date) return "";
    return format(date, "dd/MM/yyyy");
  };

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    if (selectedDate) {
      setIsCalendarOpen(false);
    }
  };

  const handleInputClick = () => {
    setIsCalendarOpen(true);
  };


  // Add useEffect to track state changes
  useEffect(() => {
    console.log("isYearView changed to:", isYearView);
  }, [isYearView]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setIsCalendarOpen(false);
      }
    };

    if (isCalendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarOpen]);

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="DD/MM/YYYY"
          value={formatDateForInput(date)}
          onClick={handleInputClick}
          readOnly
          className="w-full cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-2 pr-10 text-sm focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        />
        <Calendar
          size={16}
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400"
        />
      </div>

      {isCalendarOpen && (
        <div
          ref={calendarRef}
          className="absolute top-full left-0 z-50 mt-1 w-80 rounded-md border bg-white shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between border-b p-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsYearView((prev) => {
                  console.log("Toggling year view from", prev, "to", !prev);
                  return !prev;
                });
              }}
              className="flex items-center gap-2"
            >
              {format(month, "MMM")} {month.getFullYear()}
              <ChevronDown
                size={16}
                className={`transform transition-transform ${isYearView ? "rotate-180" : ""}`}
              />
            </Button>

            {/* Debug toggle */}
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsYearView((prev) => {
                  console.log("Debug toggle from", prev, "to", !prev);
                  return !prev;
                });
              }}
            >
              {isYearView ? "Calendar" : "Years"}
            </Button>
          </div>

          <div className="relative">
            {/* Regular Calendar View */}
            {!isYearView && (
              <div className="p-3">
                <SimpleCalendar
                  month={month}
                  selectedDate={date}
                  onDateSelect={handleDateSelect}
                  onMonthChange={setMonth}
                />
              </div>
            )}

            {/* Year/Month Selector View */}
            {isYearView && (
              <div
                className="absolute inset-0 z-10 border-t bg-white"
                style={{ height: "400px" }}
              >
                <div className="h-full overflow-y-auto p-3">
                  <YearMonthSelector
                    years={years}
                    currentYear={month.getFullYear()}
                    currentMonth={month.getMonth()}
                    startDate={startDate}
                    endDate={endDate}
                    onMonthSelect={(selectedMonth) => {
                      setMonth(selectedMonth);
                      setIsYearView(false);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function SimpleCalendar({ month, selectedDate, onDateSelect, onMonthChange }) {
  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0,
  ).getDate();
  const firstDayOfMonth = new Date(
    month.getFullYear(),
    month.getMonth(),
    1,
  ).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(month.getFullYear(), month.getMonth(), i));
  }

  return (
    <div>
      <div className="mb-2 grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-500">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="p-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => day && onDateSelect(day)}
            className={`rounded p-2 text-sm hover:bg-gray-100 ${
              day &&
              selectedDate &&
              day.toDateString() === selectedDate.toDateString()
                ? "bg-blue-500 text-white"
                : day
                  ? "text-gray-900"
                  : "text-transparent"
            }`}
            disabled={!day}
          >
            {day ? day.getDate() : ""}
          </button>
        ))}
      </div>
    </div>
  );
}

function YearMonthSelector({
  years,
  currentYear,
  currentMonth,
  startDate,
  endDate,
  onMonthSelect,
}) {
  const currentYearRef = useRef(null);

  useEffect(() => {
    if (currentYearRef.current) {
      currentYearRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

  return (
    <div className="space-y-4">
      {years.map((year) => {
        const months = eachMonthOfInterval({
          start: startOfYear(year),
          end: endOfYear(year),
        });
        const isCurrentYear = year.getFullYear() === currentYear;

        return (
          <div
            key={year.getFullYear()}
            ref={isCurrentYear ? currentYearRef : undefined}
            className={`rounded-lg border p-3 ${isCurrentYear ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
          >
            <h3 className="mb-3 text-lg font-medium">{year.getFullYear()}</h3>
            <div className="grid grid-cols-3 gap-2">
              {months.map((month) => {
                const isDisabled =
                  isBefore(month, startDate) || isAfter(month, endDate);
                const isCurrentMonth =
                  month.getMonth() === currentMonth &&
                  year.getFullYear() === currentYear;

                return (
                  <Button
                    key={month.getTime()}
                    variant={isCurrentMonth ? "default" : "outline"}
                    size="sm"
                    className="h-8"
                    disabled={isDisabled}
                    onClick={() => onMonthSelect(month)}
                  >
                    {format(month, "MMM")}
                  </Button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
