import { useState } from "react";

import {
  format,
  getDay,
  parse,
  startOfWeek,
  addMonths,
  subMonths,
} from "date-fns";
import { enUS } from "date-fns/locale";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";

import { Button } from "@/components/ui/button";

import { Task } from "../types";

import { EventCard } from "./event-card";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./data-calendar.css";

interface CustomToolbarProps {
  date: Date;
  onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
}

const CustomToolbar = ({ date, onNavigate }: CustomToolbarProps) => {
  return (
    <div className="flex gap-x-2 justify-center items-center mb-4 w-full lg:w-auto lg:justify-start">
      <Button
        variant="secondary"
        size="icon"
        onClick={() => onNavigate("PREV")}
      >
        <ChevronLeftIcon className="size-4" />
        <span className="sr-only">Previous</span>
      </Button>
      <div className="flex justify-center items-center px-3 py-2 w-full h-8 rounded-md border border-input lg:w-auto">
        <CalendarIcon className="mr-2 size-4" />
        <p className="text-sm font-medium">{format(date, "MMMM yyyy")}</p>
      </div>
      <Button
        variant="secondary"
        size="icon"
        onClick={() => onNavigate("NEXT")}
      >
        <ChevronRightIcon className="size-4" />
        <span className="sr-only">Next</span>
      </Button>
    </div>
  );
};

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface DataCalendarProps {
  data: Task[];
}

export const DataCalendar = ({ data }: DataCalendarProps) => {
  const [value, setValue] = useState(
    data.length > 0 ? new Date(data[0].dueDate) : new Date(),
  );

  const events = data.map((task) => ({
    title: task.name,
    start: new Date(task.dueDate),
    end: new Date(task.dueDate),
    project: task.project,
    assignee: task.assignee,
    status: task.status,
    id: task.$id,
  }));

  const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
    if (action === "PREV") {
      setValue(subMonths(value, 1));
    } else if (action === "NEXT") {
      setValue(addMonths(value, 1));
    } else if (action === "TODAY") {
      setValue(new Date());
    }
  };

  return (
    <Calendar
      date={value}
      defaultView="month"
      events={events}
      localizer={localizer}
      views={["month"]}
      showAllEvents
      toolbar
      className="h-full"
      max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
      formats={{
        weekdayFormat: (date, culture, localizer) =>
          localizer?.format(date, "EEE", culture) ?? "",
      }}
      components={{
        eventWrapper: ({ event }) => (
          <EventCard
            id={event.id}
            title={event.title}
            project={event.project}
            assignee={event.assignee}
            status={event.status}
          />
        ),
        toolbar: () => (
          <CustomToolbar date={value} onNavigate={handleNavigate} />
        ),
      }}
    />
  );
};
