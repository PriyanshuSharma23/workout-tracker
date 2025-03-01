"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Value } from "react-calendar/src/shared/types.js";

// Add these export constants
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Home() {
  const router = useRouter();
  const [date, setDate] = useState(new Date());

  const handleDateChange = (value: Value) => {
    if (!value) return;
    const selectedDate = value as Date;
    setDate(selectedDate);
    const formattedDate = `${selectedDate.getFullYear()}-${String(
      selectedDate.getMonth() + 1
    ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
    router.push(`/workout/${formattedDate}`);
  };

  return (
    <div className="min-h-screen p-4 max-w-md mx-auto bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">
        Workout Tracker
      </h1>

      <div className="mb-6 flex items-center justify-center">
        <Calendar
          onChange={handleDateChange}
          value={date}
          className="rounded-lg border border-gray-700 bg-gray-800 text-white p-4 w-full"
          tileClassName="text-white hover:bg-gray-700"
          maxDate={new Date()}
          prevLabel={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          }
          nextLabel={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          }
          navigationLabel={({ date }) => (
            <span className="text-gray-300">
              {date.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </span>
          )}
        />
      </div>

      <div className="space-y-4">
        <button
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() =>
            router.push(`/workout/${date.toISOString().split("T")[0]}`)
          }
        >
          Start New Workout
        </button>

        <button
          className="w-full border border-gray-700 py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors text-gray-300"
          onClick={() => router.push("/history")}
        >
          View History
        </button>
      </div>
    </div>
  );
}
