import React from "react";
import { Button } from "@aws-amplify/ui-react";

type StepContentProps = {
  onNext: () => void;
  handleDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  date: string;
};

const Step1: React.FC<StepContentProps> = ({
  onNext,
  handleDateChange,
  date,
}) => (
  <div>
    <h2 className="text-lg font-bold mb-4">Step 1</h2>
    <div className="mb-4">
      <label className="block mb-2">Date:</label>
      <input
        type="date"
        id="date"
        name="date"
        value={date}
        onChange={handleDateChange}
        required
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </div>
    <div className="mt-4 flex justify-end">
      <Button onClick={onNext}>Next</Button>
    </div>
  </div>
);

export default Step1;
