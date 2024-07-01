import React from "react";
import { Divider } from "@aws-amplify/ui-react";
import type { Test } from "../../amplify/data/resource";

type InfoSectionProps = {
  tests: Test[];
};

const InfoSection: React.FC<InfoSectionProps> = ({ tests }) => {
  return (
    <div className="text-center text-xl py-6">
      <h1 className="text-4xl py-4">
        Welcome, below are a list of saved spelling tests
      </h1>
      <Divider marginBottom="medium" />
      {tests.length > 0 ? (
        <p>You are able to retake your test as many times as you would like.</p>
      ) : (
        <p>You don't have any tests set up yet.</p>
      )}
    </div>
  );
};

export default InfoSection;
