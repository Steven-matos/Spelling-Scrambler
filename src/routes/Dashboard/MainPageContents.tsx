import { useState, useEffect } from "react";
import {
  Collection,
  Card,
  View,
  Button,
  Heading,
  Divider,
} from "@aws-amplify/ui-react";
import LoggedInNav from "../../components/LoggedInNav";
import InfoSection from "../../components/InfoSection";
import type { Schema, Test, Word } from "../../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

const MainPageContents = () => {
  const [tests, setTests] = useState<Test[]>([]);

  const fetchWords = async (testId: string): Promise<Word[]> => {
    const { data, errors } = await client.models.Words.list({
      filter: { testId: { eq: testId } },
    });
    if (errors) {
      console.error(errors);
    }
    return (
      data?.map((word) => ({
        wordId: word.wordId,
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
          const words = await fetchWords(test.testId);
          return { ...test, words };
        })
      );
      setTests(testsWithWords);
    }
    if (errors) {
      console.error(errors);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const handleDeleteItem = async (testId: string) => {
    try {
      await client.models.Tests.delete({ testId: testId });
      setTests((prevTests) =>
        prevTests.filter((test) => test.testId !== testId)
      );
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
              <Card
                key={test?.testId}
                borderRadius="medium"
                maxWidth="20rem"
                variation="outlined"
              >
                <View padding="xs">
                  <Heading padding="medium">{test?.weekof}</Heading>
                  <Divider marginBottom="medium" />
                  <div className="flex flex-col">
                    <Button className="ThemeColorBtn" margin="0.5rem">
                      Retest
                    </Button>
                    <Button
                      margin="0.5rem"
                      onClick={() => handleDeleteItem(test?.testId)}
                      backgroundColor="red.60"
                      color="white"
                      className="deleteBtn"
                    >
                      Delete
                    </Button>
                  </div>
                </View>
              </Card>
            )}
          </Collection>
        </div>
      </div>
    </div>
  );
};

export default MainPageContents;
