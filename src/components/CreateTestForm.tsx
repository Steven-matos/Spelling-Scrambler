import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { Button } from "@aws-amplify/ui-react";
import { Toast, ToastType } from "./Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { generateClient } from "aws-amplify/data";
import { type Schema } from "../../amplify/data/resource";

const client = generateClient<Schema>();

type TestType = {
  id: string;
  weekof: string;
  words: WordType[];
};

type WordType = {
  id: string;
  word: string;
  testId: string;
};

type StepContentProps = {
  onNext: () => void;
  onPrevious?: () => void;
  handleDateChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  setWordList: React.Dispatch<React.SetStateAction<string[]>>;
  date?: string;
  wordList?: Array<string>;
  showToast: (type: ToastType, message: string) => void;
  onSubmit: () => void;
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

const Step2: React.FC<StepContentProps> = ({
  onPrevious,
  wordList = [],
  setWordList,
  showToast,
  onSubmit,
}) => {
  const [inputWord, setInputWord] = useState<string>("");

  const handleAddWord = () => {
    if (inputWord.trim() !== "") {
      setWordList((prevWordList) => [
        ...prevWordList,
        inputWord.trim().toLowerCase(),
      ]);
      setInputWord("");
    } else {
      showToast("warning", "Must type in a word to add.");
    }
  };

  const handleRemoveWord = (index: number) => {
    setWordList((prevWordList) => {
      const newList = [...prevWordList];
      newList.splice(index, 1);
      return newList;
    });
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddWord();
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Step 2</h2>
      <div className="mb-4">
        <label className="block mb-2">Word:</label>
        <div className="flex mb-10">
          <input
            type="text"
            className="input flex-grow mr-2 border-black border rounded-md"
            value={inputWord}
            onChange={(e) => setInputWord(e.target.value)}
            onKeyDown={handleKeyPress as unknown as undefined}
          />
          <button
            type="button"
            onClick={handleAddWord}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        {wordList.length > 0 && (
          <div className="mb-10">
            <p>List of Words:</p>
            <ol className="pl-4">
              {wordList.map((word, index) => (
                <li
                  key={index}
                  className="flex items-center"
                  onClick={() => handleRemoveWord(index)}
                >
                  {word}
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="ml-2 cursor-pointer text-red-600"
                  />
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between">
        <Button onClick={onPrevious}>Previous</Button>
        <Button onClick={onSubmit}>Submit</Button>
      </div>
    </div>
  );
};

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

const CreateTestForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [date, setDate] = useState<string>("");
  const [wordList, setWordList] = useState<Array<string>>([]);
  const [toast, setToast] = useState<{
    type: ToastType;
    message: string;
  } | null>(null);

  const showToast = (type: ToastType, message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 3000); // Auto close after 3 seconds
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setDate(event.target.value);
  };

  const totalSteps = 2;

  const nextStep = () => {
    if (!date) {
      showToast("error", "Date Required");
    } else {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const onSubmit = async () => {
    const dataSet = {
      date: date,
      wordList: wordList,
    };
    console.log("Checking all data: ", dataSet);

    createTest(dataSet);

    showToast("success", "Test Created.");
  };

  const createTest = async (dataSet: { date: string; wordList: string[] }) => {
    const { date, wordList } = dataSet;

    try {
      const response = await client.models.Tests.create({
        weekof: date,
      });

      if (response.errors) {
        showToast("error", "Failed to Generate Test");
        return;
      }

      const Test = response.data; // Type assertion here

      if (!Test || !Test.id) {
        showToast("error", "Failed to Generate Test");
        return;
      }

      for (const word of wordList) {
        try {
          await addWordsToBackend({ word, testId: Test.id });
        } catch (error) {
          await client.models.Tests.delete({
            id: Test.id,
          });
          showToast("error", "Failed to Generate Test");
          return;
        }
      }

      showToast("success", "Test Generated Successfully");
    } catch (error) {
      showToast("error", "Failed to Generate Test");
    }
  };

  const addWordsToBackend = async (data: { word: string; testId: string }) => {
    const { word, testId } = data;
    const response = await client.models.Words.create({
      testId: testId,
      word: word,
    });

    if (response.errors) {
      throw new Error("Failed to add word to backend");
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Step1
            onNext={nextStep}
            handleDateChange={handleDateChange}
            date={date}
            setWordList={function (): void {
              throw new Error("Function not implemented.");
            }}
            showToast={function (): void {
              throw new Error("Function not implemented.");
            }}
            onSubmit={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        );
      case 2:
        return (
          <Step2
            onNext={nextStep}
            onPrevious={prevStep}
            wordList={wordList}
            setWordList={setWordList}
            showToast={showToast}
            onSubmit={onSubmit}
          />
        );
      default:
        return (
          <Step1
            onNext={nextStep}
            handleDateChange={handleDateChange}
            date={date}
            setWordList={function (): void {
              throw new Error("Function not implemented.");
            }}
            showToast={function (): void {
              throw new Error("Function not implemented.");
            }}
            onSubmit={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
        );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <ProgressBar step={step} totalSteps={totalSteps} />
      <form className="mt-4">{renderStepContent()}</form>
      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default CreateTestForm;
