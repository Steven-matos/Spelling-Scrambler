import React, { useEffect, useState } from "react";
import LoggedInNav from "../../components/LoggedInNav";
import { generateClient } from "aws-amplify/data";
import { Card, Heading, View, Divider } from "@aws-amplify/ui-react";
import { type Schema, Test, Word } from "../../../amplify/data/resource";

const client = generateClient<Schema>();

const Reports: React.FC = () => {
  const [tests, setTests] = useState<Test[]>([]);

  const fetchTests = async () => {
    const { data, errors } = await client.models.Tests.list();

    if (data) {
      const formattedTests: Test[] = await Promise.all(
        data.map(async (test) => {
          const wordsData = await test.words();
          return {
            ...test,
            words: wordsData.data as Word[], // Assuming wordsData.data returns the list of words
          };
        })
      );

      setTests(formattedTests);
    }

    if (errors) {
      console.error(errors);
    }
  };

  const calculateRatio = (test: Test) => {
    const totalTaken = test.taken || 0;
    const totalCorrect = test.correct || 0;
    return totalTaken > 0 ? (totalCorrect / totalTaken).toFixed(2) : "N/A";
  };

  useEffect(() => {
    fetchTests();
  }, []);

  return (
    <div>
      <LoggedInNav />
      <div className="px-6 lg:px-8">
        <div className="mx-auto max-w-3xl py-20">
          <Heading marginTop="small" level={2}>
            Reports
          </Heading>
          <Divider marginBottom="large" />
          {tests.length === 0 ? (
            <div className="text-center text-gray-500">
              <p>No tests found. Please create a test to see reports.</p>
            </div>
          ) : (
            tests.map((test) => (
              <Card
                key={test.id}
                borderRadius="medium"
                maxWidth="20rem"
                variation="outlined"
              >
                <View padding="xs">
                  <Heading padding="medium">Test for: {test.weekof}</Heading>
                  <Divider marginBottom="medium" />
                  <div>Tests Taken: {test.taken || 0}</div>
                  <div>Tests Correct: {test.correct || 0}</div>
                  <div>Ratio: {calculateRatio(test)}%</div>
                </View>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
