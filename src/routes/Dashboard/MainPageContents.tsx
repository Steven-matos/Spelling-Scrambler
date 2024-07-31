import { useState, useEffect, useRef } from "react";
import { Collection } from "@aws-amplify/ui-react";
import LoggedInNav from "../../components/LoggedInNav";
import InfoSection from "../../components/InfoSection";
import { generateClient } from "aws-amplify/data";
import TestCard from "../../components/TestCard";
import type { Schema, Test, Word } from "../../../amplify/data/resource";

const client = generateClient<Schema>();

const MainPageContents = () => {
  const [tests, setTests] = useState<Test[]>([]);
  const testsCache = useRef<Test[] | null>(null);

  const fetchWords = async (testId: string): Promise<Word[]> => {
    const { data, errors } = await client.models.Words.list({
      filter: { testId: { eq: testId } },
    });
    if (errors) {
      console.error(errors);
    }
    return (
      data?.map((word) => ({
        id: word.id,
        word: word.word,
        testId: word.testId || "",
      })) || []
    );
  };

  const fetchTests = async () => {
    const { data, errors } = await client.models.Tests.list();
    if (data) {
      const testsWithWords = await Promise.all(
        data.map(async (test) => {
          const words = await fetchWords(test.id);
          return { ...test, words };
        })
      );
      testsCache.current = testsWithWords;
      setTests(testsWithWords);
    }
    if (errors) {
      console.error(errors);
    }
  };

  useEffect(() => {
    if (testsCache.current) {
      setTests(testsCache.current);
    } else {
      fetchTests();
    }
  }, []);

  const handleDeleteItem = async (testId: string) => {
    try {
      await client.models.Tests.delete({ id: testId });
      setTests((prevTests) => prevTests.filter((test) => test.id !== testId));
      if (testsCache.current) {
        testsCache.current = testsCache.current.filter(
          (test) => test.id !== testId
        );
      }
    } catch (error) {
      console.error("Failed to delete test:", error);
    }
  };

  return (
    <div>
      <LoggedInNav />
      <div className="px-6 lg:px-8">
        <div className="mx-auto max-w-3xl py-20">
          <InfoSection tests={tests} />
          <Collection
            items={tests}
            type="list"
            direction="row"
            gap="20px"
            wrap="wrap"
            justifyContent="center"
          >
            {(test) => (
              <TestCard
                key={test?.id}
                test={test}
                onDelete={handleDeleteItem}
              />
            )}
          </Collection>
        </div>
      </div>
    </div>
  );
};

export default MainPageContents;
