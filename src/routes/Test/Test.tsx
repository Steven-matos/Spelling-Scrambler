import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen";
import UnscrambleTest from "../../components/TestForms/UnscrambleTest";
import NotFound from "../NotFound";

import { generateClient } from "aws-amplify/data";
import type { Schema, Test, Word } from "../../../amplify/data/resource";

const client = generateClient<Schema>();

const Test: React.FC = () => {
  const [showLoadingScreen, setShowLoadingScreen] = useState(true);
  const [takeTest, setTakeTest] = useState<Test | null>(null);
  const { testId } = useParams();

  useEffect(() => {
    if (testId && !takeTest) {
      fetchTest();
    }

    // Show the loading screen for a maximum of 6 seconds or until data is loaded
    const timer = setTimeout(() => {
      if (!takeTest) {
        setShowLoadingScreen(false);
      }
    }, 6000);

    return () => clearTimeout(timer);
  }, [testId, takeTest]);

  const fetchWords = async (testId: string): Promise<Word[]> => {
    try {
      const { data, errors } = await client.models.Words.list({
        filter: { testId: { eq: testId } },
      });
      if (errors) {
        console.error("Errors fetching words:", errors);
        return [];
      }
      return (
        data?.map((word) => ({
          id: word.id,
          word: word.word,
          testId: word.testId || "",
        })) || []
      );
    } catch (error) {
      console.error("Error fetching words:", error);
      return [];
    }
  };

  const fetchTest = async () => {
    if (!testId) return; // Early return if testId is not defined

    try {
      const { data, errors } = await client.models.Tests.list({
        filter: { id: { eq: testId } },
      });

      if (errors) {
        console.error("Errors fetching test:", errors);
        return;
      }

      if (data && data.length > 0) {
        const test = data[0];
        const words = await fetchWords(test.id);
        setTakeTest({ ...test, words });
        setShowLoadingScreen(false);
      } else {
        console.error("No data found for the provided test ID");
        setShowLoadingScreen(false);
      }
    } catch (error) {
      console.error("Error fetching test:", error);
      setShowLoadingScreen(false);
    }
  };

  const onUpdateTest = async (dataIn: {
    taken: number;
    correct: number;
    id: string;
  }) => {
    try {
      const { data: updatedTest, errors } = await client.models.Tests.update(
        dataIn
      );
      if (errors) {
        console.error("Error updating test:", errors);
        return;
      }
      console.log(updatedTest);
    } catch (error) {
      console.error("Error updating test:", error);
    }
  };

  return (
    <div>
      {showLoadingScreen ? (
        <LoadingScreen />
      ) : takeTest ? (
        <UnscrambleTest
          words={takeTest.words}
          onUpdateTest={onUpdateTest}
          test={takeTest}
        />
      ) : (
        <NotFound />
      )}
    </div>
  );
};

export default Test;
