import { Card, View, Button, Heading, Divider } from "@aws-amplify/ui-react";
import { useParams, useNavigate } from "react-router-dom";

interface TestCardProps {
  test: {
    id: string;
    weekof: string;
  };
  onDelete: (testId: string) => void;
}

const TestCard: React.FC<TestCardProps> = ({ test, onDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
    });
  };

  const takeTest = (test: TestCardProps["test"]) => {
    navigate(`/dashboard/${id}/test/${test.id}`);
  };

  return (
    <Card borderRadius="medium" maxWidth="20rem" variation="outlined">
      <View padding="xs">
        <Heading className="textCenter" padding="medium">
          {formatDate(test?.weekof)}
        </Heading>
        <Divider marginBottom="medium" />
        <div className="flex flex-col">
          <Button
            className="ThemeColorBtn"
            margin="0.5rem"
            onClick={() => takeTest(test)}
          >
            Test
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
