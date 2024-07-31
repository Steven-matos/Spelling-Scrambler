import React, { useState, KeyboardEvent } from "react";
import { Button } from "@aws-amplify/ui-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { ToastType } from "../Toast";

type StepContentProps = {
  onPrevious: () => void;
  wordList: Array<string>;
  setWordList: React.Dispatch<React.SetStateAction<string[]>>;
  showToast: (type: ToastType, message: string) => void;
  onSubmit: () => void;
};

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

export default Step2;
