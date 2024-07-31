import { Card, View, Button, Heading, Divider } from "@aws-amplify/ui-react";

interface TestCardProps {
  test: {
    id: string;
    weekof: string;
  };
  onDelete: (testId: string) => void;
}

const TestCard: React.FC<TestCardProps> = ({ test, onDelete }) => {
  return (
    <Card borderRadius="medium" maxWidth="20rem" variation="outlined">
      <View padding="xs">
        <Heading padding="medium">{test?.weekof}</Heading>
        <Divider marginBottom="medium" />
        <div className="flex flex-col">
          <Button className="ThemeColorBtn" margin="0.5rem">
            Retest
          </Button>
          <Button
            margin="0.5rem"
            onClick={() => onDelete(test?.id)}
            backgroundColor="red.60"
            color="white"
            className="deleteBtn"
          >
            Delete
          </Button>
        </div>
      </View>
    </Card>
  );
};

export default TestCard;
