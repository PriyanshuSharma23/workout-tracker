"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  return (
    <div className="min-h-screen p-4 max-w-md mx-auto bg-gray-900">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">
        Workout Tracker
      </h1>

      <div className="space-y-4 mb-6">
        <div className="flex flex-col">
          <label
            htmlFor="date"
            className="text-sm font-medium mb-1 text-gray-300"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border rounded-lg p-2 bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>

      <div className="space-y-4">
        <button
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => router.push(`/workout/${date}`)}
        >
          Start New Workout
        </button>

        <button
          className="w-full border border-gray-700 py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors text-gray-300"
          onClick={() => {}}
        >
          View History
        </button>
      </div>
    </div>
  );
}
