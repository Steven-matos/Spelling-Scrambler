import React, { useState, ChangeEvent } from "react";
import { Toast, ToastType } from "./Toast";
import { useNavigate, useParams } from "react-router-dom";
import { generateClient } from "aws-amplify/data";
import { type Schema } from "../../amplify/data/resource";
import Step1 from "./TestForms/Step1";
import Step2 from "./TestForms/Step2";
import ProgressBar from "./TestForms/ProgressBar";

const client = generateClient<Schema>();

const CreateTestForm: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [date, setDate] = useState<string>("");
  const [wordList, setWordList] = useState<Array<string>>([]);
  const [toast, setToast] = useState<{
    type: ToastType;
    message: string;
  } | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const showToast = (type: ToastType, message: string) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
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
    const dataSet = { date, wordList };
    createTest(dataSet);
    showToast("success", "Test Created.");
  };

  const createTest = async (dataSet: { date: string; wordList: string[] }) => {
    const { date, wordList } = dataSet;

    try {
      const { errors, data: Test } = await client.models.Tests.create({
        weekof: date,
        taken: 0,
        correct: 0,
      });

      if (errors || !Test || !Test.id) {
        showToast("error", "Failed to Generate Test");
        return;
      }

      for (const word of wordList) {
        try {
          await addWordsToBackend({ word, testId: Test.id });
        } catch (error) {
          await client.models.Tests.delete({ id: Test.id });
          showToast("error", "Failed to Generate Test");
          return;
        }
      }

      navigate(`/dashboard/${id}`);
      showToast("success", "Test Generated Successfully");
    } catch (error) {
      showToast("error", "Failed to Generate Test");
    }
  };

  const addWordsToBackend = async (data: { word: string; testId: string }) => {
    const { word, testId } = data;
    const response = await client.models.Words.create({ testId, word });

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
          />
        );
      case 2:
        return (
          <Step2
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
