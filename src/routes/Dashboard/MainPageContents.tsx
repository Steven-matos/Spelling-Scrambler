import { useState } from "react";
import {
  Collection,
  Card,
  View,
  Flex,
  Badge,
  Button,
  Heading,
  Divider,
} from "@aws-amplify/ui-react";
import LoggedInNav from "../../components/LoggedInNav";
import InfoSection from "../../components/InfoSection";

const MainPageContents = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "Week of 6/17/2024",
      badges: ["Waterfront", "Verified"],
    },
    {
      id: 2,
      title: "Week of 6/24/2024",
      badges: ["Mountain", "Verified"],
    },
    {
      id: 3,
      title: "Week of 6/24/2024",
      badges: ["Mountain", "Verified"],
    },
  ]);

  const handleDeleteItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div>
      <LoggedInNav />
      <div className="px-6 lg:px-8">
        <div className="mx-auto max-w-3xl py-20">
          <InfoSection items={items} />
          <Collection
            items={items}
            type="list"
            direction="row"
            gap="20px"
            wrap="wrap"
            justifyContent="center"
          >
            {(item) => (
              <Card
                key={item.id}
                borderRadius="medium"
                maxWidth="20rem"
                variation="outlined"
              >
                <View padding="xs">
                  <Heading padding="medium">{item.title}</Heading>
                  <Divider marginBottom="medium" />
                  <Flex marginBottom="medium">
                    {item.badges.map((badge) => (
                      <Badge
                        key={badge}
                        backgroundColor={
                          badge === "Waterfront"
                            ? "blue.40"
                            : badge === "Mountain"
                            ? "green.40"
                            : "yellow.40"
                        }
                      >
                        {badge}
                      </Badge>
                    ))}
                  </Flex>
                  <div className="flex flex-col">
                    <Button variation="primary" margin="0.5rem">
                      Retest
                    </Button>
                    <Button
                      margin="0.5rem"
                      onClick={() => handleDeleteItem(item.id)}
                      backgroundColor="red.60"
                      color="white"
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
