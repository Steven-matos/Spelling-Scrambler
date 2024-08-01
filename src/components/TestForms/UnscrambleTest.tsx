import React, { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Test, Word } from "../../../amplify/data/resource";

type UnscrambleTestProps = {
  words: Word[];
  onUpdateTest: (updatedTest: {
    taken: number;
    correct: number;
    id: string; // Ensure this is a string
  }) => void;
  test: Test;
};

const scrambleWord = (word: string): string => {
  const letters = word.split("");
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters.join("");
};

const UnscrambleTest: React.FC<UnscrambleTestProps> = ({
  words,
  onUpdateTest,
  test,
}) => {
  const [inputs, setInputs] = useState<{ [key: string]: string }>({});
  const [results, setResults] = useState<{ [key: string]: boolean | null }>({});
  const [submitted, setSubmitted] = useState(false);
  const { testId } = useParams();

  const navigate = useNavigate();

  // Memoize scrambled words
  const scrambledWords = useMemo(() => {
    const scrambled: { [key: string]: string } = {};
    words.forEach(({ id, word }) => {
      scrambled[id] = scrambleWord(word);
    });
    return scrambled;
  }, [words]);

  const handleChange = (id: string, value: string) => {
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newResults: { [key: string]: boolean | null } = {};
    let wordLength = words.length;
    let correctCount = 0;
    words.forEach(({ id, word }) => {
      const isCorrect = inputs[id].toLowerCase() === word.toLowerCase(); // Case-insensitive comparison
      newResults[id] = isCorrect;
      if (isCorrect) correctCount++;
    });

    setResults(newResults);
    setSubmitted(true);
    onUpdateTest({
      id: testId || "",
      taken: test.taken + 1,
      correct: correctCount === wordLength ? test.correct + 1 : test.correct,
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md p-6 mt-10">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Unscramble the Words
        </h2>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {words.map(({ id }) => {
              const scrambled = scrambledWords[id];
              return (
                <div key={id} className="flex flex-col gap-2">
                  <label className="font-medium">
                    Unscramble the word:{" "}
                    <strong className="text-blue-500">{scrambled}</strong>
                  </label>
                  <input
                    type="text"
                    value={inputs[id] || ""}
                    onChange={(e) => handleChange(id, e.target.value)}
                    className={`p-2 border rounded-md ${
                      results[id] === false
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                    placeholder="Type here..."
                  />
                  {results[id] === false && (
                    <p className="text-red-500 text-sm">Incorrect!</p>
                  )}
                </div>
              );
            })}
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors"
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="text-center">
            <p className="mb-4">
              Check your answers and click "Back" to return.
            </p>
            {words.map(({ id }) => {
              const scrambled = scrambledWords[id];
              return (
                <div key={id} className="mb-4">
                  <p className="font-medium">
                    <strong className="text-blue-500">{scrambled}</strong>
                  </p>
                  <p className="font-medium text-gray-700">
                    Your input: <strong>{inputs[id]}</strong>
                  </p>
                  <p
                    className={`font-medium ${
                      results[id] === false ? "text-red-500" : "text-green-500"
                    }`}
                  >
                    {results[id] === null
                      ? "Not answered"
                      : results[id]
                      ? "Correct!"
                      : "Incorrect!"}
                  </p>
                </div>
              );
            })}
            <button
              onClick={handleBack}
              className="w-full py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 transition-colors"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnscrambleTest;
