type WorkoutDetailsProps = {
  dayName: string;
  setDayName: (value: string) => void;
  weight: string;
  setWeight: (value: string) => void;
};

export function WorkoutDetails({
  dayName,
  setDayName,
  weight,
  setWeight,
}: WorkoutDetailsProps) {
  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col">
        <label
          htmlFor="dayName"
          className="text-sm font-medium mb-1 text-gray-300 block"
        >
          Workout Name
        </label>
        <input
          type="text"
          id="dayName"
          value={dayName}
          onChange={(e) => setDayName(e.target.value)}
          placeholder="e.g. Push Day, Upper Body, etc."
          className="w-full border rounded-lg p-2 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="weight"
          className="text-sm font-medium mb-1 text-gray-300"
        >
          Weight (kg)
        </label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Enter your weight"
          className="w-full border rounded-lg p-2 bg-gray-800 border-gray-700 text-white placeholder-gray-500"
        />
      </div>
    </div>
  );
}