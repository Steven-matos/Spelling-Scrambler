import React, { useState } from "react";

// Define the types for the props and state
type StepContentProps = {
  onNext: () => void;
  onPrevious: () => void;
};

const Step1: React.FC<StepContentProps> = ({ onNext }) => (
  <div>
    <h2 className="text-lg font-bold mb-4">Step 1</h2>
    <div className="mb-4">
      <label className="block mb-2">Name:</label>
      <input type="text" className="input" />
    </div>
    <div className="mb-4">
      <label className="block mb-2">Email:</label>
      <input type="email" className="input" />
    </div>
    <div className="mt-4 flex justify-end">
      <button type="button" onClick={onNext} className="btn">
        Next
      </button>
    </div>
  </div>
);

const Step2: React.FC<StepContentProps> = ({ onNext, onPrevious }) => (
  <div>
    <h2 className="text-lg font-bold mb-4">Step 2</h2>
    <div className="mb-4">
      <label className="block mb-2">Address:</label>
      <input type="text" className="input" />
    </div>
    <div className="mb-4">
      <label className="block mb-2">City:</label>
      <input type="text" className="input" />
    </div>
    <div className="mt-4 flex justify-between">
      <button type="button" onClick={onPrevious} className="btn">
        Previous
      </button>
      <button type="button" onClick={onNext} className="btn">
        Next
      </button>
    </div>
  </div>
);

const Step3: React.FC<StepContentProps> = ({ onPrevious }) => (
  <div>
    <h2 className="text-lg font-bold mb-4">Step 3</h2>
    <div className="mb-4">
      <label className="block mb-2">Username:</label>
      <input type="text" className="input" />
    </div>
    <div className="mb-4">
      <label className="block mb-2">Password:</label>
      <input type="password" className="input" />
    </div>
    <div className="mt-4 flex justify-between">
      <button type="button" onClick={onPrevious} className="btn">
        Previous
      </button>
      <button type="submit" className="btn">
        Submit
      </button>
    </div>
  </div>
);

const ProgressBar: React.FC<{ step: number; totalSteps: number }> = ({
  step,
  totalSteps,
}) => {
  const progressPercentage = (step / totalSteps) * 100;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-blue-600 h-2.5 rounded-full"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

const FormWithProgress: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const totalSteps = 3;

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <Step1 onNext={nextStep} onPrevious={prevStep} />;
      case 2:
        return <Step2 onNext={nextStep} onPrevious={prevStep} />;
      case 3:
        return <Step3 onNext={nextStep} onPrevious={prevStep} />;
      default:
        return <Step1 onNext={nextStep} onPrevious={prevStep} />;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ProgressBar step={step} totalSteps={totalSteps} />
      <form className="mt-4">{renderStepContent()}</form>
    </div>
  );
};

export default FormWithProgress;
