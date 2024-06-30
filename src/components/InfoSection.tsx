import { Divider } from "@aws-amplify/ui-react";

const InfoSection = ({ items }) => {
  return (
    <div className="text-center text-xl py-6">
      <h1 className="text-4xl py-4">
        Welcome, below are a list of saved spelling tests
      </h1>
      <Divider marginBottom="medium" />
      {items.length > 0 ? (
        <p>You are able to retake your test as many times as you would like.</p>
      ) : (
        <p>You don't have any tests set up yet.</p>
      )}
    </div>
  );
};

export default InfoSection;
